import './globals.css';
import { LogoMark } from '@/components/Logo';

/** Site-wide 404 (outside any language): the way back in each language. */
const homes = [
  { href: '/fr', label: 'Retour à l’accueil', lang: 'fr' },
  { href: '/en', label: 'Back to home', lang: 'en' },
  { href: '/es', label: 'Volver al inicio', lang: 'es' },
  { href: '/pt', label: 'Voltar ao início', lang: 'pt' },
  { href: '/it', label: 'Torna alla home', lang: 'it' },
  { href: '/de', label: 'Zur Startseite', lang: 'de' },
];

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 | ConversaPDF</title>
        <meta name="robots" content="noindex" />
      </head>
      <body className="flex min-h-screen items-center justify-center px-5">
        <main className="max-w-md text-center">
          <LogoMark className="mx-auto h-14 w-14" />
          <p className="mt-6 text-6xl font-extrabold tracking-display text-leaf">404</p>
          <h1 className="mt-3 text-xl font-bold">This page does not exist</h1>
          <p className="mt-1 text-ink/70">Cette page n’existe pas · Esta página no existe</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {homes.map((h) => (
              <li key={h.href}>
                <a href={h.href} lang={h.lang} className="inline-block rounded-full border border-sand bg-surface px-4 py-2 text-sm font-semibold hover:border-leaf">
                  {h.label}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
