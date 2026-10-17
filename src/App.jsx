import { useEffect, useState } from 'react'
import { club } from './config.js'
import Scene from './Scene.jsx'
import { CountUp, useHeaderState, useReveal, useSmoothScroll } from './motion.jsx'

const year = new Date().getFullYear()

const waLink = (text) =>
  `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(text)}`

const pad = (n) => String(n).padStart(2, '0')

// Asli photo ho to photo, warna illustration. `parallax` diya to scroll pe halki movement.
function Media({ image, scene, seed, withRoad, label, eager = false, parallax }) {
  const props = parallax ? { 'data-parallax': parallax } : {}
  if (image) {
    return (
      <img
        className={`media-img ${parallax ? 'is-parallax' : ''}`}
        src={image}
        alt={label}
        loading={eager ? 'eager' : 'lazy'}
        {...props}
      />
    )
  }
  return <Scene scene={scene} seed={seed} withRoad={withRoad} />
}

const icons = {
  shield: <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z M9 12l2 2 4-4" />,
  route: <path d="M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM6 15V9a4 4 0 014-4h2M18 9v6a4 4 0 01-4 4h-2" />,
  people: <path d="M9 11a3 3 0 100-6 3 3 0 000 6zM17 11a2.5 2.5 0 100-5M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 14c2.8 0 5 2.2 5 5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
}

