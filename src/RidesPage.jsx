import { useCallback, useEffect, useState } from 'react'
import { club } from './config.js'
import { useLang } from './i18n.jsx'
import { allRides, findRide, photosFor, planFor } from './rides.js'

const waLink = (text) => `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(text)}`

const useTitle = (title) =>
  useEffect(() => {
    document.title = `${title} – 36RC`
    return () => {
      document.title = '36RC – Chhattisgarh Riding Club'
    }
  }, [title])

function Facts({ r }) {
  const { u } = useLang()
  return (
    <ul className="rcard-facts">
      <li><span>{u.distance}</span><em>{r.km.toLocaleString('en-IN')} km</em></li>
      <li><span>{u.duration}</span><em>{r.days} {r.days > 1 ? u.daysWord : u.day}</em></li>
      <li><span>{u.level}</span><em><b className={`level-dot level-${r.level.toLowerCase()}`} />{r.level}</em></li>
    </ul>
  )
}

function RideActions({ r }) {
  const { u, tr } = useLang()
  const place = tr(r.place)
  return (
    <div className="rcard-actions">
      <a className="btn btn-accent btn-sm" href={waLink(u.rideJoinMsg(club.name, place, r.date))} target="_blank" rel="noreferrer">
        {u.bookSeat} <span aria-hidden="true">→</span>
      </a>
      <a className="btn btn-ghost-dark btn-sm" href={waLink(u.rideInfoMsg(club.name, place))} target="_blank" rel="noreferrer">
        {u.details}
      </a>
    </div>
  )
}

function RideCard({ r, i, isNext }) {
  const { u, tr } = useLang()
  const place = tr(r.place)
  const href = `/rides/${r.slug}`
  return (
    <article className={`rcard ${r.done ? 'is-done' : ''}`} data-reveal style={{ '--d': `${(i % 4) * 0.06}s` }}>
      <a href={href} className="rcard-media" aria-label={place}>
        <img src={r.image} alt="" loading={i < 3 ? 'eager' : 'lazy'} />
        {isNext && <span className="rcard-next"><span className="pulse" aria-hidden="true" />{u.nextRide}</span>}
        {r.done && <span className="rcard-badge">{u.completed}</span>}
      </a>
      <div className="rcard-body">
        <p className="rcard-date">{r.date} {r.start.slice(0, 4)}</p>
        <h2 className="rcard-title"><a href={href}>{place}</a></h2>
        <p className="rcard-route">{tr(r.route)}</p>
        {r.about && <p className="rcard-about">{tr(r.about)}</p>}
        <Facts r={r} />
        <div className="rcard-foot">
          {!r.done && <RideActions r={r} />}
          <a href={href} className="link-arrow rcard-more">{u.rideDetails}</a>
        </div>
      </div>
    </article>
  )
}

