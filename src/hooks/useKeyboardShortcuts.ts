'use client'

import { useEffect } from 'react'

interface ShortcutHandlers {
  onEscape: () => void
  onSlash: () => void
}

export function useKeyboardShortcuts({ onEscape, onSlash }: ShortcutHandlers) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
      if (e.key === '/' && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
        onSlash()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onEscape, onSlash])
}
