/**
 * Parser tests on hand-written samples that follow the real export formats.
 * Run: npm run test:parser
 */
import assert from 'node:assert/strict';
import { zipSync, strToU8 } from 'fflate';
import { parseChat } from '../lib/whatsapp/parse';
import { loadChatFile, loadChatFiles, titleFromFileName } from '../lib/whatsapp/load';

const fmt = (t: number) => new Date(t).toISOString().slice(0, 19).replace('T', ' ');
let passed = 0;
function test(name: string, fn: () => void | Promise<void>) {
  return Promise.resolve(fn()).then(
    () => {
      passed++;
      console.log(`  ok  ${name}`);
    },
    (e) => {
      console.error(`  FAIL ${name}\n`, e);
      process.exitCode = 1;
    }
  );
}

const LRM = '‎';
const NNBSP = ' ';

const iosSpanish = [
  `[12/03/2024, 09:15:02] Ana López: ${LRM}Los mensajes y las llamadas están cifrados de extremo a extremo.`,
  `[12/03/2024, 09:15:02] Ana López: Hola Juan, ¿te viene bien el viernes?`,
  `[12/03/2024, 09:16:40] Juan: Sí, perfecto 👍`,
  `Te llamo luego`,
  `y lo hablamos`,
  `${LRM}[13/03/2024, 18:20:11] Juan: ${LRM}<adjunto: 00000007-PHOTO-2024-03-13-18-20-11.jpg>`,
  `${LRM}[13/03/2024, 18:21:00] Ana López: ${LRM}imagen omitida`,
  `[13/03/2024, 18:22:30] Juan: ${LRM}Se eliminó este mensaje.`,
  `[14/03/2024, 07:05:00] Ana López: Precio: 25 €`,
].join('\n');

const androidPortuguese = [
  `15/03/24 21:04 - As mensagens e as chamadas são protegidas com a criptografia de ponta a ponta.`,
  `15/03/24 21:04 - Maria criou o grupo "Viagem: julho"`,
  `15/03/24 21:05 - Maria: Oi gente!`,
  `15/03/24 21:06 - Pedro Silva: IMG-20240315-WA0003.jpg (arquivo anexado)`,
  `Olha a praia`,
  `16/03/24 08:00 - Pedro Silva: <Mídia oculta>`,
].join('\n');

const iosEnglishUS = [
  `[3/5/24, 2:05:23${NNBSP}PM] Mike: Hey`,
  `[3/14/24, 12:01:00${NNBSP}AM] Sara: Happy pi day`,
  `[3/14/24, 12:30:00${NNBSP}PM] Mike: ${LRM}<attached: 00000012-AUDIO-2024-03-14-12-30-00.opus>`,
].join('\n');

const androidSpanish12h = [
  `5/1/2024, 10:15 p. m. - Lucía: Buenas noches`,
  `20/1/2024, 7:03 a. m. - Lucía: Buenos días`,
  `20/1/2024, 12:10 a. m. - Lucía: medianoche`,
].join('\n');

const androidItalian = [`14/02/24, 20:30 – Giulia: Ciao!`, `14/02/24, 20:31 – Marco: <Media omessi>`].join('\n');

const iosGermanDots = [`[24.12.23, 18:00:00] Opa: Frohe Weihnachten`, `[25.12.23, 09:30:12] Lena: Danke!`].join(
  '\n'
);

const androidFrench = [
  `01/04/2024 à 10:00 - Hors format`, // not a header (Android FR uses "01/04/2024 10:00 - ")
  `01/04/2024 10:00 - Chloé: Salut`,
  `01/04/2024 10:01 - Chloé: VID-20240401-WA0001.mp4 (fichier joint)`,
].join('\n');

const iso = [`[2024-06-01, 10:00:00] Kim: Hi`, `[2024-06-02, 11:30:00] Lee: Hello`].join('\n');

