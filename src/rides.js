import { club } from './config.js'

// Rides ka common data: slug, status, sample plan aur dummy photos

const name = (v) => (v && typeof v === 'object' ? v.en : v)

export const slugOf = (r) =>
  `${name(r.place).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${r.start}`

// Ride ka aakhri din beet gaya to completed
export const isDone = (r) => {
  const end = new Date(`${r.start}T23:59:59+05:30`)
  end.setDate(end.getDate() + (r.days || 1) - 1)
  return end.getTime() < Date.now()
}

export function allRides() {
  return [...club.routes, ...club.pastRides].map((r, i) => ({ ...r, slug: slugOf(r), done: isDone(r), idx: i }))
}

export const findRide = (slug) => allRides().find((r) => r.slug === slug)

// Dummy photos: har ride ke liye gallery se alag 6 photos (asli photos aane pe ride me `photos: [...]` do)
export function photosFor(ride) {
  if (ride.photos?.length) return ride.photos
  const pool = club.galleryAll.map((p) => p.image).filter((src) => src !== ride.image)
  const out = [ride.image]
  for (let k = 0; out.length < 6 && k < pool.length; k++) out.push(pool[(ride.idx * 3 + k) % pool.length])
  return out
}

// Sample plan (asli plan ho to ride me `plan: [[time, {en,hi}], ...]` do)
export function planFor(ride) {
  if (ride.plan) return ride.plan
  const day1 = [
    ['05:45', { en: 'Assemble at the meet point, bike check and safety briefing', hi: 'Meet point pe milna, bike check aur safety briefing' }],
    ['06:00', { en: 'Flag off', hi: 'Flag off' }],
    ['08:00', { en: 'Breakfast and fuel stop', hi: 'Breakfast aur fuel stop' }],
    ['12:30', { en: 'Lunch on the way', hi: 'Raaste me lunch' }],
  ]
  if ((ride.days || 1) === 1) {
    return [{ day: 1, items: [...day1, ['14:00', { en: `Reach ${name(ride.place)}, explore and photos`, hi: `${name(ride.place)} pahunchna, ghoomna aur photos` }], ['19:00', { en: 'Back in Raipur', hi: 'Raipur wapas' }]] }]
  }
  return [
    { day: 1, items: [...day1, ['16:30', { en: `Reach ${name(ride.place)} and check in`, hi: `${name(ride.place)} pahunch ke check-in` }], ['20:00', { en: 'Dinner and campfire together', hi: 'Saath me dinner aur campfire' }]] },
    { day: 2, items: [
      ['06:30', { en: 'Sunrise ride and sightseeing', hi: 'Sunrise ride aur sightseeing' }],
      ['10:00', { en: 'Breakfast and check out', hi: 'Breakfast aur check-out' }],
      ['13:00', { en: 'Lunch on the way back', hi: 'Wapsi me lunch' }],
      ['19:00', { en: 'Back in Raipur', hi: 'Raipur wapas' }],
    ] },
  ]
}
