import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBag,
  Kanban,
  FormInput,
  Table,
  MessageSquare,
  LogIn,
  BookOpen,
  Settings,
  Home,
  Zap,
  X,
} from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Landing' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/shop', icon: ShoppingBag, label: 'Shop' },
  { to: '/kanban', icon: Kanban, label: 'Kanban' },
  { to: '/form-wizard', icon: FormInput, label: 'Form Wizard' },
  { to: '/data-table', icon: Table, label: 'Data Table' },
  { to: '/chat', icon: MessageSquare, label: 'Chat' },
  { to: '/auth', icon: LogIn, label: 'Auth' },
  { to: '/blog', icon: BookOpen, label: 'Blog' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={[
          'fixed top-0 left-0 h-full z-30 w-64 flex flex-col',
          'bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700',
          'transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              React Showcase
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="px-2 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Pages
          </p>
          <ul className="space-y-0.5">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100',
                    ].join(' ')
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Built with React + Vite + Supabase
          </p>
        </div>
      </aside>
    </>
  )
}
