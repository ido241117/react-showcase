import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Search, Clock, User } from 'lucide-react'
import type { Post } from '../types'
import { posts as allPosts } from '../lib/mockData'

const categories = ['All', 'Tech', 'Design']

async function fetchPosts(category: string, search: string): Promise<Post[]> {
  await new Promise((r) => setTimeout(r, 600))
  return allPosts.filter((p) => {
    const matchCat = category === 'All' || p.category === category
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md dark:hover:shadow-slate-900 transition-all"
    >
      <div className={`h-36 bg-gradient-to-br ${post.color}`} />
      <div className="p-5">
        <span className="text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-2 py-0.5 rounded-full">
          {post.category}
        </span>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mt-2 mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1"><User size={11} /> {post.author}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} min read</span>
          <span>{post.createdAt}</span>
        </div>
      </div>
    </Link>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse">
      <div className="h-36 bg-slate-200 dark:bg-slate-700" />
      <div className="p-5 space-y-2">
        <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    </div>
  )
}

export default function Blog() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', category, search],
    queryFn: () => fetchPosts(category, search),
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Blog</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Fetched with TanStack Query · category filter · search
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="flex gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                category === cat
                  ? 'bg-violet-600 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg font-medium mb-1">No posts found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      )}
    </div>
  )
}
