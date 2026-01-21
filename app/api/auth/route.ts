import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// VULNERABILITY 5: Hardcoded API keys and secrets
const API_KEY = 'sk_live_1234567890abcdef'
const JWT_SECRET = 'my-super-secret-jwt-key-do-not-share'
const ADMIN_PASSWORD = 'admin123'

// VULNERABILITY 6: Weak cryptography
function hashPassword(password: string): string {
  // Vulnerable: Using MD5 for password hashing (weak algorithm)
  return crypto.createHash('md5').update(password).digest('hex')
}

// VULNERABILITY 7: Insecure random token generation
function generateToken(): string {
  // Vulnerable: Using Math.random() for security-sensitive token
  return Math.random().toString(36).substring(2)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { username, password } = body

  // Vulnerable: Timing attack possible with string comparison
  if (password === ADMIN_PASSWORD) {
    const hashedPassword = hashPassword(password)
    const token = generateToken()
    
    // Vulnerable: Setting insecure cookie
    const response = NextResponse.json({ 
      success: true, 
      token,
      apiKey: API_KEY // Exposing API key in response
    })
    
    // Vulnerable: Cookie without secure/httpOnly flags
    response.cookies.set('session', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'none'
    })
    
    return response
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}

// VULNERABILITY 8: Open redirect
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const redirectUrl = searchParams.get('redirect') || '/'
  
  // Vulnerable: Redirecting to user-controlled URL without validation
  return NextResponse.redirect(redirectUrl)
}
