import { useEffect, useId, useRef, useState } from 'react'
import { club } from './config.js'
import { useLang } from './i18n.jsx'
import { slugOf } from './rides.js'

export const BIKE_BRANDS = [
  'Royal Enfield', 'KTM', 'Bajaj', 'TVS', 'Hero', 'Honda', 'Yamaha', 'Suzuki',
  'Triumph', 'Harley-Davidson', 'Kawasaki', 'BMW', 'Jawa / Yezdi', 'Benelli', 'Husqvarna',
]

const EMPTY = { name: '', phone: '', city: '', gender: '', brand: '', model: '', website: '' }

const waLink = (text) => `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(text)}`

// Join form: Join section aur side drawer dono me yahi use hota hai
export function JoinForm({ variant = 'card', autoFocus = false }) {
  const { u, lang } = useLang()
  const id = useId()
  const first = useRef(null)
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  useEffect(() => {
    if (autoFocus) setTimeout(() => first.current?.focus({ preventScroll: true }), 350)
  }, [autoFocus])

  const submit = (e) => {
    e.preventDefault()
    // Sheet me entry (jawab ka intezaar nahi; text/plain taaki browser CORS preflight na kare)
    if (club.sheetUrl) {
      fetch(club.sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...form, lang, source: variant === 'drawer' ? 'website-drawer' : 'website-join' }),
      }).catch(() => {})
    }
    // WhatsApp isi click me kholna zaroori hai, warna popup block ho jaata hai
    window.open(waLink(u.joinMsg(club.name, form)), '_blank', 'noopener')
    setSent(true)
  }

  const f = (name) => `${id}-${name}`

  return (
    <form className={`join-form join-form-${variant}`} onSubmit={submit}>
      {variant === 'card' && <h3>{u.joinForm(club.fullName)}</h3>}
      <div className="field">
        <input ref={first} id={f('name')} name="name" autoComplete="name" value={form.name} onChange={update} required placeholder=" " />
        <label htmlFor={f('name')}>{u.yourName}</label>
      </div>
      <div className="field">
        <input id={f('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+ ]{10,15}" value={form.phone} onChange={update} required placeholder=" " />
        <label htmlFor={f('phone')}>{u.yourPhone}</label>
      </div>
      <div className="field-row">
        <div className="field">
          <input id={f('city')} name="city" autoComplete="address-level2" value={form.city} onChange={update} required placeholder=" " />
          <label htmlFor={f('city')}>{u.city}</label>
        </div>
        <div className="field field-select">
          <select id={f('gender')} name="gender" value={form.gender} onChange={update} required>
            <option value="" disabled>{u.choose}</option>
            {u.genders.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <label htmlFor={f('gender')}>{u.gender}</label>
        </div>
      </div>
      <div className="field-row">
        <div className="field field-select">
          <select id={f('brand')} name="brand" value={form.brand} onChange={update} required>
            <option value="" disabled>{u.choose}</option>
            {BIKE_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            <option value={u.otherBrand}>{u.otherBrand}</option>
          </select>
          <label htmlFor={f('brand')}>{u.bikeBrand}</label>
        </div>
        <div className="field">
          <input id={f('model')} name="model" value={form.model} onChange={update} required placeholder=" " />
          <label htmlFor={f('model')}>{u.bikeModel}</label>
        </div>
      </div>
      {/* Bots ke liye chhupa field; insaan ise nahi dekhte */}
      <input className="hp" name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="btn btn-accent btn-block">
        {u.sendWa}
        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
      {sent && <p className="join-sent" role="status">{u.joinSent}</p>}
    </form>
  )
}

// "Club join karo" buttons ye event bhejte hain, drawer sunta hai
export const openJoin = (e) => {
  e?.preventDefault()
  window.dispatchEvent(new Event('open-join'))
}

export function JoinDrawer() {
  const { u } = useLang()
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState(0)
  const panel = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    const onOpen = () => {
      lastFocus.current = document.activeElement
      setSession((s) => s + 1)
      setOpen(true)
    }
    window.addEventListener('open-join', onOpen)
    return () => window.removeEventListener('open-join', onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      // Focus drawer ke andar hi rahe
      if (e.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll('button, input, select, a[href]')
        const list = Array.from(items).filter((el) => !el.classList.contains('hp'))
        const firstEl = list[0]
        const lastEl = list[list.length - 1]
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus() }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    window.__lenis?.stop()
    document.documentElement.classList.add('drawer-open')
    return () => {
      window.removeEventListener('keydown', onKey)
      window.__lenis?.start()
      document.documentElement.classList.remove('drawer-open')
      lastFocus.current?.focus?.({ preventScroll: true })
    }
  }, [open])

  return (
    <div className={`jdrawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="jdrawer-scrim" onClick={() => setOpen(false)} />
      <aside ref={panel} className="jdrawer-panel" role="dialog" aria-modal="true" aria-labelledby="jdrawer-title" data-lenis-prevent>
        <div className="jdrawer-head">
          <div>
            <p className="eyebrow">{u.member}</p>
            <h2 id="jdrawer-title" className="display jdrawer-title">{u.joinForm(club.name)}</h2>
          </div>
          <button type="button" className="jdrawer-close" onClick={() => setOpen(false)} aria-label={u.close}>×</button>
        </div>
        <p className="jdrawer-text">{u.joinText}</p>
        {session > 0 && <JoinForm key={session} variant="drawer" autoFocus={open} />}
        <ul className="jdrawer-perks">
          {u.joinPerks.map((p) => <li key={p}>{p}</li>)}
        </ul>
        {club.routes[0] && (
          <a href={`/rides/${slugOf(club.routes[0])}`} className="jdrawer-ride" onClick={() => setOpen(false)}>
            <img src={club.routes[0].image} alt="" loading="lazy" />
            <span>
              <small>{u.nextRideShort} · {club.routes[0].date}</small>
              <b>{club.routes[0].place}</b>
              <em>{club.routes[0].km} km · {club.routes[0].days} {club.routes[0].days > 1 ? u.daysWord : u.day}</em>
            </span>
            <i aria-hidden="true">→</i>
          </a>
        )}
        <div className="jdrawer-foot">
          <a href={`https://wa.me/${club.whatsapp}`} target="_blank" rel="noreferrer" className="link-arrow">{u.waDirect}</a>
          <span>{club.phone} · {club.email}</span>
        </div>
      </aside>
    </div>
  )
}
