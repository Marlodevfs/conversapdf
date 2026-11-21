import React from 'react';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { Locale } from '@/config/site';
import type { ChatMessage } from '@/lib/whatsapp/parse';
import { appName, intlLocale, pdfStrings } from '@/lib/i18n/pdf';

export type Edition = 'text' | 'photos' | 'proof';

export interface PdfImage {
  src: string;
  width: number;
  height: number;
}

export interface ChatDocumentProps {
  locale: Locale;
  edition: Edition;
  title: string | null;
  authors: string[];
  messages: ChatMessage[];
  /** Messages from this sender are drawn on the right, like on the phone. */
  me: string | null;
  /** Downscaled photos by file name (used by the photos and proof editions). */
  images: Record<string, PdfImage>;
  sha256: string;
  sourceName: string;
  /** whatsapp | instagram | messenger | meta */
  app?: string;
  sourceSize: number;
  generatedAt: number;
  /** Watermarked preview: only the first messages are drawn. */
  preview?: boolean;
  hasSeconds?: boolean;
}

/** The preview shows only a taste of the chat (3 to 6 messages), enough to judge the layout, never enough to replace the paid PDF. */
const previewCount = (n: number) => Math.min(6, Math.max(3, Math.ceil(n * 0.15)));
const WATERMARK_ROWS = [150, 400, 650];
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;
const NAME_COLORS = ['#1d6b4f', '#8a4b0f', '#2b4c9b', '#9b2b5a', '#5a3d99', '#0f6f80', '#7a6b00', '#a33a2b'];

const s = StyleSheet.create({
  page: {
    fontFamily: 'Noto',
    fontSize: 10,
    color: '#1f2a24',
    backgroundColor: '#fbf8f2',
    paddingTop: 54,
    paddingBottom: 54,
    paddingHorizontal: 42,
  },
  header: {
    position: 'absolute',
    top: 22,
    left: 42,
    right: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#7a7f78',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d2c3',
    paddingBottom: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 22,
    left: 42,
    right: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#7a7f78',
  },
  day: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#efe7d8',
    borderRadius: 8,
    fontSize: 8.5,
    color: '#4b5550',
  },
  system: {
    alignSelf: 'center',
    maxWidth: '80%',
    textAlign: 'center',
    marginVertical: 4,
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#6b716c',
  },
  bubble: {
    maxWidth: '78%',
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 7,
    borderWidth: 0.5,
  },
  theirs: { alignSelf: 'flex-start', backgroundColor: '#ffffff', borderColor: '#e2dccf' },
  mine: { alignSelf: 'flex-end', backgroundColor: '#e3f0ea', borderColor: '#c8dfd4' },
  author: { fontWeight: 'bold', fontSize: 9, marginBottom: 2 },
  text: { lineHeight: 1 },
  muted: { fontStyle: 'italic', color: '#6b716c' },
  time: { fontSize: 7.5, color: '#7a7f78', textAlign: 'right', marginTop: 2 },
  photo: { marginTop: 2, marginBottom: 2, borderRadius: 4 },
  watermark: {
    position: 'absolute',
    left: -60,
    right: -60,
    textAlign: 'center',
    fontSize: 56,
    fontWeight: 'bold',
    color: '#155741',
    opacity: 0.16,
    transform: 'rotate(-28deg)',
  },
  previewEnd: {
    marginTop: 18,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#1d6b4f',
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  coverTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  coverSubtitle: { fontSize: 12, color: '#4b5550', marginBottom: 24 },
  row: { flexDirection: 'row', marginBottom: 8 },
  label: { width: 150, color: '#6b716c', fontSize: 9.5 },
  value: { flex: 1, fontSize: 9.5 },
  hash: { fontSize: 8.5, letterSpacing: 0.3 },
  note: {
    marginTop: 24,
    padding: 12,
    borderWidth: 0.5,
    borderColor: '#d9d2c3',
    borderRadius: 6,
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#4b5550',
  },
});

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function fitImage(img: PdfImage, maxW = 230, maxH = 260) {
  const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
  return { width: img.width * ratio, height: img.height * ratio };
}

