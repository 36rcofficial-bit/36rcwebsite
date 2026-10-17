// Code se bane landscape illustrations. Asli photo ho to Media component photo dikhata hai.

const palettes = {
  sunset: { sky: ['#f7c27d', '#e5672f'], sun: '#fff0c9', ridges: ['#cf6a45', '#9c4532', '#5b2a22', '#24160f'] },
  dawn: { sky: ['#fbe2c3', '#a9bfcc'], sun: '#fff6e3', ridges: ['#9aadb2', '#6c8087', '#435459', '#1e2b2e'] },
  forest: { sky: ['#dfe8cf', '#8aa585'], sun: '#fbf8df', ridges: ['#7b9772', '#55714f', '#344d35', '#16251a'] },
  waterfall: { sky: ['#cfe2e3', '#6a95a0'], sun: '#f6fbfb', ridges: ['#6b929b', '#46707b', '#2a4a54', '#11242b'] },
  ghaat: { sky: ['#f5cf98', '#cc7d4d'], sun: '#fff1d4', ridges: ['#b27354', '#82513d', '#50322a', '#221713'] },
  night: { sky: ['#26304f', '#0b1022'], sun: '#efe7cf', ridges: ['#323d61', '#232c4a', '#161c31', '#0a0d18'] },
}

// Har baar same shape bane, isliye seeded random
function rng(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const W = 1600
const H = 900

function ridge(rand, base, amp, step) {
  const pts = []
  for (let x = -100; x <= W + 100; x += step) {
    pts.push([x, base - rand() * amp])
  }
  return pts
}

const toPath = (pts) =>
  `M${pts.map(([x, y]) => `${x.toFixed(0)},${y.toFixed(0)}`).join(' L')} L${W + 100},${H} L-100,${H} Z`

function road() {
  // Perspective road: niche chaudi, horizon pe patli
  const left = []
  const right = []
  const dashes = []
  const steps = 40
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const y = H - t * 330
    const cx = 800 + Math.sin(t * 5.2) * 170 * (1 - t) + t * 60
    const w = 340 * (1 - t) ** 1.6 + 4
    left.push([cx - w, y])
    right.push([cx + w, y])
    if (i % 3 === 0 && i < steps - 3) {
      const t2 = (i + 1.4) / steps
      const y2 = H - t2 * 330
      const cx2 = 800 + Math.sin(t2 * 5.2) * 170 * (1 - t2) + t2 * 60
      const dw = 6 * (1 - t) + 0.6
      dashes.push(`M${cx - dw},${y} L${cx + dw},${y} L${cx2 + dw * 0.8},${y2} L${cx2 - dw * 0.8},${y2} Z`)
    }
  }
  const body = `M${left.map((p) => p.join(',')).join(' L')} L${right.reverse().map((p) => p.join(',')).join(' L')} Z`
  return { body, dashes }
}

function trees(rand, pts, color) {
  const out = []
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[i + 1]
    for (let k = 0; k < 3; k++) {
      const t = rand()
      const x = x1 + (x2 - x1) * t
      const y = y1 + (y2 - y1) * t + 6
      const h = 30 + rand() * 45
      out.push(<path key={`${i}-${k}`} d={`M${x},${y - h} L${x + h * 0.28},${y} L${x - h * 0.28},${y} Z`} fill={color} />)
    }
  }
  return out
}

export default function Scene({ scene = 'sunset', seed = 7, withRoad = false, className = '' }) {
  const p = palettes[scene] ?? palettes.sunset
  const rand = rng(seed * 97 + scene.length)
  const id = `${scene}-${seed}`
  const layers = [
    ridge(rand, 470, 170, 90),
    ridge(rand, 570, 150, 110),
    ridge(rand, 680, 120, 130),
    ridge(rand, 800, 70, 150),
  ]
  const isNight = scene === 'night'
  const sunX = 400 + rand() * 800
  const r = withRoad ? road() : null

  return (
    <svg
      className={`scene ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky[1]} />
          <stop offset="0.75" stopColor={p.sky[0]} />
        </linearGradient>
        <radialGradient id={`glow-${id}`}>
          <stop offset="0" stopColor={p.sun} stopOpacity="0.9" />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#sky-${id})`} />
      {isNight &&
        Array.from({ length: 70 }, (_, i) => (
          <circle key={i} cx={rand() * W} cy={rand() * 420} r={rand() * 1.8 + 0.4} fill="#fff" opacity={0.4 + rand() * 0.6} />
        ))}
      <circle cx={sunX} cy={isNight ? 170 : 380} r="260" fill={`url(#glow-${id})`} />
      <circle cx={sunX} cy={isNight ? 170 : 380} r={isNight ? 46 : 70} fill={p.sun} />
      {layers.map((pts, i) => (
        <path key={i} d={toPath(pts)} fill={p.ridges[i]} />
      ))}
      {scene === 'waterfall' && (
        <g opacity="0.85">
          <path d="M760,520 C770,600 755,690 770,800 L850,800 C835,690 850,600 830,520 Z" fill="#eaf6f7" />
          <path d="M780,540 L784,790 M805,530 L800,795 M822,540 L828,790" stroke="#b8d7dc" strokeWidth="5" />
          <ellipse cx="810" cy="805" rx="140" ry="22" fill="#eaf6f7" opacity="0.7" />
        </g>
      )}
      {(scene === 'forest' || scene === 'ghaat') && trees(rand, layers[3], p.ridges[3])}
      {r && (
        <g>
          <path d={r.body} fill="#1b1411" />
          {r.dashes.map((d, i) => (
            <path key={i} d={d} fill="#f2d39c" opacity="0.85" />
          ))}
        </g>
      )}
    </svg>
  )
}
