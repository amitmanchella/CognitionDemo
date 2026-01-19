import Link from 'next/link'

interface PostCardProps {
  post: {
    slug: string
    title: string
    date: string
    excerpt: string
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 last:border-0">
      <Link href={`/posts/${post.slug}`}>
        <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
          {post.title}
        </h3>
      </Link>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
    </article>
  )
}