function Icon({ name, className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function Header() {
  const { solid, hidden } = useHeaderState()
  const [open, setOpen] = useState(false)
  const links = [
    ['#about', 'About'],
    ['#routes', 'Routes'],
    ['#journal', 'Journal'],
    ['#riders', 'Riders'],
    ['#faq', 'FAQ'],
  ]
  const cls = ['header', solid || open ? 'header-solid' : '', hidden && !open ? 'header-hidden' : '']
  return (
    <header className={cls.join(' ')}>
      <div className="wrap header-inner">
        <a href="#top" className="brand" aria-label={`${club.fullName} home`}>
          <span className="brand-mark">{club.name}</span>
          <span className="brand-sub">Riders Club</span>
        </a>
        <nav className="header-links">
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a href="#join" className="btn btn-light btn-sm header-cta">Join the club</a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
      {open && (
        <nav className="drawer wrap">
          {[...links, ['#join', 'Join the club']].map(([href, label]) => (
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

function Hero() {
  const h = club.hero
  return (
    <section className="hero" id="top">
      {/* Layer 1: photo */}
      <div className="hero-stage hero-bg" data-parallax="0.3">
        <picture>
          <source srcSet={`${h.image}.webp`} type="image/webp" />
          <img src={`${h.image}.jpg`} alt="" fetchPriority="high" />
        </picture>
      </div>
      {/* Layer 2: bada naam, rider ke peeche */}
      <p className="hero-word" data-parallax="0.12" aria-hidden="true">{club.name}</p>
      {/* Layer 3: wahi rider, kata hua, naam ke aage */}
      <div className="hero-stage hero-rider" data-parallax="0.3">
        <picture>
          <source srcSet={`${h.rider}.webp`} type="image/webp" />
          <img src={`${h.rider}.png`} alt="Rider charging through dust on a dirt bike" fetchPriority="high" />
        </picture>
      </div>
      {/* Layer 4: orange-teal grade aur text ke liye shade */}
      <div className="hero-grade" />
      <div className="hero-shade" />

      <div className="wrap hero-inner">
        <h1 className="display hero-title">
          {h.title.map((line, i) => (
            <span key={i} className="line">
              <span className="line-inner" style={{ '--d': `${0.35 + i * 0.1}s` }}>{line}</span>
            </span>
          ))}
        </h1>
        <div className="hero-side hero-in" style={{ '--d': '0.8s' }}>
          <p className="hero-text">{h.text}</p>
          <div className="hero-actions">
            <a href="#join" className="btn btn-light">
              Join the club <Icon name="arrow" className="btn-icon" />
            </a>
            <a href="#routes" className="btn btn-teal">View rides</a>
          </div>
        </div>
      </div>

      <a href="#next" className="scroll-cue hero-in" style={{ '--d': '1.1s' }} aria-label="Scroll down">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  )
}

function NextRide() {
  const n = club.nextRide
  const t = useCountdown(n.start)
  return (
    <section className="next" id="next" aria-labelledby="next-title">
      <div className="wrap next-inner">
        <div className="next-info" data-reveal>
          <div className="next-head">
            <span className="pulse" aria-hidden="true" />
            <p className="next-label">Next ride</p>
          </div>
          <h2 id="next-title" className="next-title">{n.title}</h2>
          <p className="next-route">{n.route} · Meet {n.meetPoint}</p>
        </div>
        <div className="countdown" data-reveal style={{ '--d': '0.1s' }} aria-label="Time left to flag off">
          {[['days', 'Days'], ['hrs', 'Hours'], ['mins', 'Min'], ['secs', 'Sec']].map(([k, l]) => (
            <div key={k}>
              <strong>{pad(t[k])}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <a
          className="btn btn-accent"
          data-reveal
          style={{ '--d': '0.2s' }}
          href={waLink(`Hi ${club.name}! ${n.title} ke liye mera naam add kar do.`)}
          target="_blank"
          rel="noreferrer"
        >
          Count me in <Icon name="arrow" className="btn-icon" />
        </a>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <dl className="stats-row">
      {club.stats.map((s, i) => (
        <div key={s.label} data-reveal style={{ '--d': `${i * 0.08}s` }}>
          <dt>{s.label}</dt>
          <dd><CountUp value={s.value} /></dd>
        </div>
      ))}
    </dl>
  )
}

function Marquee() {
  const places = [...new Set([...club.routes.map((r) => r.place), 'Mainpat', 'Sirpur', 'Bastar'])]
  const row = places.map((p) => (
    <span key={p} className="marquee-item">{p}<i aria-hidden="true">✦</i></span>
  ))
  return (
    <div className="marquee" aria-label={`Places we ride: ${places.join(', ')}`}>
      <div className="marquee-track" aria-hidden="true">
        {row}{row}
      </div>
    </div>
  )
}

function About() {
  const a = club.about
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="about-copy">
          <p className="eyebrow" data-reveal>About {club.name}</p>
          <h2 className="display h2" data-reveal>{a.title}</h2>
          <p className="lead" data-reveal>{a.text}</p>
          <ul className="points">
            {a.points.map((p, i) => (
              <li key={p.title} className="point" data-reveal style={{ '--d': `${i * 0.1}s` }}>
                <span className="point-icon"><Icon name={p.icon} /></span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="about-visual" data-reveal="zoom">
          <div className="about-frame">
            <Media image={club.about.image} scene="ghaat" seed={4} label="Rider on a ghaat road" parallax="0.12" />
          </div>
          <div className="about-badge">
            <strong><CountUp value={club.stats[2].value} /></strong>
            <span>{club.stats[2].label} together</span>
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
  return (
    <section className="section section-sand" id="routes">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow" data-reveal>Upcoming rides</p>
            <h2 className="display h2" data-reveal>Routes this season</h2>
          </div>
          <p className="section-note" data-reveal>Har ride se pehle WhatsApp group me poora plan, fuel stops aur stay details aati hain.</p>
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
                <p className="route-path">{r.route}</p>
                <div className="route-meta">
                  <span>{r.km.toLocaleString('en-IN')} km</span>
                  <span>{r.days} {r.days > 1 ? 'days' : 'day'}</span>
                </div>
                <a
                  className="route-link"
                  href={waLink(`Hi ${club.name}! ${r.place} ride (${r.date}) join karni hai.`)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Book a seat for ${r.place}`}
                >
                  Book my seat <Icon name="arrow" className="btn-icon" />
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
  return (
    <section className="section section-dark" id="journal">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow eyebrow-light" data-reveal>Ride journal</p>
            <h2 className="display h2" data-reveal>Miles we've made</h2>
          </div>
          <a href={club.instagram} target="_blank" rel="noreferrer" className="link-arrow" data-reveal>
            More on Instagram
          </a>
        </div>
        <div className="journal">
          {club.journal.map((j, i) => (
            <figure key={j.title} className={`journal-item j-${i}`} data-reveal="zoom" style={{ '--d': `${(i % 3) * 0.08}s` }}>
              <Media image={j.image} scene={j.scene} seed={i + 21} label={j.title} parallax="0.08" />
              <figcaption>
                <strong>{j.title}</strong>
                <span>{j.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Riders() {
  const top = club.riders[0]?.km ?? 1
  return (
    <section className="section" id="riders">
      <div className="wrap riders-grid">
        <div>
          <p className="eyebrow" data-reveal>{club.season} season</p>
          <h2 className="display h2" data-reveal>Top riders</h2>
          <p className="lead" data-reveal>Season me sabse zyada km chalane wale riders. Har ride ke baad update hota hai.</p>
        </div>
        <ol className="riders">
          {club.riders.map((r, i) => (
            <li key={r.name} className="rider" data-reveal style={{ '--d': `${i * 0.07}s`, '--w': `${(r.km / top) * 100}%` }}>
              <span className="rider-pos">{pad(i + 1)}</span>
              <div className="rider-info">
                <div className="rider-row">
                  <strong>{r.name}</strong>
                  <span className="rider-km">{r.km.toLocaleString('en-IN')} km</span>
                </div>
                <span className="rider-bike">{r.bike}</span>
                <span className="rider-track"><span /></span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Join() {
  const [form, setForm] = useState({ name: '', bike: '', city: '' })
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const msg =
      `Hi ${club.name}! Mujhe club join karna hai.\n` +
      `Naam: ${form.name}\nBike: ${form.bike}\nCity: ${form.city}`
    window.open(waLink(msg), '_blank', 'noopener')
  }

  return (
    <section className="join" id="join">
      <div className="join-media">
        <Media image={club.joinImage} scene="night" seed={5} label="Motorcycle camp in the hills" parallax="0.2" />
      </div>
      <div className="wrap join-grid">
        <div className="join-copy">
          <p className="eyebrow eyebrow-light" data-reveal>Become a member</p>
          <h2 className="display h2" data-reveal>Your next adventure starts here</h2>
          <p data-reveal>Form bharo aur WhatsApp pe bhejo. Team aapko club group me add karegi aur agli ride ki details bhejegi. Joining free hai.</p>
          <ul className="contact" data-reveal>
            <li><span>Phone</span>{club.phone}</li>
            <li><span>Email</span>{club.email}</li>
            <li>
              <span>Instagram</span>
              <a href={club.instagram} target="_blank" rel="noreferrer">{club.instagramHandle}</a>
            </li>
            <li><span>Base</span>{club.city}</li>
          </ul>
        </div>
        <form className="join-form" onSubmit={submit} data-reveal>
          <h3>Join {club.fullName}</h3>
          <div className="field">
            <input id="f-name" name="name" value={form.name} onChange={update} required placeholder=" " />
            <label htmlFor="f-name">Aapka naam</label>
          </div>
          <div className="field">
            <input id="f-bike" name="bike" value={form.bike} onChange={update} required placeholder=" " />
            <label htmlFor="f-bike">Bike</label>
          </div>
          <div className="field">
            <input id="f-city" name="city" value={form.city} onChange={update} required placeholder=" " />
            <label htmlFor="f-city">City</label>
          </div>
          <button type="submit" className="btn btn-accent btn-block">
            Send on WhatsApp <Icon name="arrow" className="btn-icon" />
          </button>
        </form>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap faq-grid">
        <div>
          <p className="eyebrow" data-reveal>FAQ</p>
          <h2 className="display h2" data-reveal>New to riding with us?</h2>
        </div>
        <div className="faqs">
          {club.faqs.map((f, i) => (
            <details key={f.q} className="faq" data-reveal style={{ '--d': `${i * 0.06}s` }}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
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
        <p className="footer-tag">Ride safe. Ride together. Ride far.</p>
        <nav className="footer-links">
          <a href="#routes">Routes</a>
          <a href="#journal">Journal</a>
          <a href="#join">Join</a>
          <a href={club.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </div>
      <div className="wrap">
        <p className="footer-word" aria-hidden="true">{club.name}</p>
      </div>
      <div className="wrap footer-bottom">
        <span>© {year} {club.fullName} · {club.city}</span>
        <span>Photos: Freepik</span>
      </div>
    </footer>
  )
}

export default function App() {
  useSmoothScroll()
  useReveal()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NextRide />
        <Marquee />
        <About />
        <Routes />
        <Journal />
        <Riders />
        <Join />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
