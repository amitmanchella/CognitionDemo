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

// FIXED: Path Traversal vulnerability
// Now validates that the resolved path stays within the allowed directory
export async function POST(request: NextRequest) {
  const body = await request.json()
  const filename = body.filename
  
  if (!filename || typeof filename !== 'string') {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
  }
  
  // Get the absolute path of the allowed base directory
  const baseDir = path.resolve('./content/posts/')
  // Resolve the full path of the requested file
  const filePath = path.resolve(baseDir, filename)
  
  // Security check: Ensure the resolved path is within the allowed directory
  if (!filePath.startsWith(baseDir + path.sep) && filePath !== baseDir) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}
