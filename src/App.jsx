import { useEffect, useState } from 'react'
import { club } from './config.js'
import Scene from './Scene.jsx'
import Intro from './Intro.jsx'
import { LangProvider, LangToggle, useLang } from './i18n.jsx'
import { CountUp, useHeaderState, useReveal, useSmoothScroll } from './motion.jsx'

const year = new Date().getFullYear()

const waLink = (text) =>
  `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(text)}`

const pad = (n) => String(n).padStart(2, '0')

// Asli photo ho to photo, warna illustration. `parallax` diya to scroll pe halki movement.
function Media({ image, scene, seed, withRoad, label, eager = false, parallax, position }) {
  const props = parallax ? { 'data-parallax': parallax } : {}
  if (image) {
    return (
      <img
        className={`media-img ${parallax ? 'is-parallax' : ''}`}
        src={image}
        alt={label}
        loading={eager ? 'eager' : 'lazy'}
        style={position ? { objectPosition: position } : undefined}
        {...props}
      />
    )
  }
  return <Scene scene={scene} seed={seed} withRoad={withRoad} />
}

// Club logo. tone="light" = safed 36 (dark background ke liye), "dark" = kaala 36 (light background ke liye)
function Logo({ tone = 'light', className = '', eager = false }) {
  const src = `/images/logo-${tone}`
  return (
    <picture className={className}>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={`${src}.png`} alt={club.fullName} width="900" height="224" loading={eager ? 'eager' : 'lazy'} />
    </picture>
  )
}

const icons = {
  shield: <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z M9 12l2 2 4-4" />,
  route: <path d="M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM6 15V9a4 4 0 014-4h2M18 9v6a4 4 0 01-4 4h-2" />,
  people: <path d="M9 11a3 3 0 100-6 3 3 0 000 6zM17 11a2.5 2.5 0 100-5M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 14c2.8 0 5 2.2 5 5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  pin: <path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  calendar: <path d="M4 6.5h16v13H4zM4 10.5h16M8.5 3.5v5M15.5 3.5v5" />,
}

