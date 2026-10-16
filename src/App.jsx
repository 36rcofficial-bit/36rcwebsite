import { useState } from 'react'
import { club } from './config.js'

const year = new Date().getFullYear()

const waLink =(text) =>
  `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(text)}`

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    ['#about', 'About'],
    ['#rides', 'Rides'],
    ['#why', 'Why us'],
    ['#faq', 'FAQ'],
  ]
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="logo">
          <span className="logo-mark">{club.name}</span>
        </a>
        <button
          className="menu-btn"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#join" className="btn btn-small" onClick={() => setOpen(false)}>
            Join the club
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-road" aria-hidden="true" />
      <div className="container hero-content">
        <p className="eyebrow">{club.fullName} · {club.city}</p>
        <h1>
          {club.tagline.split('. ').map((part, i, arr) => (
            <span key={i} className={i === arr.length - 1 ? 'accent' : ''}>
              {part}
              {i < arr.length - 1 ? '.' : ''}{' '}
            </span>
          ))}
        </h1>
        <p className="lead">{club.intro}</p>
        <div className="hero-actions">
          <a href="#join" className="btn">Join the club</a>
          <a href="#rides" className="btn btn-ghost">Upcoming rides</a>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="stats" id="about">
      <div className="container stats-grid">
        {club.stats.map((s) => (
          <div key={s.label} className="stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Rides() {
  return (
    <section className="section" id="rides">
      <div className="container">
        <p className="eyebrow">Calendar</p>
        <h2>Upcoming rides</h2>
        <div className="rides">
          {club.rides.map((r) => (
            <article key={r.title} className="ride">
              <div className="ride-date">{r.date}</div>
              <div className="ride-body">
                <h3>{r.title}</h3>
                <p className="ride-route">{r.route}</p>
                <div className="ride-meta">
                  <span>{r.distance}</span>
                  <span className={`level level-${r.level.toLowerCase()}`}>{r.level}</span>
                </div>
              </div>
              <a
                className="btn btn-ghost btn-small"
                href={waLink(`Hi ${club.name}! Mujhe "${r.title}" (${r.date}) ride join karni hai.`)}
                target="_blank"
                rel="noreferrer"
              >
                I'm in
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section className="section section-alt" id="why">
      <div className="container">
        <p className="eyebrow">Why ride with us</p>
        <h2>Sirf ride nahi, ek family</h2>
        <div className="features">
          {club.features.map((f) => (
            <div key={f.title} className="feature">
              <span className="feature-icon" aria-hidden="true">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
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
    <section className="section join" id="join">
      <div className="container join-grid">
        <div>
          <p className="eyebrow">Become a member</p>
          <h2>Ready to ride with {club.name}?</h2>
          <p className="lead">
            Form bharo aur WhatsApp pe message bhejo. Hamari team aapko group me add karegi
            aur agli ride ki details bhejegi.
          </p>
          <ul className="contact">
            <li>📞 <a href={`tel:${club.phone.replace(/\s/g, '')}`}>{club.phone}</a></li>
            <li>✉️ <a href={`mailto:${club.email}`}>{club.email}</a></li>
            <li>📸 <a href={club.instagram} target="_blank" rel="noreferrer">{club.instagramHandle}</a></li>
            <li>📍 {club.city}</li>
          </ul>
        </div>
        <form className="join-form" onSubmit={submit}>
          <label>
            Aapka naam
            <input name="name" value={form.name} onChange={update} required placeholder="Rahul Verma" />
          </label>
          <label>
            Bike
            <input name="bike" value={form.bike} onChange={update} required placeholder="Royal Enfield Himalayan" />
          </label>
          <label>
            City
            <input name="city" value={form.city} onChange={update} required placeholder="Raipur" />
          </label>
          <button type="submit" className="btn">Send on WhatsApp</button>
        </form>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="section section-alt" id="faq">
      <div className="container faq-wrap">
        <p className="eyebrow">FAQ</p>
        <h2>Aksar puche jaane wale sawaal</h2>
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
      <div className="container footer-inner">
        <span className="logo-mark">{club.name}</span>
        <span>© {year} {club.fullName}. Ride safe, always.</span>
        <a href={club.instagram} target="_blank" rel="noreferrer">Instagram</a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Rides />
        <Why />
        <Join />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
