import { useCallback, useEffect, useState } from 'react'
import { club } from './config.js'
import { useLang } from './i18n.jsx'

// Riders Meet page (/riders-meet). Text yahin hai, photos config.meet me.
const T = {
  en: {
    eyebrow: 'Chhattisgarh Riders Meet',
    title: 'Riders Meet',
    lead: 'One weekend when riders from across Chhattisgarh park their bikes in one place: dirt-track challenges, new friends and a night on stage.',
    aboutH: 'What is CGRM?',
    about: [
      'The Chhattisgarh Riders Meet (CGRM) brings riding clubs and solo riders from across the state together for a weekend of riding, skills and community.',
      '36RC rode, raced and volunteered at CGRM 2024, and our crew will be there again at the next edition.',
    ],
    whatH: 'What happens at the meet',
    what: [
      ['Dirt-track challenges', 'Slow races, off-road loops and skill events on a marked track, with marshals and safety gear.'],
      ['Rider community', 'Clubs, solo riders and families from across the state, swapping routes, stories and bike tips.'],
      ['Night on stage', 'Live music, club introductions and awards once the dust settles.'],
      ['Bikes on display', 'From daily commuters to adventure tourers, every bike gets a spot in the paddock.'],
    ],
    galleryH: 'CGRM 2024 in photos',
    nextH: 'Next edition',
    next: 'Dates for the next Riders Meet will be announced on our WhatsApp group and Instagram. Message us to get the update first.',
    notify: 'Notify me on WhatsApp',
    notifyMsg: (c) => `Hi ${c}! Please let me know when the next Chhattisgarh Riders Meet is announced.`,
    back: 'Back to home',
  },
  hi: {
    eyebrow: 'Chhattisgarh Riders Meet',
    title: 'Riders Meet',
    lead: 'Ek weekend jab poore Chhattisgarh ke riders ek jagah milte hain: dirt-track challenges, naye dost aur stage pe ek yaadgaar raat.',
    aboutH: 'CGRM kya hai?',
    about: [
      'Chhattisgarh Riders Meet (CGRM) me poore state ke riding clubs aur solo riders ek weekend ke liye milte hain: riding, skills aur community.',
      '36RC ne CGRM 2024 me ride kiya, race kiya aur volunteer kiya, aur agle meet me bhi hamari crew wahan hogi.',
    ],
    whatH: 'Meet me kya hota hai',
    what: [
      ['Dirt-track challenges', 'Slow race, off-road loops aur skill events, marked track pe, marshals aur safety gear ke saath.'],
      ['Rider community', 'Poore state ke clubs, solo riders aur families: routes, kisse aur bike tips share karte hue.'],
      ['Stage pe raat', 'Live music, club introductions aur awards, dhool baithne ke baad.'],
      ['Bikes ka display', 'Daily commuter se adventure tourer tak, har bike ko paddock me jagah.'],
    ],
    galleryH: 'CGRM 2024 ki photos',
    nextH: 'Agla meet',
    next: 'Agle Riders Meet ki dates WhatsApp group aur Instagram pe announce hongi. Sabse pehle update ke liye hume message karo.',
    notify: 'WhatsApp pe update chahiye',
    notifyMsg: (c) => `Hi ${c}! Agle Chhattisgarh Riders Meet ki dates aate hi mujhe bata dena.`,
    back: 'Home pe wapas',
  },
}

export default function MeetPage() {
  const { lang, u } = useLang()
  const t = T[lang] || T.en
  const photos = club.meet.photos
  const [open, setOpen] = useState(-1)
  const count = photos.length
  const step = useCallback((d) => setOpen((i) => (i + d + count) % count), [count])

  useEffect(() => {
    document.title = `${t.title} – 36RC`
    return () => {
      document.title = '36RC – Chhattisgarh Riding Club'
    }
  }, [t.title])

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

  const wa = `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(t.notifyMsg(club.name))}`

  return (
    <main className="meet">
      <header className="rdetail-hero meet-hero">
        <img src={club.meet.hero} alt="" className="rdetail-bg" data-parallax="0.2" />
        <div className="rdetail-shade" />
        <div className="wrap rdetail-hero-inner">
          <a href="/" className="gpage-back">← {t.back}</a>
          <p className="eyebrow eyebrow-light">{t.eyebrow}</p>
          <h1 className="display rdetail-title">{t.title}</h1>
          <p className="rdetail-route meet-lead">{t.lead}</p>
          <a href={wa} target="_blank" rel="noreferrer" className="btn btn-accent meet-cta">{t.notify} →</a>
        </div>
      </header>

      <section className="wrap meet-about">
        <h2 className="display h2" data-reveal>{t.aboutH}</h2>
        <div className="meet-about-text" data-reveal>
          {t.about.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className="section-sand meet-what">
        <div className="wrap">
          <h2 className="display h2" data-reveal>{t.whatH}</h2>
          <div className="meet-grid">
            {t.what.map(([h, p], i) => (
              <div key={h} className="meet-item" data-reveal style={{ '--d': `${i * 0.08}s` }}>
                <span className="meet-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap meet-gallery">
        <div className="section-head">
          <h2 className="display h2" data-reveal>{t.galleryH}</h2>
          <a href="/gallery" className="link-arrow" data-reveal>{u.viewGallery}</a>
        </div>
        <div className="meet-photos">
          {photos.map((src, i) => (
            <button key={src} className={`rgallery-item m-${i}`} onClick={() => setOpen(i)} aria-label={`CGRM 2024 ${i + 1}`} data-reveal="zoom" style={{ '--d': `${(i % 3) * 0.06}s` }}>
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      <section className="meet-next">
        <div className="wrap meet-next-inner" data-reveal>
          <div>
            <p className="eyebrow eyebrow-light">{t.eyebrow}</p>
            <h2 className="display h2">{t.nextH}</h2>
            <p>{t.next}</p>
          </div>
          <a href={wa} target="_blank" rel="noreferrer" className="btn btn-accent">{t.notify} →</a>
        </div>
      </section>

      {photos[open] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="CGRM 2024" onClick={() => setOpen(-1)}>
          <button className="lb-close" aria-label={u.close} onClick={() => setOpen(-1)}>×</button>
          <button className="lb-nav lb-prev" aria-label={u.prev} onClick={(e) => { e.stopPropagation(); step(-1) }}>←</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img key={photos[open]} src={photos[open]} alt={`CGRM 2024 ${open + 1}`} />
            <figcaption><span>{String(open + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>CGRM 2024</figcaption>
          </figure>
          <button className="lb-nav lb-next" aria-label={u.next} onClick={(e) => { e.stopPropagation(); step(1) }}>→</button>
        </div>
      )}
    </main>
  )
}
