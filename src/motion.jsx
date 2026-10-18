import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Smooth scroll + [data-parallax] elements ko scroll ke saath move karna
export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis // router isse page badalne pe scroll karta hai
    let raf = 0

    const items = () => document.querySelectorAll('[data-parallax]')
    const update = () => {
      const vh = window.innerHeight
      items().forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.15
        const box = el.parentElement.getBoundingClientRect()
        if (box.bottom < -200 || box.top > vh + 200) return
        // Photo ki extra jagah se zyada mat khisakao, warna kinare pe khaali patti dikhti hai
        const extra = Math.max(0, (el.offsetHeight * 1.15 - box.height) / 2)
        const raw = (box.top + box.height / 2 - vh / 2) * -speed
        const offset = Math.max(-extra, Math.min(extra, raw))
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.15)`
      })
    }

    const loop = (time) => {
      lenis.raf(time)
      update()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Anchor links ko bhi smooth scroll
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const target = document.querySelector(a.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -70 })
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      if (window.__lenis === lenis) delete window.__lenis
      lenis.destroy()
    }
  }, [])
}

// [data-reveal] elements viewport me aate hi `is-in` class paate hain. `key` badle (page badle) to dobara.
export function useReveal(key) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-in)')
    if (reduced() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    document.documentElement.classList.add('motion')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}

// Mobile pe cards ka stack: peeche wala card agle card ke aane pe thoda chhota aur dark hota hai.
// Sticky positioning CSS me hai (.routes media query); ye sirf scale/brightness set karta hai.
export function useCardStack(selector, query = '(max-width: 560px)') {
  useEffect(() => {
    const mq = window.matchMedia(query)
    let raf = 0
    const cards = () => Array.from(document.querySelectorAll(selector))

    const reset = () => cards().forEach((c) => { c.style.transform = ''; c.style.filter = '' })
    const update = () => {
      raf = 0
      if (!mq.matches) return
      const list = cards()
      list.forEach((card, i) => {
        const next = list[i + 1]
        if (!next) { card.style.transform = ''; card.style.filter = ''; return }
        const top = parseFloat(getComputedStyle(card).top) || 0
        const h = card.offsetHeight
        const p = Math.min(1, Math.max(0, (top + h - next.getBoundingClientRect().top) / h))
        card.style.transform = `scale(${(1 - 0.07 * p).toFixed(4)})`
        card.style.filter = p > 0 ? `brightness(${(1 - 0.45 * p).toFixed(3)})` : ''
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    const onChange = () => (mq.matches ? update() : reset())

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    mq.addEventListener('change', onChange)
    update()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mq.removeEventListener('change', onChange)
      reset()
    }
  }, [selector, query])
}

// "50,000+" jaisa number dikhte hi 0 se count-up
export function CountUp({ value }) {
  const ref = useRef(null)
  const match = String(value).match(/^([\d,]+)(.*)$/)
  const target = match ? Number(match[1].replace(/,/g, '')) : 0
  const suffix = match ? match[2] : ''
  const [n, setN] = useState(target)

  useEffect(() => {
    if (!match || reduced() || !('IntersectionObserver' in window)) return
    const el = ref.current
    let raf = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1600)
        const eased = 1 - Math.pow(1 - p, 4)
        setN(Math.round(target * eased))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      setN(0)
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  if (!match) return <span>{value}</span>
  return (
    <span ref={ref}>
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

// Neeche scroll pe header chhupao, upar scroll pe dikhao
export function useHeaderState() {
  const [state, setState] = useState({ solid: false, hidden: false })
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setState({ solid: y > 40, hidden: y > 400 && y > last })
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return state
}
