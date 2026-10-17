// Club ki saari details yahan badlo. Page apne aap update ho jayega.
// Kisi bhi card me asli photo lagani ho to `image: '/images/naam.jpg'` do
// aur wo photo `public/images/` folder me daal do. Photo na ho to
// illustration dikhega (scene: 'sunset' | 'forest' | 'waterfall' | 'ghaat' | 'dawn' | 'night').

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

  hero: {
    eyebrow: 'Motorcycle touring club · Chhattisgarh',
    title: ['Never', 'stop', 'exploring'],
    text: 'Chhattisgarh ka riders club. Ghaat, jungle aur waterfall routes pe weekend rides, safety-first group riding aur ek family jo saath chalti hai.',
    // Background photo aur usi photo se kata hua rider (rider bada "36RC" ke aage dikhta hai)
    image: '/images/hero-bg',
    rider: '/images/hero-rider',
  },

  stats: [
    { value: '150+', label: 'Riders' },
    { value: '80+', label: 'Group rides' },
    { value: '50,000+', label: 'Km covered' },
    { value: '5', label: 'Seasons' },
  ],

  // Join section ke peeche wali photo
  joinImage: '/images/amarkantak.jpg',

  about: {
    // Club ki apni photo: helmet pe 36RC ride stickers
    image: '/images/club-helmet.jpg',
    title: 'Har weekend ek naya route',
    text: 'Raipur se shuru hokar Bastar ke jungle, Mainpat ke plateau aur Keshkal ke ghaat tak. Bike koi bhi ho, josh ek hi hai.',
    points: [
      {
        icon: 'shield',
        title: 'Safety first',
        text: 'Full gear compulsory. Har ride pe lead aur sweep rider, aur briefing ke bina start nahi.',
      },
      {
        icon: 'route',
        title: 'Planned routes',
        text: 'Route, fuel stops aur food breaks pehle se tay. Aapko bas ride enjoy karni hai.',
      },
      {
        icon: 'people',
        title: 'Riders family',
        text: 'Puncture ho ya breakdown, group saath rukta hai. Koi peeche nahi chhootta.',
      },
    ],
  },

  // Agli ride: countdown isi time tak chalega (Indian time)
  nextRide: {
    title: 'Sunday Breakfast Ride',
    route: 'Raipur → Champaran',
    start: '2026-10-26T06:00:00+05:30',
    meetPoint: 'Telibandha Lake gate, 05:45',
  },

  // level: 'Easy' | 'Moderate' | 'Hard'
  routes: [
    {
      date: '26 Oct',
      place: 'Champaran',
      route: 'Raipur → Champaran → Raipur',
      km: 120,
      days: 1,
      level: 'Easy',
      scene: 'dawn',
      image: '/images/champaran.jpg',
    },
    {
      date: '08–09 Nov',
      place: 'Chitrakote Falls',
      route: 'Raipur → Jagdalpur → Chitrakote',
      km: 560,
      days: 2,
      level: 'Moderate',
      scene: 'waterfall',
      image: '/images/chitrakote.jpg',
    },
    {
      date: '23 Nov',
      place: 'Keshkal Ghaat',
      route: 'Raipur → Keshkal → Kanker',
      km: 340,
      days: 1,
      level: 'Moderate',
      scene: 'ghaat',
      image: '/images/ghaat-road.jpg',
    },
    {
      date: '13–14 Dec',
      place: 'Amarkantak',
      route: 'Raipur → Bilaspur → Amarkantak',
      km: 520,
      days: 2,
      level: 'Hard',
      scene: 'forest',
      image: '/images/amarkantak.jpg',
    },
  ],

  journal: [
    { title: 'Keshkal ghaat climb', meta: 'Jun 2026 · 340 km', scene: 'ghaat', image: '/images/ghaat-road.jpg' },
    { title: 'Dirt trail to Sirpur', meta: 'Oct 2026 · 180 km', scene: 'forest', image: '/images/offroad.jpg' },
    { title: 'Misty morning, Mainpat', meta: 'Sep 2026 · 680 km', scene: 'dawn', image: '/images/champaran.jpg' },
    { title: 'Chitrakote in full flow', meta: 'Jul 2026 · 560 km', scene: 'waterfall', image: '/images/chitrakote.jpg' },
    { title: 'Camp night near Jagdalpur', meta: 'Aug 2026 · 2 days', scene: 'night', image: '/images/camping.jpg' },
  ],

  // Season ke top riders (km ke hisaab se)
  riders: [
    { name: 'Rider Name 1', bike: 'Royal Enfield Himalayan 450', km: 8420 },
    { name: 'Rider Name 2', bike: 'KTM 390 Adventure', km: 7915 },
    { name: 'Rider Name 3', bike: 'Triumph Speed 400', km: 7340 },
    { name: 'Rider Name 4', bike: 'Hero Xpulse 200 4V', km: 6880 },
    { name: 'Rider Name 5', bike: 'Bajaj Dominar 400', km: 6215 },
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
      a: 'Bilkul. Pehle Easy level wali rides se shuru karo. Senior riders aapko guide karenge.',
    },
    {
      q: 'Riding gear zaroori hai?',
      a: 'Haan. Full-face helmet, riding jacket, gloves aur proper shoes ke bina ride allowed nahi hai.',
    },
  ],
}
