'use client'

import { useState } from 'react'

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

function getInitialTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'dark'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved)
    return saved
  }
  return 'dark'
}

export function useTheme(): UseThemeResult {
  // Lazy initializer — čte localStorage jednou při mount, žádný cascading render
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  return { theme, toggleTheme }
}
