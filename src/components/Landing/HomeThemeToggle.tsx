'use client'

import { useTheme } from '@/hooks/useTheme'

type HomeThemeToggleProps = {
  className?: string
}

export function HomeThemeToggle({ className }: HomeThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={className}
      onClick={toggleTheme}
      aria-label={isDark ? 'Přepnout homepage na světlý režim' : 'Přepnout homepage na tmavý režim'}
      aria-pressed={!isDark}
      title={isDark ? 'Světlý režim' : 'Tmavý režim'}
    >
      <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
      <span>{isDark ? 'Světlá' : 'Tmavá'}</span>
    </button>
  )
}
