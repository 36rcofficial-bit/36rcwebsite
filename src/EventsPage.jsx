import { useCallback, useEffect, useState } from 'react'
import { club } from './config.js'
import { useLang } from './i18n.jsx'
import { events, findEvent } from './events.js'

// Exclusive Events: list (/events) aur detail (/events/:slug)

const useTitle = (title) =>
  useEffect(() => {
    document.title = `${title} – 36RC`
    return () => {
      document.title = '36RC – Chhattisgarh Riding Club'
    }
  }, [title])

function StatusPill({ e }) {
  const { u } = useLang()
  const label = e.status === 'done' ? u.evDone : e.status === 'upcoming' ? u.upcomingRides : u.evSoon
  return (
    <span className={`ev-pill ev-${e.status}`}>
      {e.status !== 'done' && <span className="pulse" aria-hidden="true" />}
      {label}
    </span>
  )
}

export default function EventsPage() {
  const { u, tr } = useLang()
  useTitle(u.eventsTitle)

  return (
    <main className="rpage">
      <header className="gpage-head">
        <div className="wrap">
          <a href="/" className="gpage-back">← {u.backHome}</a>
          <p className="eyebrow eyebrow-light">36RC</p>
          <h1 className="display gpage-title">{u.eventsTitle}</h1>
          <p className="gpage-lead">{u.eventsLead}</p>
        </div>
      </header>

      <section className="wrap ev-list">
        {events.map((e, i) => (
          <a key={e.slug} href={`/events/${e.slug}`} className={`ev-card ${i === 0 ? 'is-wide' : ''}`} data-reveal style={{ '--d': `${i * 0.08}s` }}>
            <img src={e.hero} alt="" loading={i < 2 ? 'eager' : 'lazy'} />
            <span className="ev-shade" />
            <span className="ev-top"><StatusPill e={e} /><span className="ev-season">{tr(e.season)}</span></span>
            <span className="ev-body">
              <b className="ev-title">{e.title}</b>
              <span className="ev-tag">{tr(e.tagline)}</span>
              <span className="ev-meta">{tr(e.when)} · {tr(e.where)}</span>
              <span className="ev-more">{u.evExplore} →</span>
            </span>
          </a>
        ))}
      </section>
    </main>
  )
}

export function EventDetail({ slug }) {
  const { u, tr } = useLang()
  const e = findEvent(slug)
  const [open, setOpen] = useState(-1)
  const photos = e ? e.photos : []
  const count = photos.length
  const step = useCallback((d) => setOpen((i) => (i + d + count) % count), [count])
  useTitle(e ? `${e.title} ${tr(e.season)}` : u.eventsTitle)

  useEffect(() => {
    if (open < 0) return
    const onKey = (ev) => {
      if (ev.key === 'Escape') setOpen(-1)
      if (ev.key === 'ArrowRight') step(1)
      if (ev.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    window.__lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      window.__lenis?.start()
    }
  }, [open, step])

  if (!e) {
    return (
      <main className="rdetail-missing wrap">
        <h1 className="display h2">{u.evNotFound}</h1>
        <a href="/events" className="btn btn-dark">{u.eventsTitle} →</a>
      </main>
    )
  }

  const name = `${e.title} ${tr(e.season)}`
  const wa = `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(u.evMsg(club.name, name))}`
  const others = events.filter((x) => x.slug !== e.slug)

  return (
    <main className="meet">
      <header className="rdetail-hero">
        <img src={e.hero} alt="" className="rdetail-bg" data-parallax="0.2" />
        <div className="rdetail-shade" />
        <div className="wrap rdetail-hero-inner">
          <a href="/events" className="gpage-back">← {u.eventsTitle}</a>
          <p className="rdetail-status"><StatusPill e={e} /><span>{tr(e.season)}</span></p>
          <h1 className="display rdetail-title">{e.title}</h1>
          <p className="rdetail-route meet-lead">{tr(e.tagline)}</p>
          <div className="ev-hero-meta">
            <span><small>{u.evWhen}</small>{tr(e.when)}</span>
            <span><small>{u.evWhere}</small>{tr(e.where)}</span>
          </div>
          <a href={wa} target="_blank" rel="noreferrer" className="btn btn-accent meet-cta">{e.status === 'done' ? u.evNotify : u.evInterested} →</a>
        </div>
      </header>

      <section className="wrap meet-about">
        <h2 className="display h2" data-reveal>{u.evAbout}</h2>
        <div className="meet-about-text" data-reveal>
          {e.about.map((p) => <p key={p.en}>{tr(p)}</p>)}
        </div>
      </section>

      <section className="section-sand meet-what">
        <div className="wrap">
          <h2 className="display h2" data-reveal>{u.evHighlights}</h2>
          <div className="meet-grid">
            {e.highlights.map(([h, p], i) => (
              <div key={h.en} className="meet-item" data-reveal style={{ '--d': `${i * 0.08}s` }}>
                <span className="meet-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{tr(h)}</h3>
                <p>{tr(p)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap meet-gallery">
        <div className="section-head">
          <h2 className="display h2" data-reveal>{u.ridePhotos}</h2>
          <a href="/gallery" className="link-arrow" data-reveal>{u.viewGallery}</a>
        </div>
        <div className={`meet-photos ${count < 8 ? 'is-six' : ''}`}>
          {photos.map((src, i) => (
            <button key={src} className={`rgallery-item m-${i}`} onClick={() => setOpen(i)} aria-label={`${name} ${i + 1}`} data-reveal="zoom" style={{ '--d': `${(i % 3) * 0.06}s` }}>
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      <section className="wrap rdetail-more">
        <div className="section-head">
          <h2 className="display h2">{u.evMore}</h2>
          <a href="/events" className="link-arrow">{u.eventsTitle}</a>
        </div>
        <div className={`rmore ${others.length === 2 ? 'is-two' : ''}`}>
          {others.map((o) => (
            <a key={o.slug} href={`/events/${o.slug}`} className="rmore-item">
              <img src={o.hero} alt="" loading="lazy" />
              <span className="rmore-cap"><b>{o.title}</b>{tr(o.season)} · {tr(o.when)}</span>
            </a>
          ))}
        </div>
      </section>

      {photos[open] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={name} onClick={() => setOpen(-1)}>
          <button className="lb-close" aria-label={u.close} onClick={() => setOpen(-1)}>×</button>
          <button className="lb-nav lb-prev" aria-label={u.prev} onClick={(ev) => { ev.stopPropagation(); step(-1) }}>←</button>
          <figure onClick={(ev) => ev.stopPropagation()}>
            <img key={photos[open]} src={photos[open]} alt={`${name} ${open + 1}`} />
            <figcaption><span>{String(open + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>{name}</figcaption>
          </figure>
          <button className="lb-nav lb-next" aria-label={u.next} onClick={(ev) => { ev.stopPropagation(); step(1) }}>→</button>
        </div>
      )}
    </main>
  )
}