async function main() {
  console.log('WhatsApp parser');

  await test('iOS Spanish: dates, multiline, attachment, omitted, deleted', () => {
    const c = parseChat(iosSpanish);
    assert.equal(c.format, 'ios');
    assert.equal(c.dateOrder, 'DMY');
    assert.equal(c.hasSeconds, true);
    assert.deepEqual(c.authors, ['Ana López', 'Juan']);
    assert.equal(c.messages.length, 7);
    assert.equal(c.messages[0].author, null, 'encryption notice is a system line');
    assert.equal(fmt(c.messages[1].time), '2024-03-12 09:15:02');
    assert.equal(c.messages[2].text, 'Sí, perfecto 👍\nTe llamo luego\ny lo hablamos');
    assert.equal(c.messages[3].attachment, '00000007-PHOTO-2024-03-13-18-20-11.jpg');
    assert.equal(c.messages[4].mediaOmitted, true);
    assert.equal(c.messages[5].deleted, true);
    assert.equal(c.messages[6].text, 'Precio: 25 €');
  });

  await test('Android Portuguese: system lines, quoted colon, attachment with caption', () => {
    const c = parseChat(androidPortuguese);
    assert.equal(c.format, 'android');
    assert.equal(c.messages[0].author, null);
    assert.equal(c.messages[1].author, null, 'quoted "Viagem: julho" must stay a system line');
    assert.equal(c.messages[2].author, 'Maria');
    assert.equal(c.messages[3].attachment, 'IMG-20240315-WA0003.jpg');
    assert.equal(c.messages[3].text, 'Olha a praia');
    assert.equal(c.messages[4].mediaOmitted, true);
    assert.equal(fmt(c.messages[2].time), '2024-03-15 21:05:00');
    assert.deepEqual(c.authors, ['Maria', 'Pedro Silva']);
  });

  await test('iOS English US: month first, 12-hour clock with narrow space', () => {
    const c = parseChat(iosEnglishUS);
    assert.equal(c.dateOrder, 'MDY');
    assert.equal(c.hour12, true);
    assert.equal(fmt(c.messages[0].time), '2024-03-05 14:05:23');
    assert.equal(fmt(c.messages[1].time), '2024-03-14 00:01:00');
    assert.equal(fmt(c.messages[2].time), '2024-03-14 12:30:00');
    assert.equal(c.messages[2].attachment, '00000012-AUDIO-2024-03-14-12-30-00.opus');
  });

  await test('Android Spanish 12h ("p. m."), day first detected from 20/1', () => {
    const c = parseChat(androidSpanish12h);
    assert.equal(c.dateOrder, 'DMY');
    assert.equal(fmt(c.messages[0].time), '2024-01-05 22:15:00');
    assert.equal(fmt(c.messages[1].time), '2024-01-20 07:03:00');
    assert.equal(fmt(c.messages[2].time), '2024-01-20 00:10:00');
  });

  await test('Android Italian with en dash, omitted media', () => {
    const c = parseChat(androidItalian);
    assert.equal(c.messages.length, 2);
    assert.equal(c.messages[1].mediaOmitted, true);
  });

  await test('iOS German with dotted dates', () => {
    const c = parseChat(iosGermanDots);
    assert.equal(fmt(c.messages[0].time), '2023-12-24 18:00:00');
    assert.equal(c.messages[1].text, 'Danke!');
  });

  await test('Android French without comma; stray line appended to nothing', () => {
    const c = parseChat(androidFrench);
    assert.equal(c.messages.length, 2);
    assert.equal(c.messages[1].attachment, 'VID-20240401-WA0001.mp4');
  });

  await test('ISO dates (year first)', () => {
    const c = parseChat(iso);
    assert.equal(c.dateOrder, 'YMD');
    assert.equal(fmt(c.messages[1].time), '2024-06-02 11:30:00');
  });

  await test('Rejects text that is not a WhatsApp export', () => {
    assert.throws(() => parseChat('hello\nworld'), /not-whatsapp/);
    assert.throws(() => parseChat('   '), /empty/);
  });

  await test('Zip export: finds _chat.txt and media, hashes the file', async () => {
    const zip = zipSync({
      '_chat.txt': strToU8(iosSpanish),
      '00000007-PHOTO-2024-03-13-18-20-11.jpg': new Uint8Array([0xff, 0xd8, 0xff, 0xd9]),
    });
    const c = await loadChatFile({ name: 'WhatsApp Chat - Juan.zip', bytes: zip });
    assert.equal(c.messages.length, 7);
    assert.ok(c.media['00000007-PHOTO-2024-03-13-18-20-11.jpg']);
    assert.match(c.sha256, /^[0-9a-f]{64}$/);
  });

  await test('Android separate files: .txt plus photos selected together', async () => {
    const c = await loadChatFiles([
      { name: 'IMG-20240315-WA0003.jpg', bytes: new Uint8Array([0xff, 0xd8, 0xff, 0xd9]) },
      { name: 'Conversa do WhatsApp com Maria.txt', bytes: strToU8(androidPortuguese) },
    ]);
    assert.equal(c.title, 'Maria');
    assert.ok(c.media['IMG-20240315-WA0003.jpg']);
    assert.equal(c.messages[3].attachment, 'IMG-20240315-WA0003.jpg');
  });

  await test('Titles from Android file names', () => {
    assert.equal(titleFromFileName('WhatsApp Chat with Ana.txt'), 'Ana');
    assert.equal(titleFromFileName('Chat de WhatsApp con Juan Pérez.txt'), 'Juan Pérez');
    assert.equal(titleFromFileName('WhatsApp Chat - Julien Martin.zip'), 'Julien Martin');
    assert.equal(titleFromFileName('Discussion WhatsApp avec Léa.txt'), 'Léa');
    assert.equal(titleFromFileName('Conversa do WhatsApp com Maria.txt'), 'Maria');
    assert.equal(titleFromFileName('_chat.txt'), null);
  });

  console.log(process.exitCode ? 'FAILED' : `All ${passed} parser tests passed`);
}

main();
