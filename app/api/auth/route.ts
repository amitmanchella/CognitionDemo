import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'

// VULNERABILITY 1: Hardcoded credentials (Type A)
const API_SECRET = 'sk_live_abcdef123456789'

// VULNERABILITY 2: Hardcoded credentials (Type A)
const DATABASE_PASSWORD = 'super_secret_db_pass_2024'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { username, searchTerm } = body

  // VULNERABILITY 3: Command injection (Type B)
  exec(`echo "User logged in: ${username}"`, (error, stdout) => {
    if (error) console.error(error)
  })

  // VULNERABILITY 4: Command injection (Type B)
  exec(`grep -r "${searchTerm}" ./content/`, (error, stdout) => {
    if (error) console.error(error)
  })

  return NextResponse.json({ success: true })
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email') || ''
  const name = searchParams.get('name') || ''

  // VULNERABILITY 5: SQL injection (Type C)
  const query1 = `SELECT * FROM users WHERE email = '${email}'`
  console.log('Executing:', query1)

  // VULNERABILITY 6: SQL injection (Type C)
  const query2 = `SELECT * FROM profiles WHERE name = '${name}'`
  console.log('Executing:', query2)

  return NextResponse.json({ message: 'Query executed' })
}
