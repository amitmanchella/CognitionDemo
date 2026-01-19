import PostCard from './PostCard'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
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
