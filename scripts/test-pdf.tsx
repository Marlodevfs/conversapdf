/**
 * Renders sample PDFs for the three editions + the preview into scripts/output/.
 * Run: npm run test:pdf
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import { parseChat } from '../lib/whatsapp/parse';
import { ChatDocument, Edition } from '../lib/pdf/ChatDocument';
import { registerPdfFonts } from '../lib/pdf/fonts';

/** Minimal PNG encoder so the test needs no image library. */
function makePng(width: number, height: number): string {
  const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (buf: Buffer) => {
    let c = 0xffffffff;
    for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const chunk = (type: string, data: Buffer) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const raw = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 3 + 1)] = 0;
    for (let x = 0; x < width; x++) {
      const o = y * (width * 3 + 1) + 1 + x * 3;
      raw[o] = 40 + Math.round((x / width) * 150);
      raw[o + 1] = 120 + Math.round((y / height) * 100);
      raw[o + 2] = 160;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  return `data:image/png;base64,${png.toString('base64')}`;
}

const lines: string[] = [
  '[12/03/2024, 09:15:02] Ana López: ‎Los mensajes y las llamadas están cifrados de extremo a extremo.',
  '[12/03/2024, 09:15:10] Ana López: Hola Juan, ¿te viene bien el viernes para firmar el contrato del piso?',
  '[12/03/2024, 09:16:40] Juan Martínez: Sí, perfecto 👍😊❤️. Te llamo luego\ny lo hablamos con calma.',
  '‎[13/03/2024, 18:20:11] Juan Martínez: ‎<adjunto: 00000007-PHOTO-2024-03-13-18-20-11.jpg>',
  '[13/03/2024, 18:21:00] Ana López: ‎imagen omitida',
  '[13/03/2024, 18:22:30] Juan Martínez: ‎Se eliminó este mensaje.',
  '‎[13/03/2024, 18:23:00] Ana López: ‎<adjunto: 00000009-AUDIO-2024-03-13-18-23-00.opus>',
];
for (let d = 14; d <= 28; d++) {
  for (let k = 0; k < 4; k++) {
    const who = k % 2 ? 'Juan Martínez' : 'Ana López';
    lines.push(
      `[${d}/03/2024, 1${k}:0${k}:00] ${who}: Mensaje de prueba número ${d}-${k}. ` +
        'Recuerda que la fianza son dos meses y que el portal tiene que estar arreglado antes de la entrega de llaves.'
    );
  }
}
const chat = parseChat(lines.join('\n'));
const outDir = path.join(__dirname, 'output');
fs.mkdirSync(outDir, { recursive: true });
registerPdfFonts(path.join(__dirname, '..', 'public'));

const images = { '00000007-PHOTO-2024-03-13-18-20-11.jpg': { src: makePng(600, 400), width: 600, height: 400 } };

async function render(edition: Edition, preview = false) {
  const file = path.join(outDir, `${edition}${preview ? '-preview' : ''}.pdf`);
  await renderToFile(
    <ChatDocument
      locale="es"
      edition={edition}
      title="Juan Martínez"
      authors={chat.authors}
      messages={chat.messages}
      me="Ana López"
      images={images}
      sha256="9f2c3e1d0a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d"
      sourceName="WhatsApp Chat - Juan Martínez.zip"
      sourceSize={2_345_678}
      generatedAt={Date.UTC(2026, 10, 21, 10, 0)}
      hasSeconds={chat.hasSeconds}
      preview={preview}
    />,
    file
  );
  const size = fs.statSync(file).size;
  assert.ok(size > 5000, `${file} looks empty`);
  console.log(`  ok  ${path.basename(file)} (${Math.round(size / 1024)} KB)`);
}

(async () => {
  console.log('PDF rendering');
  await render('text');
  await render('photos');
  await render('proof');
  await render('photos', true);
  console.log('All PDFs rendered in scripts/output/');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
