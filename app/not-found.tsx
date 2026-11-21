import Link from 'next/link';
import './globals.css';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-5xl font-bold text-leaf">404</p>
          <Link href="/" className="mt-4 inline-block underline">
            conversapdf.com
          </Link>
        </div>
      </body>
    </html>
  );
}
