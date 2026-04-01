import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Zap,
  LayoutDashboard,
  ShoppingBag,
  Kanban,
  FormInput,
  Table,
  MessageSquare,
  LogIn,
  BookOpen,
  Settings,
  ExternalLink,
} from 'lucide-react'

const pages = [
  {
    to: '/dashboard',
    icon: LayoutDashboard,
    title: 'Analytics Dashboard',
    desc: 'KPI cards, Recharts (Line, Bar, Pie), skeleton loading states',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    to: '/shop',
    icon: ShoppingBag,
    title: 'E-Commerce Shop',
    desc: 'Product grid, category filter, debounced search, Zustand cart drawer',
    color: 'from-violet-500 to-purple-600',
  },
  {
    to: '/kanban',
    icon: Kanban,
    title: 'Kanban Board',
    desc: '@dnd-kit drag & drop between columns, add card form',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    to: '/form-wizard',
    icon: FormInput,
    title: 'Multi-step Form',
    desc: '4-step wizard with react-hook-form + Zod validation',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    to: '/data-table',
    icon: Table,
    title: 'Data Table',
    desc: 'TanStack Table — sort, global filter, pagination (50 rows)',
    color: 'from-orange-500 to-red-600',
  },
  {
    to: '/chat',
    icon: MessageSquare,
    title: 'Real-time Chat',
    desc: 'Supabase Realtime subscriptions, login-gated, auto-scroll',
    color: 'from-pink-500 to-rose-600',
  },
  {
    to: '/auth',
    icon: LogIn,
    title: 'Auth Flow',
    desc: 'Login & Register tabs backed by Supabase Auth',
    color: 'from-amber-500 to-orange-600',
  },
  {
    to: '/blog',
    icon: BookOpen,
    title: 'Blog',
    desc: 'TanStack Query, category filter, listing + detail view',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    to: '/settings',
    icon: Settings,
    title: 'Settings',
    desc: 'Dark / light theme toggle (Zustand), profile UI, notifications',
    color: 'from-slate-500 to-slate-700',
  },
]

const techStack = [
  'React 19', 'TypeScript', 'Vite', 'TailwindCSS v4',
  'React Router v7', 'TanStack Query', 'TanStack Table',
  'Zustand', 'Supabase', 'Recharts', '@dnd-kit', 'react-hook-form', 'Zod',
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <Zap size={16} />
          </div>
          <span className="font-semibold text-slate-100">React Showcase</span>
        </div>
        <a
          href="https://github.com"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
          GitHub
        </a>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <Zap size={12} />
          Portfolio showcase — April 2026
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent leading-tight">
          React Showcase
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          9 interactive pages demonstrating modern React patterns — state management, real-time data, drag & drop, data tables, charts, and more.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            View Demo <ArrowRight size={16} />
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Try Auth Flow
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-semibold text-slate-300 mb-6 text-center">What's inside</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map(({ to, icon: Icon, title, desc, color }) => (
            <Link
              key={to}
              to={to}
              className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 hover:bg-white/[0.06] hover:border-white/20 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon size={18} className="text-white" />
              </div>
              <h3 className="font-semibold text-slate-100 mb-1 group-hover:text-white transition-colors">
                {title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              <ArrowRight
                size={14}
                className="absolute top-5 right-5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-semibold text-slate-300 mb-4 text-center">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="bg-white/[0.05] border border-white/10 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-6 text-center text-sm text-slate-600">
        Built with React 19 + Vite + Supabase · Deployed on Vercel
      </footer>
    </div>
  )
}
