import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers'; //import the new Providers component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VERA | Urbane Digital Assets',
  description: 'Funding the future of public infrastructure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers> {/*wrap your app with Providers */}
      </body>
    </html>
  );
}