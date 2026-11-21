import type { ChatMessage } from './parse';

/** Chat statistics, computed locally from a parsed export. Times are wall-clock values stored as UTC. */
export interface AuthorStats {
  name: string;
  messages: number;
  words: number;
  media: number;
  emojis: number;
  starts: number;
  /** Median reply time in ms, or null if this person never replied within the window. */
  replyMs: number | null;
}

export interface ChatStats {
  messages: number;
  words: number;
  media: number;
  deleted: number;
  first: number;
  last: number;
  spanDays: number;
  activeDays: number;
  longestStreak: number;
  busiestDay: { day: number; count: number } | null;
  byHour: number[];
  /** Monday first. */
  byWeekday: number[];
  topEmojis: { emoji: string; count: number }[];
  authors: AuthorStats[];
}

const NEW_CONVERSATION_GAP = 6 * 3600e3;
const REPLY_WINDOW = 12 * 3600e3;
const DAY = 86400e3;
const PICTO = /\p{Extended_Pictographic}/u;

const segmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;

export function emojisIn(text: string): string[] {
  if (!PICTO.test(text)) return [];
  const parts = segmenter ? Array.from(segmenter.segment(text), (s) => s.segment) : Array.from(text);
  // Skin tones and hair modifiers stay attached; keep the base emoji so 👍 and 👍🏽 count together.
  return parts.filter((g) => PICTO.test(g)).map((g) => g.replace(/[\u{1F3FB}-\u{1F3FF}]/gu, ''));
}

const median = (xs: number[]) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const wordCount = (text: string) => (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;

export function computeStats(all: ChatMessage[]): ChatStats {
  const msgs = all.filter((m) => m.author);
  const byAuthor = new Map<string, AuthorStats & { replies: number[] }>();
  const byHour = new Array(24).fill(0);
  const byWeekday = new Array(7).fill(0);
  const perDay = new Map<number, number>();
  const emojiCount = new Map<string, number>();
  let words = 0;
  let media = 0;
  let deleted = 0;
  let prev: ChatMessage | null = null;

  for (const m of msgs) {
    const name = m.author!;
    let a = byAuthor.get(name);
    if (!a) {
      a = { name, messages: 0, words: 0, media: 0, emojis: 0, starts: 0, replyMs: null, replies: [] };
      byAuthor.set(name, a);
    }
    a.messages++;
    if (m.deleted) deleted++;
    if (m.attachment || m.mediaOmitted) {
      a.media++;
      media++;
    } else if (!m.deleted) {
      const w = wordCount(m.text);
      a.words += w;
      words += w;
      for (const e of emojisIn(m.text)) {
        a.emojis++;
        emojiCount.set(e, (emojiCount.get(e) || 0) + 1);
      }
    }
    const d = new Date(m.time);
    byHour[d.getUTCHours()]++;
    byWeekday[(d.getUTCDay() + 6) % 7]++;
    const day = Math.floor(m.time / DAY);
    perDay.set(day, (perDay.get(day) || 0) + 1);

    if (!prev || m.time - prev.time > NEW_CONVERSATION_GAP) a.starts++;
    else if (prev.author !== name && m.time - prev.time <= REPLY_WINDOW) a.replies.push(m.time - prev.time);
    prev = m;
  }

  const days = [...perDay.keys()].sort((x, y) => x - y);
  let longestStreak = days.length ? 1 : 0;
  for (let i = 1, run = 1; i < days.length; i++) {
    run = days[i] === days[i - 1] + 1 ? run + 1 : 1;
    longestStreak = Math.max(longestStreak, run);
  }
  let busiestDay: ChatStats['busiestDay'] = null;
  for (const [day, count] of perDay) if (!busiestDay || count > busiestDay.count) busiestDay = { day: day * DAY, count };

  const first = msgs[0]?.time ?? 0;
  const last = msgs[msgs.length - 1]?.time ?? 0;
  return {
    messages: msgs.length,
    words,
    media,
    deleted,
    first,
    last,
    spanDays: msgs.length ? Math.floor(last / DAY) - Math.floor(first / DAY) + 1 : 0,
    activeDays: days.length,
    longestStreak,
    busiestDay,
    byHour,
    byWeekday,
    topEmojis: [...emojiCount].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([emoji, count]) => ({ emoji, count })),
    authors: [...byAuthor.values()]
      .map(({ replies, ...a }) => ({ ...a, replyMs: median(replies) }))
      .sort((a, b) => b.messages - a.messages),
  };
}
