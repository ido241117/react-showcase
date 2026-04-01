import { useState, useEffect, useRef } from 'react'
import { Send, MessageSquare, AlertCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import type { Message } from '../types'
import { Link } from 'react-router-dom'

function ConfigBanner() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
        <MessageSquare size={28} className="text-slate-400" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Supabase not configured
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm leading-relaxed">
          Add <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono">VITE_SUPABASE_URL</code> and{' '}
          <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono">VITE_SUPABASE_ANON_KEY</code>{' '}
          to your <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono">.env.local</code> file and create a{' '}
          <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono">messages</code> table with Realtime enabled.
        </p>
      </div>
    </div>
  )
}

function LoginBanner() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center">
      <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
        <AlertCircle size={28} className="text-amber-500" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Sign in to chat</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
          Chat requires an authenticated user.
        </p>
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
        >
          Go to Auth page
        </Link>
      </div>
    </div>
  )
}

function ChatUI({ userId, username }: { userId: string; username: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50)
      .then(({ data }) => {
        if (data) setMessages(data as Message[])
      })

    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        },
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || sending) return
    setSending(true)
    setInput('')
    await supabase.from('messages').insert({
      user_id: userId,
      username,
      content: text,
    })
    setSending(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100">Global Chat</h2>
        <p className="text-xs text-emerald-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          Supabase Realtime connected
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-sm text-slate-400 py-8">No messages yet. Say hello!</p>
        )}
        {messages.map((msg) => {
          const isMe = msg.user_id === userId
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
              <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400 shrink-0">
                {msg.username[0]?.toUpperCase()}
              </div>
              <div className={`max-w-xs ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                <span className="text-xs text-slate-400">{msg.username}</span>
                <div className={[
                  'px-3 py-2 rounded-xl text-sm',
                  isMe
                    ? 'bg-violet-600 text-white rounded-tr-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-tl-sm',
                ].join(' ')}>
                  {msg.content}
                </div>
                <span className="text-xs text-slate-300 dark:text-slate-600">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message… (Enter to send)"
          className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-violet-500"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || sending}
          className="p-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}

export default function Chat() {
  const { user, loading } = useAuth()

  if (!isSupabaseConfigured) return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Chat</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Supabase Realtime · login-gated · auto-scroll</p>
      </div>
      <ConfigBanner />
    </div>
  )

  if (loading) return (
    <div className="max-w-3xl mx-auto">
      <div className="h-7 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4" />
      <div className="h-[60vh] bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 animate-pulse" />
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Chat</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Supabase Realtime · login-gated · auto-scroll</p>
      </div>
      {!user ? (
        <LoginBanner />
      ) : (
        <ChatUI
          userId={user.id}
          username={user.email?.split('@')[0] ?? 'User'}
        />
      )}
    </div>
  )
}
