import { useEffect, useState } from 'react'

// Chhota sa router: "/" aur "/gallery". Same-site <a href="/..."> links bina reload ke khulte hain.

const scrollToHash = (hash) => {
  if (!hash) {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    return
  }
  const el = document.querySelector(hash)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function navigate(to) {
  const url = new URL(to, window.location.origin)
  const samePage = url.pathname === window.location.pathname
  if (!samePage || url.hash !== window.location.hash) window.history.pushState({}, '', url.pathname + url.hash)
  window.dispatchEvent(new Event('routechange'))
  // Naya page render hone do, phir scroll
  requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(url.hash)))
}

export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const sync = () => setPath(window.location.pathname)
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a[href^="/"]')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      e.preventDefault()
      navigate(a.getAttribute('href'))
    }
    window.addEventListener('routechange', sync)
    window.addEventListener('popstate', sync)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('routechange', sync)
      window.removeEventListener('popstate', sync)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return path.replace(/\/+$/, '') || '/'
}
