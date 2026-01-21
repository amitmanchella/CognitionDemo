'use client'

import { useState, useEffect } from 'react'

interface Comment {
  id: string
  author: string
  content: string
  html: string
}

interface CommentSectionProps {
  postSlug: string
}

export default function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(`/api/comments?postSlug=${postSlug}`)
      .then(res => res.json())
      .then(data => setComments(data.comments || []))
  }, [postSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postSlug, author, content })
    })
    
    const data = await res.json()
    setComments([...comments, data.comment])
    setAuthor('')
    setContent('')
  }

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      
      {/* VULNERABILITY 11: XSS via dangerouslySetInnerHTML */}
      <div className="space-y-4 mb-8">
        {comments.map(comment => (
          <div 
            key={comment.id}
            // Vulnerable: Rendering user-controlled HTML without sanitization
            dangerouslySetInnerHTML={{ __html: comment.html }}
            className="p-4 bg-gray-50 rounded"
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Comment</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>
    </section>
  )
}
