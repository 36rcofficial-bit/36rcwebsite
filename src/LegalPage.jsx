import { useEffect } from 'react'
import { legal } from './legal.js'
import { useLang } from './i18n.jsx'

const PAGES = [
  ['privacy', '/privacy'],
  ['terms', '/terms'],
  ['cookies', '/cookies'],
]

// Privacy, Terms, Cookies: ek hi layout, content legal.js se
export default function LegalPage({ page }) {
  const { u } = useLang()
  const doc = legal[page]

  useEffect(() => {
    document.title = `${doc.title} – 36RC`
    return () => {
      document.title = '36RC – Chhattisgarh Riding Club'
    }
  }, [doc.title])

  return (
    <main className="legal">
      <header className="legal-head">
        <div className="wrap">
          <a href="/" className="gpage-back">← {u.backHome}</a>
          <h1 className="display legal-title">{doc.title}</h1>
          <p className="legal-updated">{u.lastUpdated}: {doc.updated}</p>
        </div>
      </header>

      <div className="wrap legal-body">
        <nav className="legal-nav" aria-label="Legal">
          {PAGES.map(([key, href]) => (
            <a key={key} href={href} aria-current={key === page ? 'page' : undefined}>{legal[key].title}</a>
          ))}
        </nav>

        <article className="legal-doc">
          <p className="legal-intro">{doc.intro}</p>
          {doc.sections.map((s, i) => (
            <section key={s.h}>
              <h2><span>{String(i + 1).padStart(2, '0')}</span>{s.h}</h2>
              {s.list && (
                <ul>
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
              {s.table && (
                <div className="legal-table">
                  <table>
                    <thead>
                      <tr>{s.table[0].map((c) => <th key={c} scope="col">{c}</th>)}</tr>
                    </thead>
                    <tbody>
                      {s.table.slice(1).map((row) => (
                        <tr key={row[0]}>{row.map((c) => <td key={c}>{c}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.p?.map((t) => <p key={t}>{t}</p>)}
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}
