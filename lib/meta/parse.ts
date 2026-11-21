/**
 * Instagram and Facebook Messenger chats, from Meta's "Download your
 * information" export (JSON format) or from the end-to-end encrypted chats
 * download. Both apps use the same shapes:
 *
 *   classic   { participants: [{ name }], title, messages: [{ sender_name,
 *             timestamp_ms, content, photos: [{ uri }], videos, audio_files,
 *             files, gifs, sticker: { uri }, share: { link }, is_unsent }] }
 *             in .../messages/inbox/<thread>/message_1.json (message_2.json…),
 *             newest message first.
 *   encrypted { participants: ["Ana", …], threadName, messages: [{ senderName,
 *             timestamp, text, media: [{ uri }], isUnsent }] }
 *
 * The classic export writes every non-ASCII character as UTF-8 bytes escaped
 * one by one ("é" comes out as "Ã©"), so strings are repaired.
 *
 * Meta stores real instants (milliseconds since 1970). They are converted to
 * the wall-clock time of this browser's time zone, the convention the PDF uses.
 */
import type { ChatMessage, ParsedChat } from '../whatsapp/parse';

export type MetaApp = 'instagram' | 'messenger';

export interface MetaThread {
  /** Folder of the thread inside the export (or the file name for a lone file). */
  id: string;
  title: string;
  app: MetaApp | null;
  /** Message files of the thread, in order (message_1.json, message_2.json…). */
  files: string[];
  count: number;
  last: number;
  participants: string[];
  raw: any[];
}

const strict = new TextDecoder('utf-8', { fatal: true });

/** "Ã©" (UTF-8 bytes read as Latin-1) -> "é". Leaves proper strings alone. */
export function fixMojibake(s: string): string {
  if (!/[\u0080-ÿ]/.test(s)) return s;
  for (let i = 0; i < s.length; i++) if (s.charCodeAt(i) > 0xff) return s;
  try {
    return strict.decode(Uint8Array.from(s, (c) => c.charCodeAt(0)));
  } catch {
    return s;
  }
}

function deepFix(v: any): any {
  if (typeof v === 'string') return fixMojibake(v);
  if (Array.isArray(v)) return v.map(deepFix);
  if (v && typeof v === 'object') {
    const out: any = {};
    for (const k of Object.keys(v)) out[k] = deepFix(v[k]);
    return out;
  }
  return v;
}

/** Parses one JSON file; returns null when it is not a Meta chat. */
export function readMetaJson(text: string): any | null {
  let data: any;
  try {
    data = JSON.parse(text.replace(/^﻿/, ''));
  } catch {
    return null;
  }
  if (!data || typeof data !== 'object' || !Array.isArray(data.messages) || !Array.isArray(data.participants)) return null;
  return deepFix(data);
}

const dirName = (p: string) => (p.includes('/') ? p.slice(0, p.lastIndexOf('/')) : '');
const baseName = (p: string) => p.split('/').pop() || p;
const fileIndex = (p: string) => Number(/message_(\d+)\.json$/i.exec(p)?.[1] || 0);

export function guessApp(paths: string[]): MetaApp | null {
  const all = paths.join('\n').toLowerCase();
  if (all.includes('instagram')) return 'instagram';
  if (all.includes('facebook') || all.includes('messenger')) return 'messenger';
  return null;
}

const senderOf = (m: any): string | null => m.sender_name ?? m.senderName ?? null;
const timeOf = (m: any): number => {
  const t = Number(m.timestamp_ms ?? m.timestamp ?? 0);
  return t > 0 && t < 1e12 ? t * 1000 : t;
};

/** Groups the chat files found in an export into threads. */
export function groupThreads(files: { path: string; data: any }[]): MetaThread[] {
  const groups = new Map<string, { path: string; data: any }[]>();
  for (const f of files) {
    // message_1.json, message_2.json… of one folder form a single thread.
    const key = /message_\d+\.json$/i.test(f.path) ? dirName(f.path) || f.path : f.path;
    groups.set(key, [...(groups.get(key) || []), f]);
  }
  const threads: MetaThread[] = [];
  for (const [id, parts] of groups) {
    parts.sort((a, b) => fileIndex(a.path) - fileIndex(b.path));
    const first = parts[0].data;
    const raw = parts.flatMap((p) => p.data.messages as any[]);
    const participants: string[] = first.participants
      .map((p: any) => (typeof p === 'string' ? p : p?.name))
      .filter((n: any) => typeof n === 'string' && n);
    const uris = raw.flatMap(mediaOf).map((m) => m.uri);
    threads.push({
      id,
      title: first.title || first.threadName || participants.join(', ') || baseName(id),
      app: guessApp([id, ...uris]),
      files: parts.map((p) => p.path),
      count: raw.length,
      last: raw.reduce((max, m) => Math.max(max, timeOf(m)), 0),
      participants,
      raw,
    });
  }
  return threads.filter((t) => t.count > 0).sort((a, b) => b.last - a.last);
}

interface MediaRef {
  uri: string;
}

function mediaOf(m: any): MediaRef[] {
  const list: any[] = [
    ...(m.photos || []),
    ...(m.videos || []),
    ...(m.audio_files || []),
    ...(m.files || []),
    ...(m.gifs || []),
    ...(m.sticker ? [m.sticker] : []),
    ...(m.media || []),
  ];
  return list.filter((x) => x && typeof x.uri === 'string' && x.uri && !/^https?:/i.test(x.uri));
}

/** The media files a thread refers to (paths as written in the export). */
export const threadMedia = (t: MetaThread) => Array.from(new Set(t.raw.flatMap(mediaOf).map((m) => m.uri)));

/** Name used for a media file in the PDF: the file name, made unique per thread. */
export const mediaKey = (uri: string) => baseName(uri);

const toWallClock = (ms: number) => ms - new Date(ms).getTimezoneOffset() * 60_000;

export function threadToChat(t: MetaThread): ParsedChat {
  const messages: ChatMessage[] = [];
  const raw = [...t.raw].sort((a, b) => timeOf(a) - timeOf(b));
  for (const m of raw) {
    const ms = timeOf(m);
    if (!ms) continue;
    const time = toWallClock(ms);
    const author = senderOf(m);
    let text: string = (m.content ?? m.text ?? '').toString();
    const link = m.share?.link;
    if (link && !text.includes(link)) text = text ? `${text}\n${link}` : link;
    const unsent = m.is_unsent === true || m.isUnsent === true;
    if (unsent) {
      messages.push({ time, author, text: '', deleted: true });
      continue;
    }
    if (text.trim()) messages.push({ time, author, text });
    for (const media of mediaOf(m)) messages.push({ time, author, text: '', attachment: mediaKey(media.uri) });
  }
  const authors: string[] = [];
  for (const m of messages) if (m.author && !authors.includes(m.author)) authors.push(m.author);
  return { messages, authors, format: 'meta', dateOrder: 'DMY', hasSeconds: true, hour12: false };
}