function Icon({ name, className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function Header() {
  const { u } = useLang()
  const { solid, hidden } = useHeaderState()
  const [open, setOpen] = useState(false)
  const links = [
    ['#about', u.nav.about],
    ['#routes', u.nav.routes],
    ['#journal', u.nav.journal],
    ['#faq', u.nav.faq],
  ]
  const cls = ['header', solid || open ? 'header-solid' : '', hidden && !open ? 'header-hidden' : '']
  return (
    <header className={cls.join(' ')}>
      <div className="wrap header-inner">
        <a href="#top" className="brand" aria-label={`${club.fullName} home`}>
          <Logo className="brand-logo" eager />
        </a>
        <nav className="header-links">
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <LangToggle />
        <a href="#join" className="btn btn-light btn-sm header-cta">{u.joinClub}</a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
      {open && (
        <nav className="drawer wrap">
          {[...links, ['#join', u.joinClub]].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </header>
  )
}

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, new Date(target).getTime() - now)
  return {
    days: Math.floor(diff / 86400000),
    hrs: Math.floor(diff / 3600000) % 24,
    mins: Math.floor(diff / 60000) % 60,
    secs: Math.floor(diff / 1000) % 60,
  }
}

function NextRideCard() {
  const { u, tr } = useLang()
  const n = club.nextRide
  const t = useCountdown(n.start)
  return (
    <aside className="ride-card hero-in" style={{ '--d': '1s' }} aria-labelledby="ride-card-title">
      <div className="ride-card-head">
        <span className="ride-card-label"><span className="pulse" aria-hidden="true" />{u.nextRide}</span>
        <span className="ride-card-date">{n.dates}</span>
      </div>
      <h2 id="ride-card-title" className="ride-card-title">{n.title}</h2>
      <p className="ride-card-meta">
        {tr(n.distance)} · {n.days} {n.days > 1 ? u.daysWord : u.day}
        <a href={waLink(u.rideInfoMsg(club.name, n.title))} target="_blank" rel="noreferrer">{u.details}</a>
      </p>
      <div className="ride-card-row">
        <p className="ride-card-count" aria-label="Time left to flag off">
          {[['days', 'd'], ['hrs', 'h'], ['mins', 'm'], ['secs', 's']].map(([k, l]) => (
            <span key={k}><strong>{pad(t[k])}</strong>{l}</span>
          ))}
        </p>
        <a className="btn btn-accent btn-sm" href={waLink(u.rideJoinMsg(club.name, n.title, n.dates))} target="_blank" rel="noreferrer">
          {u.countIn} <Icon name="arrow" className="btn-icon" />
        </a>
      </div>
    </aside>
  )
}

const SLIDE_MS = 6500

function Hero() {
  const { u, tr } = useLang()
  const h = club.hero
  const total = h.slides.length + 1
  // ?slide=2 jaisa link kisi khaas slide se shuru karta hai
  const [idx, setIdx] = useState(() => {
    const n = Number(new URLSearchParams(window.location.search).get('slide'))
    return Number.isInteger(n) && n > 0 && n < total ? n : 0
  })

  // Har slide SLIDE_MS tak; click karne pe timer wahi se dobara
  useEffect(() => {
    // Intro chal raha ho to pehli slide utni der aur rukti hai
    const extra = document.documentElement.classList.contains('has-intro') ? 4000 : 0
    const id = setTimeout(() => setIdx((i) => (i + 1) % total), SLIDE_MS + extra)
    return () => clearTimeout(id)
  }, [idx, total])

  const captions = [{ en: 'Dust, dirt and the open road', hi: 'Dhool, mitti aur khuli sadak' }, ...h.slides.map((s) => s.caption)]

  return (
    <section className="hero" id="top" data-slide={idx}>
      {/* Slide 0: photo → bada 36RC → kata hua rider (rider naam ke aage) */}
      <div className={`hero-slide ${idx === 0 ? 'is-active' : ''}`}>
        <div className="hero-stage hero-bg" data-parallax="0.3">
          <picture>
            <source srcSet={`${h.image}.webp`} type="image/webp" />
            <img src={`${h.image}.jpg`} alt="" fetchPriority="high" />
          </picture>
        </div>
        <p className="hero-word" data-parallax="0.12" aria-hidden="true">{club.name}</p>
        <div className="hero-stage hero-rider" data-parallax="0.3">
          <picture>
            <source srcSet={`${h.rider}.webp`} type="image/webp" />
            <img src={`${h.rider}.png`} alt="Rider charging through dust on a dirt bike" fetchPriority="high" />
          </picture>
        </div>
      </div>

      {/* Baaki slides: club ki asli photos, halka zoom ke saath */}
      {h.slides.map((s, i) => (
        <div key={s.image} className={`hero-slide hero-photo ${idx === i + 1 ? 'is-active' : ''}`} aria-hidden={idx !== i + 1}>
          <div className="hero-stage" data-parallax="0.3">
            <img src={s.image} alt={tr(s.caption)} style={{ objectPosition: s.position }} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        </div>
      ))}

      {/* Orange-teal grade aur text ke liye shade */}
      <div className="hero-grade" />
      <div className="hero-shade" />

      <div className="wrap hero-top">
        <NextRideCard />
      </div>

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="hero-club hero-in" style={{ '--d': '0.2s' }}>
            <span className="hero-club-mark" aria-hidden="true" />
            {h.eyebrow}
          </p>
          <h1 className="display hero-title">
            {h.title.map((line, i) => (
              <span key={i} className="line">
                <span className="line-inner" style={{ '--d': `${0.35 + i * 0.1}s` }}>{line}</span>
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-side hero-in" style={{ '--d': '0.8s' }}>
          <p className="hero-text">{tr(h.text)}</p>
          <div className="hero-actions">
            <a href="#join" className="btn btn-light">
              {u.joinClub} <Icon name="arrow" className="btn-icon" />
            </a>
            <a href="#routes" className="btn btn-teal">{u.viewRides}</a>
          </div>
        </div>
      </div>

      <div className="hero-dots hero-in" style={{ '--d': '1.1s' }}>
        <p className="hero-caption" aria-live="polite">
          <span>{pad(idx + 1)} / {pad(total)}</span> {tr(captions[idx])}
        </p>
        <div className="hero-bars" role="tablist" aria-label="Hero slides">
          {captions.map((c, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={idx === i}
              aria-label={tr(c)}
              className={idx === i ? 'is-active' : i < idx ? 'is-done' : ''}
              onClick={() => setIdx(i)}
            >
              <span style={{ animationDuration: `${SLIDE_MS}ms` }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const { tr } = useLang()
  return (
    <dl className="stats-row">
      {club.stats.map((s, i) => (
        <div key={s.value} data-reveal style={{ '--d': `${i * 0.08}s` }}>
          <dt>{tr(s.label)}</dt>
          <dd><CountUp value={s.value} /></dd>
        </div>
      ))}
    </dl>
  )
}

function Marquee() {
  const { u } = useLang()
  const places = [...new Set([...club.routes.map((r) => r.place), 'Mainpat', 'Sirpur', 'Bastar'])]
  const row = places.map((p) => (
    <span key={p} className="marquee-item">{p}<i aria-hidden="true">✦</i></span>
  ))
  return (
    <div className="marquee" aria-label={`${u.placesWe}: ${places.join(', ')}`}>
      <div className="marquee-track" aria-hidden="true">
        {row}{row}
      </div>
    </div>
  )
}

function About() {
  const { u, tr } = useLang()
  const a = club.about
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="about-copy">
          <p className="eyebrow" data-reveal>{u.about(club.name)}</p>
          <h2 className="display h2" data-reveal>{tr(a.title)}</h2>
          <p className="lead" data-reveal>{tr(a.text)}</p>
          <ul className="points">
            {a.points.map((p, i) => (
              <li key={p.icon} className="point" data-reveal style={{ '--d': `${i * 0.1}s` }}>
                <span className="point-icon"><Icon name={p.icon} /></span>
                <div>
                  <h3>{tr(p.title)}</h3>
                  <p>{tr(p.text)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="about-visual" data-reveal="zoom">
          <div className="about-frame">
            <Media image={a.image} scene="ghaat" seed={4} label="36RC helmet with ride stickers" parallax="0.12" />
          </div>
          <div className="about-badge">
            <strong><CountUp value={club.stats[2].value} /></strong>
            <span>km {u.together}</span>
          </div>
        </div>
      </div>
      <div className="wrap">
        <Stats />
      </div>
    </section>
  )
}

function Routes() {
  const { u, tr } = useLang()
  return (
    <section className="section section-sand" id="routes">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow" data-reveal>{u.upcoming}</p>
            <h2 className="display h2" data-reveal>{u.routesTitle}</h2>
          </div>
          <p className="section-note" data-reveal>{u.routesNote}</p>
        </div>
        <div className="routes">
          {club.routes.map((r, i) => (
            <article key={r.place} className="route-card" data-reveal style={{ '--d': `${i * 0.08}s` }}>
              <Media image={r.image} scene={r.scene} seed={i + 11} label={r.place} />
              <div className="route-shade" />
              <div className="route-top">
                <span className="route-date">{r.date}</span>
                <span className={`route-level level-${r.level.toLowerCase()}`}>{r.level}</span>
              </div>
              <div className="route-body">
                <h3>{r.place}</h3>
                <p className="route-path">{tr(r.route)}</p>
                <div className="route-meta">
                  <span>{r.km.toLocaleString('en-IN')} km</span>
                  <span>{r.days} {r.days > 1 ? u.daysWord : u.day}</span>
                </div>
                <a
                  className="route-link"
                  href={waLink(u.rideJoinMsg(club.name, r.place, r.date))}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${u.bookSeat}: ${r.place}`}
                >
                  {u.bookSeat} <Icon name="arrow" className="btn-icon" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journal() {
  const { u, tr } = useLang()
  return (
    <section className="section section-dark" id="journal">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow eyebrow-light" data-reveal>{u.journalEyebrow}</p>
            <h2 className="display h2" data-reveal>{u.journalTitle}</h2>
          </div>
          <a href={club.instagram} target="_blank" rel="noreferrer" className="link-arrow" data-reveal>
            {u.moreInsta}
          </a>
        </div>
        <div className="journal">
          {club.journal.map((j, i) => (
            <figure key={j.image + i} className={`journal-item j-${i}`} data-reveal="zoom" style={{ '--d': `${(i % 3) * 0.08}s` }}>
              <Media image={j.image} scene={j.scene} seed={i + 21} label={tr(j.title)} parallax="0.08" position={j.position} />
              <figcaption>
                <strong>{tr(j.title)}</strong>
                <span>{tr(j.meta)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Join() {
  const { u } = useLang()
  const [form, setForm] = useState({ name: '', bike: '', city: '' })
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    window.open(waLink(u.joinMsg(club.name, form)), '_blank', 'noopener')
  }

  return (
    <section className="join" id="join">
      <div className="join-media">
        <Media image={club.joinImage} scene="night" seed={5} label="36RC crew with their bikes" parallax="0.2" position="50% 40%" />
      </div>
      <div className="wrap join-grid">
        <div className="join-copy">
          <p className="eyebrow eyebrow-light" data-reveal>{u.member}</p>
          <h2 className="display h2" data-reveal>{u.joinTitle}</h2>
          <p data-reveal>{u.joinText}</p>
          <ul className="contact" data-reveal>
            <li><span>{u.phone}</span>{club.phone}</li>
            <li><span>{u.email}</span>{club.email}</li>
            <li>
              <span>{u.instagram}</span>
              <a href={club.instagram} target="_blank" rel="noreferrer">{club.instagramHandle}</a>
            </li>
            <li><span>{u.base}</span>{club.city}</li>
          </ul>
        </div>
        <form className="join-form" onSubmit={submit} data-reveal>
          <h3>{u.joinForm(club.fullName)}</h3>
          <div className="field">
            <input id="f-name" name="name" value={form.name} onChange={update} required placeholder=" " />
            <label htmlFor="f-name">{u.yourName}</label>
          </div>
          <div className="field">
            <input id="f-bike" name="bike" value={form.bike} onChange={update} required placeholder=" " />
            <label htmlFor="f-bike">{u.bike}</label>
          </div>
          <div className="field">
            <input id="f-city" name="city" value={form.city} onChange={update} required placeholder=" " />
            <label htmlFor="f-city">{u.city}</label>
          </div>
          <button type="submit" className="btn btn-accent btn-block">
            {u.sendWa} <Icon name="arrow" className="btn-icon" />
          </button>
        </form>
      </div>
    </section>
  )
}

function Faq() {
  const { u, tr } = useLang()
  return (
    <section className="section" id="faq">
      <div className="wrap faq-grid">
        <div>
          <p className="eyebrow" data-reveal>FAQ</p>
          <h2 className="display h2" data-reveal>{u.faqTitle}</h2>
        </div>
        <div className="faqs">
          {club.faqs.map((f, i) => (
            <details key={i} className="faq" data-reveal style={{ '--d': `${i * 0.06}s` }}>
              <summary>{tr(f.q)}</summary>
              <p>{tr(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { u } = useLang()
  return (
    <footer className="footer">
      <div className="footer-bg" data-parallax="0.15" aria-hidden="true">
        <picture>
          <source srcSet="/images/footer-forest.webp" type="image/webp" />
          <img src="/images/footer-forest.jpg" alt="" loading="lazy" />
        </picture>
      </div>
      <div className="footer-shade" aria-hidden="true" />
      <div className="wrap footer-grid">
        <p className="footer-tag">{u.footerTag}</p>
        <nav className="footer-links">
          <a href="#routes">{u.nav.routes}</a>
          <a href="#journal">{u.nav.journal}</a>
          <a href="#join">{u.join}</a>
          <a href={club.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </div>
      <div className="wrap">
        <p className="footer-word" aria-hidden="true">{club.name}</p>
      </div>
      <div className="wrap footer-bottom">
        <span>© {year} {club.fullName} · {club.city}</span>
        <span>{u.photos}</span>
      </div>
    </footer>
  )
}

function Site() {
  useSmoothScroll()
  useReveal()
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Routes />
        <Journal />
        <Join />
        <Faq />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  )
}
