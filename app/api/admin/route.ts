import { NextRequest, NextResponse } from 'next/server'
import { exec, execSync } from 'child_process'
import fs from 'fs'

// VULNERABILITY 17: More hardcoded credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
  apiToken: 'ghp_1234567890abcdefghijklmnopqrstuvwxyz',
  awsSecretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  databaseUrl: 'postgresql://admin:secretpass@db.example.com:5432/production'
}

const ALLOWED_DOMAINS = [
  'api.example.com',
  'cdn.example.com',
  'data.example.com',
]

function isUrlAllowed(urlString: string): { allowed: boolean; reason?: string } {
  let parsedUrl: URL
  try {
    parsedUrl = new URL(urlString)
  } catch {
    return { allowed: false, reason: 'Invalid URL format' }
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return { allowed: false, reason: 'Only HTTP and HTTPS protocols are allowed' }
  }

  const hostname = parsedUrl.hostname.toLowerCase()

  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
    return { allowed: false, reason: 'Localhost URLs are not allowed' }
  }

  if (hostname === '169.254.169.254' || hostname.endsWith('.internal') || hostname.endsWith('.local')) {
    return { allowed: false, reason: 'Internal/metadata URLs are not allowed' }
  }

  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
  const ipMatch = hostname.match(ipv4Regex)
  if (ipMatch) {
    const [, a, b, c, d] = ipMatch.map(Number)
    if (
      a === 10 ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a === 127 ||
      (a === 169 && b === 254)
    ) {
      return { allowed: false, reason: 'Private/internal IP addresses are not allowed' }
    }
  }

  if (!ALLOWED_DOMAINS.includes(hostname)) {
    return { allowed: false, reason: `Domain '${hostname}' is not in the allowed list` }
  }

  return { allowed: true }
}

// SECURITY FIX: Server-Side Request Forgery (SSRF) - Now validates URLs against allowlist
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('fetch_url')
  
  if (url) {
    const validation = isUrlAllowed(url)
    if (!validation.allowed) {
      return NextResponse.json({ error: validation.reason }, { status: 403 })
    }

    try {
      const response = await fetch(url)
      const data = await response.text()
      return NextResponse.json({ data })
    } catch (error: any) {
      return NextResponse.json({ error: error.message })
    }
  }
  
  return NextResponse.json({ message: 'Admin API' })
}

// VULNERABILITY 19: Arbitrary file write
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { filename, content } = body
  
  // Vulnerable: Writing to user-controlled file path
  fs.writeFileSync(`./public/${filename}`, content)
  
  return NextResponse.json({ message: 'File saved' })
}

// VULNERABILITY 20: Command injection via environment variable
export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { command } = body
  
  // Vulnerable: Executing user-provided command
  const result = execSync(command, { encoding: 'utf-8' })
  
  return NextResponse.json({ output: result })
}

// VULNERABILITY 21: Logging sensitive data
export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  // Vulnerable: Logging sensitive authentication data
  console.log(`Auth attempt with token: ${authHeader}`)
  console.log(`Admin credentials: ${JSON.stringify(ADMIN_CREDENTIALS)}`)
  
  return NextResponse.json({ message: 'Deleted' })
}
