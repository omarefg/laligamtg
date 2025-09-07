import { updateSession } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Lista de dominios permitidos
  const allowedOrigins = [
    'https://laligamtg.omarefg.com',
    'http://localhost:3000'
  ]

  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  // Para requests API, verificar CORS
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Si es un request con origin (CORS), verificar que esté permitido
    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse(null, { 
        status: 403, 
        statusText: 'Forbidden - Origin not allowed' 
      })
    }

    // Si es un request directo sin origin, verificar referer
    if (!origin && referer) {
      const refererUrl = new URL(referer)
      const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`
      
      if (!allowedOrigins.includes(refererOrigin)) {
        return new NextResponse(null, { 
          status: 403, 
          statusText: 'Forbidden - Referer not allowed' 
        })
      }
    }

    // Configurar headers CORS para requests válidos
    const response = await updateSession(request)
    
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }

    return response
  }

  // Para páginas normales, solo actualizar sesión
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
