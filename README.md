# Demo Blog

A minimal personal blog built with Next.js 14 for demoing the Devin GitHub Issues integration.

## Angular 14 to 18 Upgrade Demo

This repository also serves as a demonstration of upgrading an Angular application from version 14 to version 18. The upgrade covers the following key changes:

### Upgrade Highlights

- **Angular 14 to 15**: Migration to standalone components, updated `@angular/router` APIs, and removal of deprecated `entryComponents`.
- **Angular 15 to 16**: Adoption of Signals for reactive state management, required inputs, and `DestroyRef` for cleaner subscription handling.
- **Angular 16 to 17**: New control flow syntax (`@if`, `@for`, `@switch`), deferrable views with `@defer`, and improved SSR hydration.
- **Angular 17 to 18**: Zoneless change detection support, stabilized Signals API, and new `withFetch` for `HttpClient`.

### Migration Steps

1. Update Angular CLI and core packages incrementally (one major version at a time).
2. Run `ng update` for each version to apply automatic migrations.
3. Address breaking changes and deprecated APIs at each step.
4. Update third-party dependencies for compatibility with each Angular version.
5. Run tests and verify application functionality after each upgrade.

### Key Configuration Changes

- Updated `angular.json` build configuration for the new application builder.
- Migrated from `NgModules` to standalone components where applicable.
- Replaced legacy `HttpModule` with `provideHttpClient()`.
- Updated RxJS usage patterns to align with v7+ best practices.

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
