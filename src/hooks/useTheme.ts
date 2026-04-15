'use client'

import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light'

interface UseThemeResult {
  theme: Theme
  toggleTheme: () => void
}

const STORAGE_KEY = 'flyqueens-theme'

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  if (theme === 'light') {
    document.documentElement.classList.add('light')
  } else {
    document.documentElement.classList.remove('light')
  }
}

export function useTheme(): UseThemeResult {
  // Vždy začínáme 'dark' — stejné na serveru i klientu, žádný hydration mismatch
  const [theme, setTheme] = useState<Theme>('dark')

  // Po mount načteme localStorage a aplikujeme uložené téma
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light') {
      setTheme('light')
      applyTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  return { theme, toggleTheme }
}
