'use client'

import { useEffect } from 'react'

interface ShortcutHandlers {
  onEscape: () => void
  onSlash: () => void
  onFullscreen?: () => void
}

export function useKeyboardShortcuts({ onEscape, onSlash, onFullscreen }: ShortcutHandlers) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const inField = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement
      if (e.key === 'Escape') onEscape()
      if (e.key === '/' && !inField) {
        e.preventDefault()
        onSlash()
      }
      if ((e.key === 'f' || e.key === 'F') && !inField && onFullscreen) {
        e.preventDefault()
        onFullscreen()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onEscape, onSlash, onFullscreen])
}
