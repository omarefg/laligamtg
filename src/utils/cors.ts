import { NextRequest } from 'next/server'

const ALLOWED_ORIGINS = [
  'https://laligamtg.omarefg.com',
  'http://localhost:3000'
]

export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  // Si tiene origin, verificar que esté en la lista
  if (origin) {
    return ALLOWED_ORIGINS.includes(origin)
  }

  // Si no tiene origin pero tiene referer, verificar referer
  if (referer) {
    try {
      const refererUrl = new URL(referer)
      const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`
      return ALLOWED_ORIGINS.includes(refererOrigin)
    } catch {
      return false
    }
  }

  // Si no tiene ni origin ni referer, rechazar
  return false
}

export function createCorsHeaders(origin: string | null) {
  const headers = new Headers()

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin)
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return headers
}
