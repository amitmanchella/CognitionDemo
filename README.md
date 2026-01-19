# Demo Blog

A minimal personal blog built with Next.js 14 for demoing the Devin GitHub Issues integration.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **MDX** for blog posts
- **No database** (static content)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd demo-blog
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
demo-blog/
├── app/
│   ├── layout.tsx          # Root layout with navbar and footer
│   ├── page.tsx             # Home page with post list
│   ├── globals.css          # Global styles and Tailwind
│   ├── about/
│   │   └── page.tsx         # About page
│   └── posts/
│       └── [slug]/
│           └── page.tsx     # Individual post page
├── components/
│   ├── Navbar.tsx           # Navigation component
│   ├── Footer.tsx           # Footer component
│   ├── PostCard.tsx         # Post preview card
│   └── PostList.tsx         # List of post cards
├── content/
│   └── posts/               # MDX blog posts
│       ├── getting-started-with-nextjs.mdx
│       ├── why-i-love-typescript.mdx
│       └── building-side-projects.mdx
├── lib/
│   └── posts.ts             # Post utilities
├── public/
│   └── images/              # Static images
└── README.md
```

## Adding New Posts

Create a new `.mdx` file in `content/posts/` with the following frontmatter:

```mdx
---
title: "Your Post Title"
date: "2024-01-20"
excerpt: "A brief description of your post."
---

Your post content here...
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## License

MIT
