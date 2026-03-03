import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gielinor Scavenger League",
  description: "A fully automated, drop-verified, seasonal OSRS competition platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100 min-h-screen`}
      >
        {/* Nav */}
        <nav className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors">
              GSL
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                Home
              </Link>
              <Link href="/how-it-works" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                How It Works
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-zinc-500">
            Gielinor Scavenger League - Drop-verified OSRS competitions
          </div>
        </footer>
      </body>
    </html>
  );
}
