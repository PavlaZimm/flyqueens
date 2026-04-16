'use client'

import { useEffect } from 'react'

/**
 * Dynamicky překresluje favicon se živým počtem letadel.
 * Při emergency (squawk 7700/7500/7600) přepne ikonu na červenou.
 */
export function useFaviconCount(count: number, hasEmergency: boolean) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const canvas = document.createElement('canvas')
    canvas.width  = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Pozadí — tmavé nebo červené při emergency
    const bgColor = hasEmergency ? '#ef4444' : '#0f172a'
    ctx.fillStyle = bgColor
    roundRect(ctx, 0, 0, 32, 32, 6)
    ctx.fill()

    // ✈ symbol
    ctx.fillStyle = hasEmergency ? '#ffffff' : '#FDE047'
    ctx.font      = 'bold 16px sans-serif'
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✈', 16, 13)

    // Počet letadel — malý text dole
    if (count > 0) {
      const label = count >= 10000 ? `${Math.floor(count / 1000)}k` : String(count)
      ctx.fillStyle    = hasEmergency ? '#ffffff' : '#FDE047'
      ctx.font         = `bold ${label.length > 3 ? 7 : 8}px sans-serif`
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, 16, 25)
    }

    // Nahradit favicon
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"][sizes="32x32"]')
    if (!link) {
      link = document.createElement('link')
      link.rel  = 'icon'
      link.type = 'image/png'
      link.setAttribute('sizes', '32x32')
      document.head.appendChild(link)
    }
    link.href = canvas.toDataURL('image/png')
  }, [count, hasEmergency])
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}
