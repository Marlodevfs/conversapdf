/**
 * Turns the file the user dropped (a .zip export with media, or a bare .txt)
 * into a parsed chat plus the media files it contains. Runs in the browser:
 * nothing is uploaded anywhere.
 */
import { unzipSync } from 'fflate';
import { parseChat, ParsedChat } from './parse';
import { groupThreads, readMetaJson, threadMedia, threadToChat, type MetaThread } from '../meta/parse';

/** Where the conversation comes from. "meta": Instagram or Messenger, could not tell which. */
export type ChatApp = 'whatsapp' | 'instagram' | 'messenger' | 'meta';

/** A conversation offered for choice when an export holds several. */
export interface ThreadChoice {
  id: string;
  title: string;
  count: number;
  last: number;
}

export interface LoadOptions {
  /** Called when an Instagram/Messenger export holds several conversations; resolves with the chosen id. */
  pickThread?: (threads: ThreadChoice[]) => Promise<string>;
}

export interface LoadedChat extends ParsedChat {
  app: ChatApp;
  /** Media files found in the zip, by base file name. */
  media: Record<string, Uint8Array>;
  /** Chat title guessed from the Android file name ("WhatsApp Chat with Ana.txt"). */
  title: string | null;
  /** SHA-256 of the original file, hex. Printed on the proof edition. */
  sha256: string;
  sourceName: string;
  sourceSize: number;
}

export class LoadError extends Error {
  constructor(public code: 'no-chat-file' | 'bad-zip' | 'empty' | 'not-whatsapp' | 'cancelled') {
    super(code);
  }
}

const baseName = (path: string) => path.split('/').pop() || path;

/** "WhatsApp Chat with Ana.txt" / "Chat de WhatsApp con Ana.txt" / "Conversa do WhatsApp com Ana.txt" -> "Ana" */
export function titleFromFileName(name: string): string | null {
  const stem = baseName(name).replace(/\.(txt|zip)$/i, '');
  if (stem === '_chat') return null;
  const m =
    /whatsapp\s+(?:chat\s+)?(?:with|con|com|avec|mit|met)\s+(.+)$/i.exec(stem) || // Android: "WhatsApp Chat with Ana"
    /whatsapp\s+chat\s*[-–]\s*(.+)$/i.exec(stem); // iPhone: "WhatsApp Chat - Ana"
  if (m) return m[1].trim();
  return null;
}

async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', bytes as BufferSource);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function decodeText(bytes: Uint8Array): string {
  // Exports are UTF-8 (sometimes with a BOM, stripped by the parser).
  return new TextDecoder('utf-8').decode(bytes);
}

async function loadWhatsAppFile(file: { name: string; bytes: Uint8Array }): Promise<LoadedChat> {
  const { name, bytes } = file;
  const isZip = bytes[0] === 0x50 && bytes[1] === 0x4b; // "PK"
  let text: string;
  let title: string | null = titleFromFileName(name);
  const media: Record<string, Uint8Array> = {};

  if (isZip) {
    let entries: Record<string, Uint8Array>;
    try {
      entries = unzipSync(bytes);
    } catch {
      throw new LoadError('bad-zip');
    }
    const names = Object.keys(entries).filter((n) => !n.startsWith('__MACOSX/') && !n.endsWith('/'));
    const chatName =
      names.find((n) => baseName(n) === '_chat.txt') || names.find((n) => /\.txt$/i.test(n));
    if (!chatName) throw new LoadError('no-chat-file');
    text = decodeText(entries[chatName]);
    title = title || titleFromFileName(chatName);
    for (const n of names) if (n !== chatName) media[baseName(n)] = entries[n];
  } else {
    text = decodeText(bytes);
    if (/^\s*$/.test(text)) throw new LoadError('empty');
  }

  let parsed: ParsedChat;
  try {
    parsed = parseChat(text);
  } catch (e: any) {
    throw new LoadError(e?.code === 'empty' ? 'empty' : 'not-whatsapp');
  }

  return {
    ...parsed,
    app: 'whatsapp',
    media,
    title,
    sha256: await sha256Hex(bytes),
    sourceName: name,
    sourceSize: bytes.length,
  };
}

const isZipBytes = (b: Uint8Array) => b[0] === 0x50 && b[1] === 0x4b;
const isJson = (n: string) => /\.json$/i.test(n);
const usable = (n: string) => !n.startsWith('__MACOSX/') && !n.endsWith('/');

type Source = { name: string; bytes: Uint8Array };

/**
 * Instagram / Messenger: finds the conversations among the JSON files, lets
 * the user pick one when there are several, then gathers that one's media.
 * In a zip only the JSON files are inflated first, and only the chosen
 * conversation's media afterwards, so a big export stays manageable.
 */
