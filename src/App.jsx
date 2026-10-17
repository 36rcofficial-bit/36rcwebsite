import { useEffect, useState } from 'react'
import { club } from './config.js'
import Scene from './Scene.jsx'

const year = new Date().getFullYear()

const waLink = (text) =>
  `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(text)}`

const pad = (n) => String(n).padStart(2, '0')

// Asli photo ho to photo, warna illustration
function Media({ image, scene, seed, withRoad, label, eager = false }) {
  if (image) {
    return <img className="media-img" src={image} alt={label} loading={eager ? 'eager' : 'lazy'} />
  }
  return <Scene scene={scene} seed={seed} withRoad={withRoad} />
}

const icons = {
  shield: <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z M9 12l2 2 4-4" />,
  route: <path d="M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM6 15V9a4 4 0 014-4h2M18 9v6a4 4 0 01-4 4h-2" />,
  people: <path d="M9 11a3 3 0 100-6 3 3 0 000 6zM17 11a2.5 2.5 0 100-5M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 14c2.8 0 5 2.2 5 5" />,
}

function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    ['#about', 'About'],
    ['#routes', 'Routes'],
    ['#journal', 'Journal'],
    ['#riders', 'Riders'],
    ['#faq', 'FAQ'],
  ]
  return (
    <header className={`header ${solid || open ? 'header-solid' : ''}`}>
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
        <a href="#join" className="btn btn-accent btn-sm header-cta">Join the club</a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
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
  const n = club.nextRide
  const t = useCountdown(n.start)
  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <Media image={h.image} scene="sunset" seed={3} withRoad label="36RC riders on a mountain road" eager />
      </div>
      <div className="hero-shade" />
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">{h.eyebrow}</p>
          <h1 className="display hero-title">
            {h.title.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h1>
          <p className="hero-text">{h.text}</p>
          <div className="hero-actions">
            <a href="#routes" className="btn btn-accent">Explore routes</a>
            <a href="#join" className="btn btn-glass">Join the club</a>
          </div>
        </div>

        <aside className="next-card" aria-label="Next ride">
          <p className="next-label">Next ride</p>
          <h2 className="next-title">{n.title}</h2>
          <p className="next-route">{n.route}</p>
          <div className="countdown">
            {[['days', 'Days'], ['hrs', 'Hrs'], ['mins', 'Min'], ['secs', 'Sec']].map(([k, l]) => (
              <div key={k}>
                <strong>{pad(t[k])}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <p className="next-meet">Meet: {n.meetPoint}</p>
          <a
            className="btn btn-dark btn-block"
            href={waLink(`Hi ${club.name}! ${n.title} ke liye mera naam add kar do.`)}
            target="_blank"
            rel="noreferrer"
          >
            Count me in
          </a>
        </aside>
      </div>

      <div className="wrap">
        <dl className="hero-stats">
          {club.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function About() {
  const a = club.about
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="about-copy">
          <p className="eyebrow">About {club.name}</p>
          <h2 className="display h2">{a.title}</h2>
          <p className="lead">{a.text}</p>
        </div>
        <ul className="points">
          {a.points.map((p) => (
            <li key={p.title} className="point">
              <span className="point-icon"><Icon name={p.icon} /></span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
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
            <p className="eyebrow">Upcoming rides</p>
            <h2 className="display h2">Routes this season</h2>
          </div>
          <p className="section-note">Har ride se pehle WhatsApp group me poora plan, fuel stops aur stay details aati hain.</p>
        </div>
        <div className="routes">
          {club.routes.map((r, i) => (
            <article key={r.place} className="route-card">
              <div className="route-media">
                <Media image={r.image} scene={r.scene} seed={i + 11} label={r.place} />
                <span className="route-date">{r.date}</span>
                <span className={`route-level level-${r.level.toLowerCase()}`}>{r.level}</span>
              </div>
              <div className="route-body">
                <h3>{r.place}</h3>
                <p className="route-path">{r.route}</p>
                <dl className="route-facts">
                  <div><dt>Distance</dt><dd>{r.km.toLocaleString('en-IN')} km</dd></div>
                  <div><dt>Duration</dt><dd>{r.days} {r.days > 1 ? 'days' : 'day'}</dd></div>
                </dl>
                <a
                  className="route-link"
                  href={waLink(`Hi ${club.name}! ${r.place} ride (${r.date}) join karni hai.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book my seat
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
            <p className="eyebrow eyebrow-light">Ride journal</p>
            <h2 className="display h2">Miles we've made</h2>
          </div>
          <a href={club.instagram} target="_blank" rel="noreferrer" className="link-arrow">
            More on Instagram
          </a>
        </div>
        <div className="journal">
          {club.journal.map((j, i) => (
            <figure key={j.title} className={`journal-item j-${i}`}>
              <Media image={j.image} scene={j.scene} seed={i + 21} label={j.title} />
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
          <p className="eyebrow">{club.season} season</p>
          <h2 className="display h2">Top riders</h2>
          <p className="lead">Season me sabse zyada km chalane wale riders. Har ride ke baad update hota hai.</p>
        </div>
        <ol className="riders">
          {club.riders.map((r, i) => (
            <li key={r.name} className="rider">
              <span className="rider-pos">{pad(i + 1)}</span>
              <div className="rider-info">
                <div className="rider-row">
                  <strong>{r.name}</strong>
                  <span className="rider-km">{r.km.toLocaleString('en-IN')} km</span>
                </div>
                <span className="rider-bike">{r.bike}</span>
                <span className="rider-track"><span style={{ width: `${(r.km / top) * 100}%` }} /></span>
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
        <Media image="/images/camping.jpg" scene="night" seed={5} label="Motorcycle camp in the hills" />
      </div>
      <div className="wrap join-grid">
        <div className="join-copy">
          <p className="eyebrow eyebrow-light">Become a member</p>
          <h2 className="display h2">Your next adventure starts here</h2>
          <p>Form bharo aur WhatsApp pe bhejo. Team aapko club group me add karegi aur agli ride ki details bhejegi. Joining free hai.</p>
          <ul className="contact">
            <li><span>Phone</span>{club.phone}</li>
            <li><span>Email</span>{club.email}</li>
            <li>
              <span>Instagram</span>
              <a href={club.instagram} target="_blank" rel="noreferrer">{club.instagramHandle}</a>
            </li>
            <li><span>Base</span>{club.city}</li>
          </ul>
        </div>
        <form className="join-form" onSubmit={submit}>
          <h3>Join {club.fullName}</h3>
          <label htmlFor="f-name">Aapka naam</label>
          <input id="f-name" name="name" value={form.name} onChange={update} required placeholder="Rahul Verma" />
          <label htmlFor="f-bike">Bike</label>
          <input id="f-bike" name="bike" value={form.bike} onChange={update} required placeholder="Royal Enfield Himalayan" />
          <label htmlFor="f-city">City</label>
          <input id="f-city" name="city" value={form.city} onChange={update} required placeholder="Raipur" />
          <button type="submit" className="btn btn-accent btn-block">Send on WhatsApp</button>
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
          <p className="eyebrow">FAQ</p>
          <h2 className="display h2">New to riding with us?</h2>
        </div>
        <div className="faqs">
          {club.faqs.map((f) => (
            <details key={f.q} className="faq">
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
      <div className="wrap footer-grid">
        <div>
          <span className="brand-mark">{club.name}</span>
          <p>{club.fullName} · {club.city}</p>
        </div>
        <nav className="footer-links">
          <a href="#routes">Routes</a>
          <a href="#journal">Journal</a>
          <a href="#join">Join</a>
          <a href={club.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </div>
      <div className="wrap footer-bottom">
        <span>© {year} {club.fullName}. Ride safe, always.</span>
        <span>Photos: Freepik</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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
