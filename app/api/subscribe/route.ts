import { NextRequest, NextResponse } from 'next/server'

// VULNERABILITY 3: SQL Injection (simulated with raw query building)
// This simulates what a real database query might look like

interface Subscriber {
  email: string
  name: string
}

const subscribers: Subscriber[] = []

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, name } = body

  // Vulnerable: Building SQL query with string concatenation
  // In a real app this would be: db.query(`SELECT * FROM users WHERE email = '${email}'`)
  const unsafeQuery = `SELECT * FROM subscribers WHERE email = '${email}' AND name = '${name}'`
  
  // Log query execution without user-provided values to prevent log injection
  // User input is intentionally excluded from logs for security
  console.log('Executing query: SELECT * FROM subscribers WHERE email = ? AND name = ?')
  
  // Also vulnerable: No input validation
  subscribers.push({ email, name })

  return NextResponse.json({ 
    message: 'Subscribed successfully',
    query: unsafeQuery // Exposing internal query structure
  })
}

// VULNERABILITY 4: Sensitive data exposure in error messages
export async function GET(request: NextRequest) {
  try {
    // Simulated database connection with hardcoded credentials
    const dbConfig = {
      host: 'localhost',
      user: 'admin',
      password: 'super_secret_password_123', // Hardcoded secret
      database: 'blog_db'
    }
    
    return NextResponse.json({ subscribers })
  } catch (error: any) {
    // Vulnerable: Exposing stack trace and internal details
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack,
      internalDetails: 'Database connection failed'
    }, { status: 500 })
  }
}
