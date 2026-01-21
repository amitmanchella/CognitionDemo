import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

interface PostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article>
      <Link 
        href="/" 
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to all posts
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          <span className="text-gray-500 text-sm"> · {post.readingTime} min read · {post.wordCount} words</span>
        </p>
      </header>

      <div className="prose">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}
