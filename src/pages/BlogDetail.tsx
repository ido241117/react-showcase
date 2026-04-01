import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, User, Calendar, BookOpen } from 'lucide-react'
import { posts } from '../lib/mockData'

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const post = posts.find((p) => p.id === id)

  if (!post) return <Navigate to="/blog" replace />

  const related = posts.filter((p) => p.id !== id && p.category === post.category).slice(0, 2)

  const paragraphs = post.content.split('\n\n')

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <Link
          to="/blog"
          className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          <ArrowLeft size={15} /> Back to Blog
        </Link>
      </div>

      <div className={`h-56 rounded-2xl bg-gradient-to-br ${post.color}`} />

      <div>
        <span className="text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-2.5 py-1 rounded-full">
          {post.category}
        </span>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-4 mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-200 dark:border-slate-700">
          <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.createdAt}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} min read</span>
        </div>
      </div>

      <article className="prose dark:prose-invert max-w-none space-y-4">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {para}
          </p>
        ))}
      </article>

      {related.length > 0 && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-slate-400" />
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">Related Posts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.id}
                to={`/blog/${rel.id}`}
                className="group flex gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-violet-500 transition-colors"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${rel.color} shrink-0`} />
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{rel.readTime} min read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