async function loadMeta(json: Source[], mediaFor: (uris: string[]) => Record<string, Uint8Array>, opts: LoadOptions): Promise<LoadedChat | null> {
  const found: { path: string; data: any; bytes: Uint8Array }[] = [];
  for (const f of json) {
    const data = readMetaJson(decodeText(f.bytes));
    if (data) found.push({ path: f.name, data, bytes: f.bytes });
  }
  if (found.length === 0) return null;
  const threads = groupThreads(found);
  if (threads.length === 0) throw new LoadError('empty');
  let thread: MetaThread = threads[0];
  if (threads.length > 1) {
    if (!opts.pickThread) throw new LoadError('cancelled');
    const id = await opts.pickThread(threads.map(({ id, title, count, last }) => ({ id, title, count, last })));
    thread = threads.find((t) => t.id === id) || threads[0];
  }
  const parsed = threadToChat(thread);
  if (parsed.messages.length === 0) throw new LoadError('empty');
  const parts = thread.files.map((p) => found.find((f) => f.path === p)!.bytes);
  const all = new Uint8Array(parts.reduce((n, b) => n + b.length, 0));
  parts.reduce((at, b) => (all.set(b, at), at + b.length), 0);
  const files = thread.files.map(baseName);
  return {
    ...parsed,
    app: thread.app || 'meta',
    media: mediaFor(threadMedia(thread)),
    title: thread.title,
    // The fingerprint covers this conversation's own file(s), not the whole export.
    sha256: await sha256Hex(all),
    sourceName: files.length > 1 ? `${files[0]} (+${files.length - 1})` : files[0],
    sourceSize: all.length,
  };
}

const matchesUri = (path: string, uris: string[]) => uris.some((u) => path.endsWith(u) || u.endsWith('/' + path) || u === path);

async function loadZip(file: Source, opts: LoadOptions): Promise<LoadedChat> {
  let json: Record<string, Uint8Array>;
  try {
    json = unzipSync(file.bytes, { filter: (f) => usable(f.name) && isJson(f.name) });
  } catch {
    throw new LoadError('bad-zip');
  }
  const meta = await loadMeta(
    Object.entries(json).map(([name, bytes]) => ({ name, bytes })),
    (uris) => {
      const wanted = unzipSync(file.bytes, { filter: (f) => usable(f.name) && matchesUri(f.name, uris) });
      const media: Record<string, Uint8Array> = {};
      for (const [n, b] of Object.entries(wanted)) media[baseName(n)] = b;
      return media;
    },
    opts
  );
  return meta || loadWhatsAppFile(file);
}

/** One file: a WhatsApp .zip or .txt, an Instagram/Messenger export .zip, or one of its message_1.json files. */
export async function loadChatFile(file: Source, opts: LoadOptions = {}): Promise<LoadedChat> {
  if (isZipBytes(file.bytes)) return loadZip(file, opts);
  if (isJson(file.name)) {
    const meta = await loadMeta([file], () => ({}), opts);
    if (!meta) throw new LoadError('not-whatsapp');
    return meta;
  }
  return loadWhatsAppFile(file);
}

/**
 * Several files at once: Android often shares the chat .txt and each photo as
 * separate files instead of a .zip; an Instagram/Messenger thread may come as
 * its message_*.json files next to its photos. The chat file is found among
 * them and the other files become its media. The fingerprint covers the chat
 * file itself.
 */
export async function loadChatFiles(files: Source[], opts: LoadOptions = {}): Promise<LoadedChat> {
  if (files.length === 1) return loadChatFile(files[0], opts);
  const zip = files.find((f) => isZipBytes(f.bytes));
  if (zip) {
    const loaded = await loadChatFile(zip, opts);
    for (const f of files) if (f !== zip) loaded.media[baseName(f.name)] ||= f.bytes;
    return loaded;
  }
  const json = files.filter((f) => isJson(f.name));
  if (json.length) {
    const others = files.filter((f) => !isJson(f.name));
    const meta = await loadMeta(
      json,
      (uris) => {
        const names = new Set(uris.map(baseName));
        const media: Record<string, Uint8Array> = {};
        for (const f of others) if (names.has(baseName(f.name))) media[baseName(f.name)] = f.bytes;
        return media;
      },
      opts
    );
    if (meta) return meta;
  }
  const chat =
    files.find((f) => /^_chat\.txt$/i.test(baseName(f.name))) ||
    files.find((f) => /whatsapp/i.test(f.name) && /\.txt$/i.test(f.name)) ||
    files.find((f) => /\.txt$/i.test(f.name));
  if (!chat) throw new LoadError('no-chat-file');
  const loaded = await loadWhatsAppFile(chat);
  for (const f of files) if (f !== chat) loaded.media[baseName(f.name)] = f.bytes;
  return loaded;
}
