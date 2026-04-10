'use client'

import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error) {
    console.error('[FlyQueens] Uncaught error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'var(--midnight)', gap: 16, padding: 24,
        }}>
          <div style={{ fontSize: 40 }}>✈️</div>
          <div className="font-display" style={{ fontSize: 20, fontWeight: 800, color: 'var(--red-alert)', letterSpacing: 2 }}>
            CHYBA SYSTÉMU
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 320 }}>
            Něco se pokazilo. Zkus stránku obnovit.
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div style={{
              background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
              borderRadius: 8, padding: '8px 14px', maxWidth: 400,
              fontSize: 10, color: 'var(--red-alert)', fontFamily: 'monospace',
            }}>
              {this.state.message}
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="btn-cta"
            style={{ width: 'auto', padding: '10px 24px', marginTop: 8 }}
          >
            OBNOVIT STRÁNKU
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
