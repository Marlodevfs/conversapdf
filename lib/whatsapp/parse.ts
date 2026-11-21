/**
 * Parser for WhatsApp "Export chat" text files.
 *
 * Handles both export families and the regional variants we have seen:
 *   iOS:     [15/03/2024, 14:05:23] Ana: Hola
 *            [3/15/24, 2:05:23 PM] Ana: Hi
 *            [15.03.24, 14:05:23] Ana: Hallo
 *   Android: 15/03/2024, 14:05 - Ana: Hola
 *            3/15/24, 2:05 PM - Ana: Hi
 *            15/03/24 14:05 – Ana: Ciao
 *
 * Day/month order is not stored in the file, so it is inferred from all the dates
 * in the chat (a value above 12 settles it); the 12-hour clock is detected from
 * the AM/PM marker (also "a. m." / "p. m." as written by Spanish phones).
 *
 * Timestamps are kept as wall-clock time: they are built with Date.UTC and must be
 * formatted with timeZone "UTC", so the PDF shows exactly what the phone showed.
 */

export type DateOrder = 'DMY' | 'MDY' | 'YMD';

export interface ChatMessage {
  /** Wall-clock time encoded as a UTC timestamp (format with timeZone: 'UTC'). */
  time: number;
  /** Sender name, or null for system messages (encryption notice, "X added Y"...). */
  author: string | null;
  text: string;
  /** File name of an attached media, when the export references one. */
  attachment?: string;
  /** True when the export only says the media was left out ("<Media omitted>"). */
  mediaOmitted?: boolean;
  /** "This message was deleted" and its translations. */
  deleted?: boolean;
}

export interface ParsedChat {
  messages: ChatMessage[];
  authors: string[];
  format: 'ios' | 'android';
  dateOrder: DateOrder;
  hasSeconds: boolean;
  hour12: boolean;
}

export class ChatParseError extends Error {
  constructor(public code: 'empty' | 'not-whatsapp') {
    super(code);
  }
}

const DATE = String.raw`(\d{1,4})[./-](\d{1,2})[./-](\d{1,4})`;
const TIME = String.raw`(\d{1,2})[:.](\d{2})(?:[:.](\d{2}))?(?:\s?([AaPp])\.?\s?[Mm]\.?)?`;
const IOS_HEADER = new RegExp(String.raw`^\[${DATE},?\s+${TIME}\]\s(.*)$`);
const ANDROID_HEADER = new RegExp(String.raw`^${DATE},?\s+${TIME}\s[-–]\s(.*)$`);

/** Invisible direction marks WhatsApp sprinkles in exports. */
const INVISIBLE = /[‎‏‪-‮⁦-⁩﻿]/g;

/** iOS: "<attached: 00000012-PHOTO-2024-03-15-14-05-23.jpg>" in any language. */
const IOS_ATTACHMENT = /^<[^<>:]{1,40}:\s*([^<>]+?\.[A-Za-z0-9]{2,5})>$/;
/** Android: "IMG-20240315-WA0001.jpg (file attached)" in any language. */
const ANDROID_ATTACHMENT = /^(\S+\.[A-Za-z0-9]{2,5})\s+\([^()]{3,40}\)$/;

const OMITTED_WORDS =
  /omitted|omitid[oa]s?|ocult[oa]|ocultad[oa]|omess[oi]|omis(es)?|weggelassen|ausgelassen|exclu[ií]d[oa]s?|non incluso|non inclus/i;
const DELETED_WORDS =
  /^(this message was deleted|you deleted this message|se eliminó este mensaje|eliminaste este mensaje|esta mensagem foi apagada|você apagou esta mensagem|questo messaggio è stato eliminato|hai eliminato questo messaggio|ce message a été supprimé|vous avez supprimé ce message|diese nachricht wurde gelöscht|du hast diese nachricht gelöscht)\.?$/i;

const ENCRYPTION_NOTICE =
  /^(messages and calls are end-to-end encrypted|los mensajes y las llamadas están cifrados|as mensagens e as chamadas são protegidas|i messaggi e le chiamate sono crittografati|les messages et les appels sont chiffrés|nachrichten und anrufe sind ende-zu-ende-verschlüsselt)/i;

interface RawHeader {
  a: number;
  b: number;
  c: number;
  aLen: number;
  hour: number;
  minute: number;
  second: number | null;
  ampm: 'a' | 'p' | null;
  rest: string;
}

function normalizeLine(line: string): string {
  return line.replace(/[  ]/g, ' ').replace(INVISIBLE, '');
}

function matchHeader(line: string): { header: RawHeader; format: 'ios' | 'android' } | null {
  const ios = IOS_HEADER.exec(line);
  const m = ios || ANDROID_HEADER.exec(line);
  if (!m) return null;
  return {
    format: ios ? 'ios' : 'android',
    header: {
      a: Number(m[1]),
      b: Number(m[2]),
      c: Number(m[3]),
      aLen: m[1].length,
      hour: Number(m[4]),
      minute: Number(m[5]),
      second: m[6] != null ? Number(m[6]) : null,
      ampm: m[7] ? (m[7].toLowerCase() as 'a' | 'p') : null,
      rest: m[8],
    },
  };
}

