import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link'


export const metadata = {
  title: 'Anime Explorer',
  description: 'Explore anime using Jikan API',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms">
      <body>
        <nav className="navbar bg-base-200 px-4 md:px-8">
          <div className="flex-1">
            <Link href="/" className="text-lg font-bold">Anime Explorer</Link>
          </div>
          <div className="flex gap-4">
            <Link href="/anime" className="btn btn-sm btn-ghost">Browse</Link>
            <Link href="/favourite" className="btn btn-sm btn-ghost">Favourites</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}