export function ChatDocument(props: ChatDocumentProps) {
  const { locale, edition, messages, me, images, preview } = props;
  const t = pdfStrings(locale);
  const app = appName(props.app);
  const tag = intlLocale[locale];
  const dayFmt = new Intl.DateTimeFormat(tag, { timeZone: 'UTC', dateStyle: 'full' });
  const shortDayFmt = new Intl.DateTimeFormat(tag, { timeZone: 'UTC', dateStyle: 'medium' });
  const timeFmt = new Intl.DateTimeFormat(tag, {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    ...(props.hasSeconds && edition === 'proof' ? { second: '2-digit' } : {}),
  });
  const generatedFmt = new Intl.DateTimeFormat(tag, { dateStyle: 'long', timeStyle: 'short' });

  const showPhotos = edition !== 'text';
  const isGroup = props.authors.length > 2;
  const colorOf = (author: string) => NAME_COLORS[Math.max(0, props.authors.indexOf(author)) % NAME_COLORS.length];
  const shown = preview ? messages.slice(0, previewCount(messages.length)) : messages;
  const title = props.title || props.authors.join(', ') || t.conversation(app);
  const first = messages[0]?.time;
  const last = messages[messages.length - 1]?.time;
  const period = first != null && last != null ? `${shortDayFmt.format(first)} – ${shortDayFmt.format(last)}` : '';

  const body: React.ReactNode[] = [];
  let lastDay = '';
  shown.forEach((m, i) => {
    const day = dayFmt.format(m.time);
    if (day !== lastDay) {
      lastDay = day;
      body.push(
        <Text key={`d${i}`} style={s.day} minPresenceAhead={40}>
          {day}
        </Text>
      );
    }
    if (m.author == null) {
      body.push(
        <Text key={`m${i}`} style={s.system}>
          {m.text}
        </Text>
      );
      return;
    }

    const mine = me != null && m.author === me;
    const img = showPhotos && m.attachment && IMAGE_EXT.test(m.attachment) ? images[m.attachment] : undefined;
    const content: React.ReactNode[] = [];
    if (img) {
      content.push(<Image key="img" src={img.src} style={[s.photo, fitImage(img)]} />);
    } else if (m.attachment) {
      const missingPhoto = showPhotos && IMAGE_EXT.test(m.attachment);
      content.push(
        <Text key="att" style={[s.text, s.muted]}>
          {missingPhoto ? `${t.photoMissing}: ${m.attachment}` : `📎 ${t.attachment}: ${m.attachment}`}
        </Text>
      );
    }
    if (m.mediaOmitted) {
      content.push(
        <Text key="om" style={[s.text, s.muted]}>
          {t.mediaOmitted}
        </Text>
      );
    } else if (m.deleted) {
      content.push(
        <Text key="del" style={[s.text, s.muted]}>
          {t.deleted}
        </Text>
      );
    } else if (m.text) {
      content.push(
        <Text key="txt" style={s.text}>
          {m.text}
        </Text>
      );
    }

    body.push(
      <View
        key={`m${i}`}
        style={[s.bubble, mine ? s.mine : s.theirs]}
        // Keep normal bubbles whole; only very long messages may break across pages.
        wrap={!img && m.text.length > 700}
      >
        {(!mine || isGroup || edition === 'proof') && (
          <Text style={[s.author, { color: colorOf(m.author) }]}>{m.author}</Text>
        )}
        {content}
        <Text style={s.time}>{timeFmt.format(m.time)}</Text>
      </View>
    );
  });

  if (preview && messages.length > shown.length) {
    body.push(
      <Text key="end" style={s.previewEnd}>
        {t.previewEnd}
      </Text>
    );
  }

  const chrome = (
    <>
      <View style={s.header} fixed>
        <Text>{title}</Text>
        <Text>{t.conversation(app)}</Text>
      </View>
      <View style={s.footer} fixed>
        <Text>conversapdf.com</Text>
        <Text render={({ pageNumber, totalPages }) => t.page(pageNumber, totalPages)} />
      </View>
    </>
  );
  // Drawn after the messages so it sits on top of them, on every page.
  const watermark = preview
    ? WATERMARK_ROWS.map((top) => (
        <Text key={top} style={[s.watermark, { top }]} fixed>
          {`${t.previewWatermark} · conversapdf.com`}
        </Text>
      ))
    : null;

  return (
    <Document title={`${title} – ${t.conversation(app)}`} author="ConversaPDF" creator="conversapdf.com" producer="conversapdf.com">
      {edition === 'proof' && (
        <Page size="A4" style={s.page}>
          {chrome}
          <Text style={s.coverTitle}>{t.proofTitle}</Text>
          <Text style={s.coverSubtitle}>{title}</Text>
          <View style={s.row}>
            <Text style={s.label}>{t.participants}</Text>
            <Text style={s.value}>{props.authors.join(', ')}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>{t.period}</Text>
            <Text style={s.value}>{period}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>{t.messages}</Text>
            <Text style={s.value}>{messages.length.toLocaleString(tag)}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>{t.sourceFile}</Text>
            <Text style={s.value}>
              {props.sourceName} ({formatBytes(props.sourceSize)})
            </Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>{t.fileFingerprint}</Text>
            <Text style={[s.value, s.hash]}>{props.sha256}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>{t.generatedOn}</Text>
            <Text style={s.value}>{generatedFmt.format(props.generatedAt)}</Text>
          </View>
          <Text style={s.note}>
            {t.proofNote(app)} {t.notAffiliated}
          </Text>
        </Page>
      )}
      <Page size="A4" style={s.page} wrap>
        {chrome}
        {body}
        {watermark}
      </Page>
    </Document>
  );
}
