import Link from 'next/link'

interface PostCardProps {
  post: {
    slug: string
    title: string
    date: string
    excerpt: string
    readingTime: number
    wordCount: number
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b border-gray-200 pb-6 mb-6 last:border-0">
      <Link href={`/posts/${post.slug}`}>
        <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
          {post.title}
        </h3>
      </Link>
      <p className="text-gray-500 text-sm mb-1">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p className="text-gray-400 text-xs mb-2">
        {post.wordCount} words · {post.readingTime} min read
      </p>
      <p className="text-gray-600">{post.excerpt}</p>
    </article>
  )
}
