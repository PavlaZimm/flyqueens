// Souhrn zdrojů na konci článku. U ceníků a proměnlivých údajů je zdroj
// i datum platnosti nutnost: bez nich text za rok lže, aniž by to bylo poznat.
// Odkazy jsou ověřené (stav HTTP 200 v době psaní).

export interface Source {
  label: string
  href?: string
}

export function SourcesBox({ sources, note }: { sources: Source[]; note?: string }) {
  return (
    <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)', borderRadius: 12 }}>
      <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 8 }}>
        Zdroje
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.7, color: 'var(--text-muted)' }}>
        {sources.map((s, i) => (
          <li key={i}>
            {s.href ? (
              <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>
                {s.label} ↗
              </a>
            ) : (
              s.label
            )}
          </li>
        ))}
      </ul>
      {note && (
        <p style={{ margin: '10px 0 0', fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.6 }}>{note}</p>
      )}
    </div>
  )
}
