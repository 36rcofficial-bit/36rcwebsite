import { useEffect, useState } from 'react'
import { useLang } from './i18n.jsx'

// Website khulte hi chalne wala motocross intro.
// index.html me <html class="has-intro"> pehle hi lag jaata hai (reduced-motion pe nahi),
// isliye hero ki animation intro khatam hone tak ruki rehti hai.

const TAG = 'NEVER STOP EXPLORING'
const DURATION = 3500 // ms, wipe shuru hone tak
const WIPE = 900 // ms

const preload = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = src
  })

export default function Intro() {
  const { u } = useLang()
  const [active] = useState(() => document.documentElement.classList.contains('has-intro'))
  const [phase, setPhase] = useState('run') // run → wipe → done

  useEffect(() => {
    if (!active) return
    let wipeTimer, doneTimer
    const heroReady = Promise.all(['/images/hero-bg.webp', '/images/hero-rider.webp'].map(preload))
    const minTime = new Promise((r) => setTimeout(r, DURATION))
    const maxTime = new Promise((r) => setTimeout(r, DURATION + 2500))

    const finish = () => {
      setPhase('wipe')
      wipeTimer = setTimeout(() => {
        document.documentElement.classList.remove('has-intro')
        window.scrollTo(0, 0)
      }, WIPE * 0.45)
      doneTimer = setTimeout(() => setPhase('done'), WIPE)
    }

    let cancelled = false
    Promise.race([Promise.all([heroReady, minTime]), maxTime]).then(() => {
      if (!cancelled) finish()
    })
    return () => {
      cancelled = true
      clearTimeout(wipeTimer)
      clearTimeout(doneTimer)
    }
  }, [active])

  const skip = () => {
    if (phase !== 'run') return
    setPhase('wipe')
    setTimeout(() => document.documentElement.classList.remove('has-intro'), WIPE * 0.45)
    setTimeout(() => setPhase('done'), WIPE)
  }

  if (!active || phase === 'done') return null

  return (
    <div className={`intro ${phase === 'wipe' ? 'is-out' : 'is-run'}`} onClick={skip} role="presentation">
      <div className="intro-lines" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} style={{ '--y': `${6 + ((i * 37) % 88)}%`, '--l': `${18 + ((i * 53) % 40)}vw`, '--t': `${0.35 + ((i * 17) % 10) / 20}s`, '--dl': `${((i * 29) % 14) / 20}s` }} />
        ))}
      </div>

      <div className="intro-stage">
        <div className="intro-rider">
          <picture>
            <source srcSet="/images/intro-rider.webp" type="image/webp" />
            <img src="/images/intro-rider.png" alt="" />
          </picture>
          <div className="intro-dust" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => (
              <b key={i} style={{ '--dx': `${-60 - ((i * 47) % 180)}px`, '--dy': `${-10 - ((i * 31) % 90)}px`, '--s': `${4 + ((i * 7) % 9)}px`, '--dl': `${0.95 + ((i * 13) % 10) / 40}s` }} />
            ))}
          </div>
        </div>

        <div className="intro-word" aria-label="36RC">
          <picture className="intro-36">
            <source srcSet="/images/intro-36.webp" type="image/webp" />
            <img src="/images/intro-36.png" alt="" />
          </picture>
          <picture className="intro-rc">
            <source srcSet="/images/intro-rc.webp" type="image/webp" />
            <img src="/images/intro-rc.png" alt="" />
          </picture>
        </div>

        <p className="intro-tag" aria-label={TAG}>
          {TAG.split('').map((ch, i) => (
            <span key={i} aria-hidden="true" style={{ '--i': i }}>{ch === ' ' ? ' ' : ch}</span>
          ))}
        </p>
      </div>

      <div className="intro-bar" aria-hidden="true"><span /></div>
      <p className="intro-skip">{u.tapSkip}</p>
      <div className="intro-wipe" aria-hidden="true" />
    </div>
  )
}
