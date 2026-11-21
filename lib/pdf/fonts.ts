import { Font } from '@react-pdf/renderer';

let registered = false;

/**
 * Noto Sans covers Latin (all accents), Greek and Cyrillic. Emojis are drawn
 * from self-hosted Twemoji images (CC-BY 4.0, credited in the site footer),
 * so no third-party server is contacted while the PDF is built.
 *
 * @param assetBase  "" in the browser (files served from /public), or the
 *                   absolute path of the public folder in Node tests.
 */
export function registerPdfFonts(assetBase = '') {
  if (registered) return;
  registered = true;
  Font.registerHyphenationCallback((word) => [word]);
  Font.register({
    family: 'Noto',
    fonts: [
      { src: `${assetBase}/fonts/NotoSans_400Regular.ttf`, fontWeight: 'normal' },
      { src: `${assetBase}/fonts/NotoSans_400Regular_Italic.ttf`, fontStyle: 'italic' },
      { src: `${assetBase}/fonts/NotoSans_700Bold.ttf`, fontWeight: 'bold' },
    ],
  });
  Font.registerEmojiSource({ builder: (code: string) => `${assetBase}/emoji/${code}.png` } as any);
}
