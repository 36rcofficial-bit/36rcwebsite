import { useEffect, useState } from 'react'
import { club } from './config.js'

const year = new Date().getFullYear()

const waLink = (text) =>
  `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(text)}`

const pad = (n) => String(n).padStart(2, '0')

// Photo ho to photo, warna road-stripe wala placeholder
function Media({ image, label, className = '' }) {
  return (
    <div
      className={`media ${image ? '' : 'media-empty'} ${className}`}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
      role={image ? 'img' : undefined}
      aria-label={image ? label : undefined}
    />
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ['#calendar', 'Calendar'],
    ['#stories', 'Stories'],
    ['#standings', 'Standings'],
  ]
  return (
    <header className="header">
      <div className="wrap header-inner">
        <a href="#top" className="brand" aria-label={`${club.fullName} home`}>
          <span className="brand-mark">{club.name}</span>
        </a>
        <nav className="header-links">
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="header-right">
          <a href="#join" className="btn btn-red btn-sm">Join</a>
          <button
            className="burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <nav className="drawer">
          <div className="wrap">
            {[...links, ['#join', 'Join the club'], ['#faq', 'FAQ']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

function QuickLinks() {
  return (
    <div className="wrap pills" id="top">
      {club.quickLinks.map(([href, label]) => (
        <a key={href} href={href} className="pill">{label}</a>
      ))}
    </div>
  )
}

function Featured() {
  const f = club.featured
  return (
    <section className="wrap featured" id="stories">
      <a href="#stories" className="feature-card">
        <Media image={f.image} label={f.title} />
        <div className="feature-overlay">
          <span className="tag">{f.tag}</span>
          <h1>{f.title}</h1>
        </div>
      </a>
      <div className="story-row">
        {club.stories.map((s, i) => (
          <a key={s.title} href="#stories" className="story-card">
            <Media image={s.image} label={s.title} className={`tint-${i % 4}`} />
            <span className="tag tag-plain">{s.tag}</span>
            <h3>{s.title}</h3>
          </a>
        ))}
      </div>
    </section>
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

function NextRide() {
  const r = club.nextRide
  const t = useCountdown(r.start)
  return (
    <section className="next" aria-labelledby="next-title">
      <div className="wrap next-grid">
        <div className="next-info">
          <p className="kicker">Round {pad(r.round)} · Next ride</p>
          <h2 id="next-title" className="display">{r.title}</h2>
          <p className="next-route">{r.route}</p>
          <p className="next-meet">Meet point: {r.meetPoint}</p>
          <div className="countdown" aria-label="Time left to flag off">
            {[['days', 'Days'], ['hrs', 'Hrs'], ['mins', 'Mins'], ['secs', 'Secs']].map(([k, l]) => (
              <div key={k} className="cd-cell">
                <strong>{pad(t[k])}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <a
            className="btn btn-red"
            href={waLink(`Hi ${club.name}! Round ${r.round} – ${r.title} ke liye mera naam add kar do.`)}
            target="_blank"
            rel="noreferrer"
          >
            Count me in
          </a>
        </div>
        <ol className="schedule">
          {r.schedule.map(([day, time, what]) => (
            <li key={time}>
              <span className="sch-day">{day}</span>
              <span className="sch-what">{what}</span>
              <span className="sch-time">{time}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Calendar() {
  return (
    <section className="section" id="calendar">
      <div className="wrap">
        <div className="section-head">
          <h2 className="display">{club.season} Ride calendar</h2>
          <a href="#join" className="link-arrow">Join a ride</a>
        </div>
        <div className="rounds">
          {club.calendar.map((c) => (
            <article key={c.round} className={`round ${c.status === 'done' ? 'round-done' : ''}`}>
              <div className="round-top">
                <span className="round-no">Round {c.round}</span>
                <span className={`round-status ${c.status}`}>
                  {c.status === 'done' ? 'Completed' : 'Upcoming'}
                </span>
              </div>
              <p className="round-dates">{c.dates}</p>
              <h3 className="round-place">{c.place}</h3>
              <p className="round-route">{c.route}</p>
              <p className="round-km">
                <strong>{c.km.toLocaleString('en-IN')}</strong> km
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section className="section section-dark" id="numbers">
      <div className="wrap">
        <div className="section-head">
          <h2 className="display">Club in numbers</h2>
        </div>
        <div className="stats">
          {club.stats.map((s) => (
            <div key={s.label} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Standings() {
  const leader = club.standings[0]?.km ?? 0
  return (
    <section className="section" id="standings">
      <div className="wrap">
        <div className="section-head">
          <h2 className="display">{club.season} Km standings</h2>
        </div>
        <div className="table-scroll">
          <table className="standings">
            <thead>
              <tr>
                <th scope="col">Pos</th>
                <th scope="col">Rider</th>
                <th scope="col" className="hide-sm">Bike</th>
                <th scope="col" className="num">Km</th>
                <th scope="col" className="num hide-sm">Gap</th>
              </tr>
            </thead>
            <tbody>
              {club.standings.map((r, i) => (
                <tr key={r.name}>
                  <td className="pos">{i + 1}</td>
                  <td>
                    <span className="rider">
                      <span className="rider-bar" style={{ background: r.color }} />
                      <span>
                        <strong>{r.name}</strong>
                        <small className="show-sm">{r.bike}</small>
                      </span>
                    </span>
                  </td>
                  <td className="hide-sm muted">{r.bike}</td>
                  <td className="num"><strong>{r.km.toLocaleString('en-IN')}</strong></td>
                  <td className="num hide-sm muted">
                    {i === 0 ? 'Leader' : `−${(leader - r.km).toLocaleString('en-IN')}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    <section className="join" id="join">
      <div className="wrap join-grid">
        <div>
          <p className="kicker kicker-light">Become a member</p>
          <h2 className="display">Get on the grid</h2>
          <p className="join-copy">
            Form bharo aur WhatsApp pe bhejo. Team aapko club group me add karegi aur agli
            ride ki details bhejegi. Joining free hai.
          </p>
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
          <label htmlFor="f-name">Aapka naam</label>
          <input id="f-name" name="name" value={form.name} onChange={update} required placeholder="Rahul Verma" />
          <label htmlFor="f-bike">Bike</label>
          <input id="f-bike" name="bike" value={form.bike} onChange={update} required placeholder="Royal Enfield Himalayan" />
          <label htmlFor="f-city">City</label>
          <input id="f-city" name="city" value={form.city} onChange={update} required placeholder="Raipur" />
          <button type="submit" className="btn btn-dark">Send on WhatsApp</button>
        </form>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap faq-wrap">
        <div className="section-head">
          <h2 className="display">New to {club.name}?</h2>
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
          <p className="muted">{club.fullName} · {club.city}</p>
        </div>
        <nav className="footer-links">
          <a href="#calendar">Calendar</a>
          <a href="#standings">Standings</a>
          <a href="#join">Join</a>
          <a href={club.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </div>
      <div className="wrap footer-bottom muted">
        © {year} {club.fullName}. Ride safe, always.
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <QuickLinks />
        <Featured />
        <NextRide />
        <Calendar />
        <Numbers />
        <Standings />
        <Join />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
