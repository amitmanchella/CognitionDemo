import PostList from '@/components/PostList'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-gray-600 text-lg">
          I write about web development, TypeScript, and building side projects.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Recent Posts</h2>
        <PostList posts={posts} />
      </section>
    </div>
  )
}
