import type {Metadata} from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Don Merengo | Club de Campo',
  description: 'Un refugio de exclusividad y naturaleza.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
