import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { players } = await request.json()
    
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const results = []
    
    for (const player of players) {
      try {
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email: `${player.username}@laligamtg.com`,
          password: 'temppass123',
          email_confirm: true,
          user_metadata: {
            displayName: player.displayName,
            avatarUrl: player.avatarUrl || '',
            wins: 0,
            seconds: 0,
            thirds: 0,
            saves: 0,
            losses: 0,
            commanders: player.commanders || [],
            rounds: [],
            bannedCards: []
          }
        })

        if (error) {
          console.error(`Error creating user ${player.username}:`, error)
          results.push({ username: player.username, success: false, error: error.message })
        } else {
          results.push({ username: player.username, success: true, id: data.user.id })
        }
      } catch (err) {
        console.error(`Exception creating user ${player.username}:`, err)
        results.push({ username: player.username, success: false, error: 'Exception occurred' })
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
