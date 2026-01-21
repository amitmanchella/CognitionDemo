import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  readingTime: number
  wordCount: number
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).filter((word) => word.length > 0)
  const wordCount = words.length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, readingTime)
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const words = content.split(/\s+/).filter((word) => word.length > 0)
      const wordCount = words.length
      const readingTime = calculateReadingTime(content)

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content,
        readingTime,
        wordCount,
      }
    })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const words = content.split(/\s+/).filter((word) => word.length > 0)
    const wordCount = words.length
    const readingTime = calculateReadingTime(content)

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
      readingTime,
      wordCount,
    }
  } catch {
    return undefined
  }
}
