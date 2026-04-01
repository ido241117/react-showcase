import { useState } from 'react'
import { Sun, Moon, Monitor, Bell, Shield, Trash2, User } from 'lucide-react'
import { useThemeStore } from '../stores/themeStore'
import { useAuth } from '../hooks/useAuth'

type ThemeMode = 'light' | 'dark' | 'system'

const themeOptions: { value: ThemeMode; icon: React.ReactNode; label: string }[] = [
  { value: 'light', icon: <Sun size={16} />, label: 'Light' },
  { value: 'dark', icon: <Moon size={16} />, label: 'Dark' },
  { value: 'system', icon: <Monitor size={16} />, label: 'System' },
]

const notifOptions = [
  { id: 'email', label: 'Email notifications', desc: 'Receive updates via email' },
  { id: 'push', label: 'Push notifications', desc: 'Browser push alerts' },
  { id: 'marketing', label: 'Marketing emails', desc: 'Product news and tips' },
  { id: 'security', label: 'Security alerts', desc: 'Login and account changes' },
]

export default function Settings() {
  const { isDark, toggle } = useThemeStore()
  const { user } = useAuth()
  const [themeMode, setThemeMode] = useState<ThemeMode>(isDark ? 'dark' : 'light')
  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    email: true,
    push: false,
    marketing: false,
    security: true,
  })
  const [saved, setSaved] = useState(false)

  const applyTheme = (mode: ThemeMode) => {
    setThemeMode(mode)
    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark !== isDark) toggle()
    } else if ((mode === 'dark') !== isDark) {
      toggle()
    }
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleNotif = (id: string) => {
    setNotifs((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your preferences and account</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <User size={18} className="text-slate-500" />
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Profile</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-2xl font-bold text-violet-600 dark:text-violet-400">
            {user?.email?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              {user?.email ?? 'guest@example.com'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {user ? 'Authenticated via Supabase' : 'Not signed in (demo mode)'}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Display name</label>
            <input
              type="text"
              placeholder="Your name"
              defaultValue=""
              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Language</label>
            <select className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500">
              <option>English</option>
              <option>Vietnamese</option>
              <option>Japanese</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Monitor size={18} className="text-slate-500" />
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Appearance</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Choose your preferred theme</p>
        <div className="flex gap-2">
          {themeOptions.map(({ value, icon, label }) => (
            <button
              key={value}
              onClick={() => applyTheme(value)}
              className={[
                'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-colors',
                themeMode === value
                  ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                  : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700',
              ].join(' ')}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell size={18} className="text-slate-500" />
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Notifications</h2>
        </div>
        <div className="space-y-4">
          {notifOptions.map(({ id, label, desc }) => (
            <div key={id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
              <button
                onClick={() => toggleNotif(id)}
                className={[
                  'relative w-10 h-5.5 rounded-full transition-colors',
                  notifs[id] ? 'bg-violet-600' : 'bg-slate-200 dark:bg-slate-600',
                ].join(' ')}
                style={{ height: '22px', minWidth: '40px' }}
              >
                <span
                  className={[
                    'absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform',
                    notifs[id] ? 'translate-x-[18px]' : 'translate-x-0',
                  ].join(' ')}
                  style={{ width: '18px', height: '18px' }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={18} className="text-slate-500" />
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Account</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Change Password
          </button>
          <button className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2">
            <Trash2 size={14} />
            Delete Account
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={[
            'px-6 py-2.5 text-sm font-medium rounded-xl transition-all',
            saved
              ? 'bg-emerald-600 text-white'
              : 'bg-violet-600 hover:bg-violet-700 text-white',
          ].join(' ')}
        >
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
