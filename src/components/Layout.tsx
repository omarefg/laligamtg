import Link from 'next/link'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-mtg-dark text-white">
      <nav className="bg-mtg-gray border-b border-mtg-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-mtg-gold font-bold text-xl">
                  Liga MTG
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="text-white hover:text-mtg-gold px-3 py-2 text-sm font-medium content-center">
                  Leaderboard
                </Link>
                <Link href="/rounds" className="text-white hover:text-mtg-gold px-3 py-2 text-sm font-medium content-center">
                  Rondas
                </Link>
                <Link href="/rules" className="text-white hover:text-mtg-gold px-3 py-2 text-sm font-medium content-center">
                  Reglas
                </Link>
                {/* <Link href="/admin" className="text-white hover:text-mtg-gold px-3 py-2 text-sm font-medium content-center">
                  Admin
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>
    </div>
  )
}
