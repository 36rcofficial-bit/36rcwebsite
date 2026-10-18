import { useCallback, useEffect, useState } from 'react'
import { club } from './config.js'
import { useLang } from './i18n.jsx'

// Poora gallery page: filter, masonry grid, lightbox (← → Esc)
export default function GalleryPage() {
  const { u, tr } = useLang()
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(-1)

  const photos = club.galleryAll.filter((p) => filter === 'all' || p.type === filter)
  const counts = {
    all: club.galleryAll.length,
    club: club.galleryAll.filter((p) => p.type === 'club').length,
    ride: club.galleryAll.filter((p) => p.type === 'ride').length,
  }

  useEffect(() => {
    document.title = `${u.galleryEyebrow} – 36RC`
    return () => {
      document.title = '36RC – Chhattisgarh Riding Club'
    }
  }, [u.galleryEyebrow])

  const step = useCallback((d) => setOpen((i) => (i + d + photos.length) % photos.length), [photos.length])

  useEffect(() => {
    if (open < 0) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(-1)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    window.__lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      window.__lenis?.start()
    }
  }, [open, step])

  const current = photos[open]

  return (
    <main className="gpage">
      <header className="gpage-head">
        <div className="wrap">
          <a href="/#gallery" className="gpage-back">← {u.backHome}</a>
          <p className="eyebrow eyebrow-light">{u.galleryEyebrow}</p>
          <h1 className="display gpage-title">{u.galleryTitle}</h1>
          <p className="gpage-lead">{u.galleryLead}</p>
          <div className="gpage-filters" role="tablist" aria-label={u.galleryEyebrow}>
            {[['all', u.filterAll], ['club', u.filterClub], ['ride', u.filterRides]].map(([k, label]) => (
              <button key={k} role="tab" aria-selected={filter === k} className={filter === k ? 'is-active' : ''} onClick={() => setFilter(k)}>
                {label} <span>{counts[k]}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="wrap gpage-grid" aria-live="polite">
        {photos.map((p, i) => (
          <button key={p.image} className="gpage-item" data-reveal style={{ '--d': `${(i % 3) * 0.06}s` }} onClick={() => setOpen(i)} aria-label={tr(p.caption)}>
            <img src={p.image} alt={tr(p.caption)} loading={i < 6 ? 'eager' : 'lazy'} />
            <span className="gpage-cap">{tr(p.caption)}</span>
          </button>
        ))}
      </section>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={tr(current.caption)} onClick={() => setOpen(-1)}>
          <button className="lb-close" aria-label={u.close} onClick={() => setOpen(-1)}>×</button>
          <button className="lb-nav lb-prev" aria-label={u.prev} onClick={(e) => { e.stopPropagation(); step(-1) }}>←</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img key={current.image} src={current.image} alt={tr(current.caption)} />
            <figcaption>
              <span>{String(open + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
              {tr(current.caption)}
            </figcaption>
          </figure>
          <button className="lb-nav lb-next" aria-label={u.next} onClick={(e) => { e.stopPropagation(); step(1) }}>→</button>
        </div>
      )}
    </main>
  )
}
