# ConversaPDF

Convert a WhatsApp chat export (.zip with media, or .txt) into a clean PDF —
entirely in the browser. Live at https://conversapdf.com.

- **Parser** (`lib/whatsapp/parse.ts`): iOS and Android exports, every date order,
  12/24-hour clocks ("p. m." included), attachments, omitted media, deleted
  messages, system lines. Tests: `npm run test:parser`.
- **PDF** (`lib/pdf/ChatDocument.tsx`, @react-pdf/renderer): chat bubbles, day
  separators, page numbers, inline photos, emojis (self-hosted Twemoji in
  `public/emoji`), and an "evidence" edition with a cover page and the SHA-256
  fingerprint of the original file. Sample PDFs: `npm run test:pdf`.
- **Payments**: Polar embedded checkout, one-time products (text / photos / proof).
  `app/api/checkout` creates the session, `app/api/verify` confirms it is paid.
  Without Polar keys, local dev simulates the purchase and production hides paid
  downloads.
- **Languages**: es, pt, it, fr, en (`lib/i18n`).

## Setup

```bash
npm install
cp .env.example .env.local   # fill in Polar values
npm run dev
```

On Vercel, add the same environment variables. Prices shown on the site live in
`config/site.ts` and must match the Polar prices. Fill in `siteConfig.legal`
before selling.
