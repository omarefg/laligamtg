import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { validateOrigin, createCorsHeaders } from '@/utils/cors'
import { obfuscate } from '@/utils/obfuscation'

export async function OPTIONS(request: NextRequest) {
  // Validar origen para preflight
  if (!validateOrigin(request)) {
    return NextResponse.json(
      { error: 'Forbidden - Origin not allowed' },
      { status: 403 }
    )
  }

  const response = new NextResponse(null, { status: 200 })
  const corsHeaders = createCorsHeaders(request.headers.get('origin'))

  corsHeaders.forEach((value, key) => {
    response.headers.set(key, value)
  })

  return response
}

export async function GET(request: NextRequest) {
  // Validar origen
  if (!validateOrigin(request)) {
    const obfuscatedError = obfuscate({ error: 'Forbidden - Origin not allowed' })
    return NextResponse.json({ data: obfuscatedError }, { status: 403 })
  }

  try {
    // Usar el service role key para operaciones admin
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: users, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      console.error('Error fetching users:', error)
      const obfuscatedError = obfuscate({ error: 'Failed to fetch users' })
      return NextResponse.json({ data: obfuscatedError }, { status: 500 })
    }

    // Filtrar solo usuarios que tienen metadata relevante
    const playersData = users.users
      // .filter(user => user.user_metadata?.displayName)
      .map(user => ({
        id: user.id,
        email: user.email,
        username: user.email?.split('@')[0] || 'Unknown',
        metadata: user.user_metadata
      }))

    // Ofuscar los datos antes de enviar
    const obfuscatedData = obfuscate({ users: playersData })

    // Crear respuesta con headers CORS
    const response = NextResponse.json({ data: obfuscatedData })
    const corsHeaders = createCorsHeaders(request.headers.get('origin'))

    corsHeaders.forEach((value, key) => {
      response.headers.set(key, value)
    })

    return response
  } catch (error) {
    console.error('API Error:', error)
    const obfuscatedError = obfuscate({ error: 'Internal server error' })
    return NextResponse.json({ data: obfuscatedError }, { status: 500 })
  }
}