// Saari rides ka page: upcoming / completed / sab
export default function RidesPage() {
  const { u } = useLang()
  const all = allRides()
  const upcoming = all.filter((r) => !r.done).sort((a, b) => a.start.localeCompare(b.start))
  const done = all.filter((r) => r.done).sort((a, b) => b.start.localeCompare(a.start))
  const [filter, setFilter] = useState(upcoming.length ? 'upcoming' : 'done')
  const list = filter === 'upcoming' ? upcoming : filter === 'done' ? done : [...upcoming, ...done]
  const totalKm = done.reduce((s, r) => s + r.km, 0)
  useTitle(u.ridesTitle)

  return (
    <main className="rpage">
      <header className="gpage-head">
        <div className="wrap">
          <a href="/#routes" className="gpage-back">← {u.backHome}</a>
          <p className="eyebrow eyebrow-light">{u.upcoming}</p>
          <h1 className="display gpage-title">{u.ridesTitle}</h1>
          <p className="gpage-lead">{u.ridesLead}</p>
          <dl className="rpage-stats">
            <div><dt>{u.upcomingRides}</dt><dd>{upcoming.length}</dd></div>
            <div><dt>{u.completedRides}</dt><dd>{done.length}</dd></div>
            <div><dt>{u.kmRidden}</dt><dd>{totalKm.toLocaleString('en-IN')}</dd></div>
          </dl>
          <div className="gpage-filters" role="tablist" aria-label={u.ridesTitle}>
            {[['upcoming', u.upcomingRides, upcoming.length], ['done', u.completedRides, done.length], ['all', u.filterAll, all.length]].map(([k, label, n]) => (
              <button key={k} role="tab" aria-selected={filter === k} className={filter === k ? 'is-active' : ''} onClick={() => setFilter(k)}>
                {label} <span>{n}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="wrap rpage-list" aria-live="polite">
        {list.length === 0 && <p className="rpage-empty">{u.noRides}</p>}
        {list.map((r, i) => <RideCard key={r.slug} r={r} i={i} isNext={r.slug === upcoming[0]?.slug} />)}
      </section>
    </main>
  )
}

// Ek ride ka detail page: /rides/:slug
export function RideDetail({ slug }) {
  const { u, tr } = useLang()
  const r = findRide(slug)
  const [open, setOpen] = useState(-1)
  const photos = r ? photosFor(r) : []
  const count = photos.length
  const step = useCallback((d) => setOpen((i) => (i + d + count) % count), [count])
  useTitle(r ? tr(r.place) : u.ridesTitle)

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

  if (!r) {
    return (
      <main className="rdetail-missing wrap">
        <h1 className="display h2">{u.rideNotFound}</h1>
        <a href="/rides" className="btn btn-dark">{u.viewAllRides} →</a>
      </main>
    )
  }

  const place = tr(r.place)
  const others = allRides().filter((x) => x.slug !== r.slug && !x.done).sort((a, b) => a.start.localeCompare(b.start)).slice(0, 3)

  return (
    <main className="rdetail">
      <header className="rdetail-hero">
        <img src={r.image} alt="" className="rdetail-bg" data-parallax="0.2" />
        <div className="rdetail-shade" />
        <div className="wrap rdetail-hero-inner">
          <a href="/rides" className="gpage-back">← {u.ridesTitle}</a>
          <p className="rdetail-status">
            {r.done ? u.completed : <><span className="pulse" aria-hidden="true" />{u.upcomingRides}</>}
            <span>·</span>{r.date} {r.start.slice(0, 4)}
          </p>
          <h1 className="display rdetail-title">{place}</h1>
          <p className="rdetail-route">{tr(r.route)}</p>
        </div>
      </header>

      <div className="wrap rdetail-body">
        <div className="rdetail-main">
          {r.about && <p className="rdetail-about">{tr(r.about)}</p>}

          <section className="rdetail-block">
            <h2 className="rdetail-h">{u.ridePlan}</h2>
            {planFor(r).map((d) => (
              <div key={d.day} className="rplan">
                {planFor(r).length > 1 && <p className="rplan-day">{u.dayN(d.day)}</p>}
                <ol>
                  {d.items.map(([time, what]) => (
                    <li key={time + tr(what)}><time>{time}</time><span>{tr(what)}</span></li>
                  ))}
                </ol>
              </div>
            ))}
            <p className="rdetail-note">{u.planNote}</p>
          </section>

          <section className="rdetail-block">
            <h2 className="rdetail-h">{u.ridePhotos}</h2>
            <div className="rgallery">
              {photos.map((src, i) => (
                <button key={src + i} className={`rgallery-item ${i === 0 ? 'is-big' : ''}`} onClick={() => setOpen(i)} aria-label={`${place} ${i + 1}`}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </section>

          <section className="rdetail-block">
            <h2 className="rdetail-h">{u.whatToCarry}</h2>
            <ul className="rcheck">
              {u.carryList.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </section>
        </div>

        <aside className="rdetail-side">
          <div className="rdetail-card">
            <p className="rcard-date">{r.date} {r.start.slice(0, 4)}</p>
            <h2 className="rcard-title">{place}</h2>
            <Facts r={r} />
            {!r.done ? <RideActions r={r} /> : <p className="rdetail-note">{u.rideDoneNote}</p>}
            <p className="rdetail-meet">{u.contactUs}: {club.phone}</p>
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="wrap rdetail-more">
          <div className="section-head">
            <h2 className="display h2">{u.moreRides}</h2>
            <a href="/rides" className="link-arrow">{u.viewAllRides}</a>
          </div>
          <div className="rmore">
            {others.map((o) => (
              <a key={o.slug} href={`/rides/${o.slug}`} className="rmore-item">
                <img src={o.image} alt="" loading="lazy" />
                <span className="rmore-cap"><b>{tr(o.place)}</b>{o.date} · {o.km} km</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {photos[open] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={place} onClick={() => setOpen(-1)}>
          <button className="lb-close" aria-label={u.close} onClick={() => setOpen(-1)}>×</button>
          <button className="lb-nav lb-prev" aria-label={u.prev} onClick={(e) => { e.stopPropagation(); step(-1) }}>←</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img key={photos[open]} src={photos[open]} alt={`${place} ${open + 1}`} />
            <figcaption><span>{String(open + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>{place}</figcaption>
          </figure>
          <button className="lb-nav lb-next" aria-label={u.next} onClick={(e) => { e.stopPropagation(); step(1) }}>→</button>
        </div>
      )}
    </main>
  )
}
