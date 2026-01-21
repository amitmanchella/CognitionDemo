import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'

// VULNERABILITY 1: Command Injection
// User input is passed directly to shell command
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  
  // Vulnerable: Command injection via user input
  exec(`grep -r "${query}" ./content/posts/`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`)
    }
  })

  return NextResponse.json({ results: [] })
}

// VULNERABILITY 2: Path Traversal
// User can access arbitrary files on the system
export async function POST(request: NextRequest) {
  const body = await request.json()
  const filename = body.filename
  
  // Vulnerable: Path traversal - user can read any file
  const filePath = path.join('./content/posts/', filename)
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}
