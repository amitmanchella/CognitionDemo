import PostCard from './PostCard'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  readingTime: number
}

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