function inferDateOrder(headers: RawHeader[]): DateOrder {
  if (headers.some((h) => h.aLen === 4)) return 'YMD';
  if (headers.some((h) => h.a > 12)) return 'DMY';
  if (headers.some((h) => h.b > 12)) return 'MDY';
  // Undecidable from the data (every day so far is <= 12): US phones are the
  // ones that pair month-first dates with a 12-hour clock.
  return headers.some((h) => h.ampm) ? 'MDY' : 'DMY';
}

function toTimestamp(h: RawHeader, order: DateOrder): number {
  let year: number, month: number, day: number;
  if (order === 'YMD') [year, month, day] = [h.a, h.b, h.c];
  else if (order === 'MDY') [month, day, year] = [h.a, h.b, h.c];
  else [day, month, year] = [h.a, h.b, h.c];
  if (year < 100) year += 2000;

  let hour = h.hour;
  if (h.ampm === 'p' && hour < 12) hour += 12;
  if (h.ampm === 'a' && hour === 12) hour = 0;
  return Date.UTC(year, month - 1, day, hour, h.minute, h.second ?? 0);
}

/** Splits "Ana: Hola" into author and text; system lines have no author. */
function splitAuthor(rest: string): { author: string | null; text: string } {
  const idx = rest.indexOf(': ');
  // Quotes before the colon mean a system line quoting user text,
  // e.g. 'Ana changed the subject to "Trip: July"'.
  if (idx > 0 && idx <= 80 && !/["“”«»„‘’]/.test(rest.slice(0, idx))) {
    return { author: rest.slice(0, idx).trim(), text: rest.slice(idx + 2) };
  }
  // A message whose whole text is empty ends with ":" and no space.
  if (rest.endsWith(':') && rest.length <= 81 && !rest.includes(' ')) {
    return { author: rest.slice(0, -1), text: '' };
  }
  return { author: null, text: rest };
}

function classify(msg: ChatMessage): ChatMessage {
  const text = msg.text.trim();
  const ios = IOS_ATTACHMENT.exec(text);
  const android = ios ? null : ANDROID_ATTACHMENT.exec(text);
  if (ios || android) {
    return { ...msg, attachment: (ios || android)![1].trim(), text: '' };
  }
  // A caption can follow an Android attachment on the next lines.
  const firstLine = text.split('\n')[0];
  const androidWithCaption = ANDROID_ATTACHMENT.exec(firstLine);
  if (androidWithCaption && text.includes('\n')) {
    return {
      ...msg,
      attachment: androidWithCaption[1],
      text: text.slice(firstLine.length + 1),
    };
  }
  if (/^<[^<>]{3,60}>$/.test(text) && OMITTED_WORDS.test(text)) {
    return { ...msg, mediaOmitted: true };
  }
  if (text.length < 60 && !text.includes('\n') && OMITTED_WORDS.test(text) && /^\S+\s\S+$/.test(text)) {
    // iOS writes "image omitted" / "imagen omitida" without angle brackets.
    return { ...msg, mediaOmitted: true };
  }
  if (DELETED_WORDS.test(text)) return { ...msg, deleted: true };
  // iOS puts the end-to-end encryption notice under the contact's name.
  if (ENCRYPTION_NOTICE.test(text)) return { ...msg, author: null };
  return msg;
}

export function parseChat(raw: string): ParsedChat {
  const lines = raw.replace(/\r\n?/g, '\n').split('\n');
  if (!raw.trim()) throw new ChatParseError('empty');

  // First pass: find header lines so the date order can be inferred globally.
  const entries: { header: RawHeader | null; line: string }[] = [];
  const formats = { ios: 0, android: 0 };
  for (const original of lines) {
    const line = normalizeLine(original);
    const hit = matchHeader(line);
    if (hit) formats[hit.format]++;
    entries.push({ header: hit?.header ?? null, line });
  }
  const headers = entries.filter((e) => e.header).map((e) => e.header!);
  if (headers.length === 0) throw new ChatParseError('not-whatsapp');

  const dateOrder = inferDateOrder(headers);
  const messages: ChatMessage[] = [];
  for (const { header, line } of entries) {
    if (header) {
      const { author, text } = splitAuthor(header.rest);
      messages.push({ time: toTimestamp(header, dateOrder), author, text });
    } else if (messages.length > 0) {
      messages[messages.length - 1].text += `\n${line}`;
    }
    // Lines before the first header (should not happen) are dropped.
  }

  const classified = messages.map((m) => classify({ ...m, text: m.text.replace(/\s+$/, '') }));
  const authors: string[] = [];
  for (const m of classified) if (m.author && !authors.includes(m.author)) authors.push(m.author);

  return {
    messages: classified,
    authors,
    format: formats.ios >= formats.android ? 'ios' : 'android',
    dateOrder,
    hasSeconds: headers.some((h) => h.second != null),
    hour12: headers.some((h) => h.ampm != null),
  };
}
