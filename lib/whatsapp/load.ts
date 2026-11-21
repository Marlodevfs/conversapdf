/**
 * Turns the file the user dropped (a .zip export with media, or a bare .txt)
 * into a parsed chat plus the media files it contains. Runs in the browser:
 * nothing is uploaded anywhere.
 */
import { unzipSync } from 'fflate';
import { parseChat, ParsedChat } from './parse';

export interface LoadedChat extends ParsedChat {
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
  constructor(public code: 'no-chat-file' | 'bad-zip' | 'empty' | 'not-whatsapp') {
    super(code);
  }
}

const baseName = (path: string) => path.split('/').pop() || path;

/** "WhatsApp Chat with Ana.txt" / "Chat de WhatsApp con Ana.txt" / "Conversa do WhatsApp com Ana.txt" -> "Ana" */
export function titleFromFileName(name: string): string | null {
  const stem = baseName(name).replace(/\.(txt|zip)$/i, '');
  if (stem === '_chat') return null;
  const m = /whatsapp\s+(?:chat\s+)?(?:with|con|com|avec|mit|met)\s+(.+)$/i.exec(stem);
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

export async function loadChatFile(file: { name: string; bytes: Uint8Array }): Promise<LoadedChat> {
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
    media,
    title,
    sha256: await sha256Hex(bytes),
    sourceName: name,
    sourceSize: bytes.length,
  };
}

const isZipBytes = (b: Uint8Array) => b[0] === 0x50 && b[1] === 0x4b;

/**
 * Several files at once: Android often shares the chat .txt and each photo as
 * separate files instead of a .zip. The chat file is found among them and the
 * other files become its media. The fingerprint covers the chat file itself.
 */
export async function loadChatFiles(files: { name: string; bytes: Uint8Array }[]): Promise<LoadedChat> {
  if (files.length === 1) return loadChatFile(files[0]);
  const zip = files.find((f) => isZipBytes(f.bytes));
  const chat =
    zip ||
    files.find((f) => /^_chat\.txt$/i.test(baseName(f.name))) ||
    files.find((f) => /whatsapp/i.test(f.name) && /\.txt$/i.test(f.name)) ||
    files.find((f) => /\.txt$/i.test(f.name));
  if (!chat) throw new LoadError('no-chat-file');
  const loaded = await loadChatFile(chat);
  for (const f of files) if (f !== chat) loaded.media[baseName(f.name)] = f.bytes;
  return loaded;
}
