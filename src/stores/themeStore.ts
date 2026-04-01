import { create } from 'zustand'

interface ThemeState {
  isDark: boolean
  toggle: () => void
  setDark: (isDark: boolean) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggle: () =>
    set((state) => {
      const next = !state.isDark
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return { isDark: next }
    }),
  setDark: (isDark) =>
    set(() => {
      document.documentElement.classList.toggle('dark', isDark)
      return { isDark }
    }),
}))
