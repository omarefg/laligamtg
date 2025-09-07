import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Usar el service role key para operaciones admin
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: users, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      console.error('Error fetching users:', error)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
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

    return NextResponse.json({ users: playersData })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
