import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokémon App',
  description: 'Pokémon list and details using Next.js App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
