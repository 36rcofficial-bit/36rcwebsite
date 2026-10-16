// Club ki saari details yahan badlo. Page apne aap update ho jayega.
// Kisi bhi card me photo lagani ho to `image: '/images/naam.jpg'` do
// aur wo photo `public/images/` folder me daal do.

export const club = {
  name: '36RC',
  fullName: '36 Riders Club',
  city: 'Raipur, Chhattisgarh',
  season: 2026,

  // WhatsApp number country code ke saath, bina + ya space ke (jaise 919876543210)
  whatsapp: '910000000000',
  phone: '+91 00000 00000',
  email: 'hello@36rc.in',
  instagram: 'https://instagram.com/36rcofficial',
  instagramHandle: '@36rcofficial',

  quickLinks: [
    ['#calendar', 'Ride calendar'],
    ['#stories', 'Ride stories'],
    ['#standings', 'Km standings'],
    ['#join', 'Join the club'],
    ['#faq', 'New to 36RC?'],
  ],

  featured: {
    tag: 'Ride report',
    title: 'Chitrakote run: 42 riders, 560 km and one very wet ghaat',
    image: '',
  },

  stories: [
    { tag: 'Ride report', title: 'Sunday breakfast ride to Champaran: 120 km before 10 am' },
    { tag: 'Safety', title: 'Why lead and sweep riders matter on every group ride' },
    { tag: 'Riders', title: 'Meet the rider who crossed 25,000 km with 36RC this year' },
    { tag: 'Gear', title: 'Monsoon riding kit: what our senior riders actually carry' },
  ],

  // Agli ride: countdown isi date tak chalega (YYYY-MM-DDTHH:mm, Indian time)
  nextRide: {
    round: 9,
    title: 'Sunday Breakfast Ride',
    route: 'Raipur → Champaran → Raipur',
    start: '2026-10-26T06:00:00+05:30',
    meetPoint: 'Telibandha Lake gate',
    schedule: [
      ['Sun 26 Oct', '05:45', 'Riders assemble & briefing'],
      ['Sun 26 Oct', '06:00', 'Flag off'],
      ['Sun 26 Oct', '07:30', 'Breakfast stop, Champaran'],
      ['Sun 26 Oct', '10:00', 'Back in Raipur'],
    ],
  },

  // status: 'done' ya 'upcoming'
  calendar: [
    { round: 7, dates: '14 SEP', place: 'Mainpat', route: 'Raipur → Mainpat', km: 680, status: 'done' },
    { round: 8, dates: '05 OCT', place: 'Sirpur', route: 'Raipur → Sirpur', km: 180, status: 'done' },
    { round: 9, dates: '26 OCT', place: 'Champaran', route: 'Raipur → Champaran', km: 120, status: 'upcoming' },
    { round: 10, dates: '08–09 NOV', place: 'Chitrakote', route: 'Raipur → Jagdalpur → Chitrakote', km: 560, status: 'upcoming' },
    { round: 11, dates: '23 NOV', place: 'Keshkal Ghaat', route: 'Raipur → Keshkal → Kanker', km: 340, status: 'upcoming' },
    { round: 12, dates: '13–14 DEC', place: 'Amarkantak', route: 'Raipur → Bilaspur → Amarkantak', km: 520, status: 'upcoming' },
  ],

  // Season ke km leaderboard (color = rider ki bike ka rang, sirf design ke liye)
  standings: [
    { name: 'Rider Name 1', bike: 'Royal Enfield Himalayan 450', km: 8420, color: '#e8002d' },
    { name: 'Rider Name 2', bike: 'KTM 390 Adventure', km: 7915, color: '#ff8000' },
    { name: 'Rider Name 3', bike: 'Triumph Speed 400', km: 7340, color: '#27f4d2' },
    { name: 'Rider Name 4', bike: 'Hero Xpulse 200 4V', km: 6880, color: '#3671c6' },
    { name: 'Rider Name 5', bike: 'Bajaj Dominar 400', km: 6215, color: '#52e252' },
    { name: 'Rider Name 6', bike: 'Royal Enfield Interceptor 650', km: 5790, color: '#b6babd' },
  ],

  stats: [
    { value: '150+', label: 'Riders' },
    { value: '80+', label: 'Group rides' },
    { value: '50,000+', label: 'Km covered' },
    { value: '5', label: 'Seasons' },
  ],

  faqs: [
    {
      q: 'Club join karne ke liye kaunsi bike chahiye?',
      a: 'Koi bhi bike chalegi. Bas wo road-worthy honi chahiye aur aapke paas valid licence aur documents hone chahiye.',
    },
    {
      q: 'Kya membership fees hai?',
      a: 'Joining free hai. Ride ka kharcha (fuel, food, stay) sab riders aapas me share karte hain.',
    },
    {
      q: 'Main naya rider hoon, kya main aa sakta hoon?',
      a: 'Bilkul. Pehle 200 km se chhoti rides se shuru karo. Senior riders aapko guide karenge.',
    },
    {
      q: 'Riding gear zaroori hai?',
      a: 'Haan. Full-face helmet, riding jacket, gloves aur proper shoes ke bina ride allowed nahi hai.',
    },
  ],
}
