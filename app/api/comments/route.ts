import { NextRequest, NextResponse } from 'next/server'

interface Comment {
  id: string
  postSlug: string
  author: string
  content: string
  html: string
  createdAt: string
}

const comments: Comment[] = []

// VULNERABILITY 9: Cross-Site Scripting (XSS) via stored content
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { postSlug, author, content } = body

  // Vulnerable: Storing user HTML content without sanitization
  const comment: Comment = {
    id: Math.random().toString(),
    postSlug,
    author,
    content,
    html: `<div class="comment"><strong>${author}</strong>: ${content}</div>`, // XSS vulnerability
    createdAt: new Date().toISOString()
  }

  comments.push(comment)

  return NextResponse.json({ comment })
}

// Escape special regex characters to prevent regex injection attacks
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const postSlug = searchParams.get('postSlug')

  // Filter comments by content using escaped user input to prevent ReDoS attacks
  const filterPattern = searchParams.get('filter') || ''
  if (filterPattern) {
    const escapedPattern = escapeRegExp(filterPattern)
    const regex = new RegExp(escapedPattern)
    const filtered = comments.filter(c => regex.test(c.content))
    return NextResponse.json({ comments: filtered })
  }

  const postComments = postSlug 
    ? comments.filter(c => c.postSlug === postSlug)
    : comments

  return NextResponse.json({ comments: postComments })
}
