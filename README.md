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
  Cloudflare Pages Functions (`functions/api/checkout.ts`, `functions/api/verify.ts`,
  logic in `lib/polar-core.ts`) create the session and confirm it is paid. A paid
  unlock is remembered per conversation (SHA-256) on the device. Without Polar
  keys, local dev simulates the purchase and production hides paid downloads.
- **Free analyzer** (`components/AnalyzerTool.tsx`, `lib/whatsapp/stats.ts`).
- **Guides**: 8 SEO guides × 5 languages (`lib/guides`).
- **Languages**: es, pt, it, fr, en (`lib/i18n`).

## Setup

```bash
npm install
cp .env.example .env.local   # fill in Polar values
npm run dev
```

Hosting: Cloudflare Pages, production branch `cloudflare` (static export to `out/`,
build `npm run build`, Functions in `functions/`). Set the Polar variables in the
Pages project. Full local test with the Functions: `npm run build && npx wrangler
pages dev out`. Prices shown on the site live in `config/site.ts` and must match
the Polar prices.
