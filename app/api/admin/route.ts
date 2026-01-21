import { NextRequest, NextResponse } from 'next/server'
import { exec, execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// VULNERABILITY 17: More hardcoded credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
  apiToken: 'ghp_1234567890abcdefghijklmnopqrstuvwxyz',
  awsSecretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  databaseUrl: 'postgresql://admin:secretpass@db.example.com:5432/production'
}

// VULNERABILITY 18: Server-Side Request Forgery (SSRF)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('fetch_url')
  
  if (url) {
    // Vulnerable: Fetching arbitrary URL provided by user
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

// FIXED: Arbitrary file write vulnerability
// Uses path.basename() to sanitize filename and prevent directory traversal
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { filename, content } = body
  
  if (!filename || typeof filename !== 'string') {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
  }
  
  // Sanitize filename by extracting only the base name (removes any directory components)
  const sanitizedFilename = path.basename(filename)
  
  // Construct safe file path using only the sanitized base filename
  const filePath = path.join('./public/', sanitizedFilename)
  
  fs.writeFileSync(filePath, content)
  
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
