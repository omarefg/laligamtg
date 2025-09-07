import Link from 'next/link'
import Image from 'next/image'
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
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-mtg-gold font-bold text-xl flex items-center">
                <Image src="/logo.png" alt="Liga MTG" width={32} height={32} className="h-8 w-auto mr-2" />
              </Link>
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
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>
    </div>
  )
}
