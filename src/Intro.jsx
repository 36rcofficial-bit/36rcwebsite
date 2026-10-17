import { useEffect, useState } from 'react'
import { useLang } from './i18n.jsx'

// Minimal intro: orange line → 36RC logo mask reveal → tagline → parda upar.
// index.html me <html class="has-intro"> pehle hi lag jaata hai (reduced-motion pe nahi),
// isliye hero ki animation intro khatam hone tak ruki rehti hai.

const DURATION = 2600 // ms, parda uthne tak
const EXIT = 900 // ms

const preload = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = src
  })

function useCounter(active, ms) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - start) / ms)
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, ms])
  return n
}

export default function Intro() {
  const { u } = useLang()
  const [active] = useState(() => document.documentElement.classList.contains('has-intro'))
  const [phase, setPhase] = useState('run') // run → out → done
  const count = useCounter(active, DURATION - 300)

  useEffect(() => {
    if (!active) return
    let cancelled = false
    const heroReady = Promise.all(['/images/hero-bg.webp', '/images/hero-rider.webp'].map(preload))
    const minTime = new Promise((r) => setTimeout(r, DURATION))
    const maxTime = new Promise((r) => setTimeout(r, DURATION + 2500))
    Promise.race([Promise.all([heroReady, minTime]), maxTime]).then(() => {
      if (!cancelled) setPhase((p) => (p === 'run' ? 'out' : p))
    })
    return () => {
      cancelled = true
    }
  }, [active])

  // Parda uthte hi hero ki animation shuru, phir intro hat jaata hai
  useEffect(() => {
    if (phase !== 'out') return
    const a = setTimeout(() => document.documentElement.classList.remove('has-intro'), EXIT * 0.35)
    const b = setTimeout(() => setPhase('done'), EXIT)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [phase])

  if (!active || phase === 'done') return null

  return (
    <div className={`intro ${phase === 'out' ? 'is-out' : ''}`} role="presentation">
      <div className="intro-center">
        <picture className="intro-rider">
          <source srcSet="/images/intro-rider.webp" type="image/webp" />
          <img src="/images/intro-rider.png" alt="" />
        </picture>
        <div className="intro-logo">
          <picture>
            <source srcSet="/images/logo-light.webp" type="image/webp" />
            <img src="/images/logo-light.png" alt="36RC" />
          </picture>
        </div>
        <span className="intro-line" aria-hidden="true" />
        <p className="intro-tag">Never stop exploring</p>
      </div>

      <div className="intro-foot" aria-hidden="true">
        <span>Chhattisgarh Riding Club</span>
        <span className="intro-count">{String(count).padStart(3, '0')}</span>
      </div>
      <button type="button" className="intro-skip" onClick={() => setPhase('out')}>{u.tapSkip}</button>
    </div>
  )
}
