// Club ki saari details yahan badlo. Page apne aap update ho jayega.
// Jo text do bhasha me dikhna hai, use { en: 'English', hi: 'Hinglish' } ki tarah likho.
// Kisi bhi card me asli photo lagani ho to `image: '/images/naam.jpg'` do
// aur wo photo `public/images/` folder me daal do. Photo na ho to
// illustration dikhega (scene: 'sunset' | 'forest' | 'waterfall' | 'ghaat' | 'dawn' | 'night').

export const club = {
  name: '36RC',
  fullName: 'Chhattisgarh Riding Club',
  city: 'Raipur, Chhattisgarh',
  season: 2026,

  // WhatsApp number country code ke saath, bina + ya space ke (jaise 919876543210)
  whatsapp: '910000000000',
  phone: '+91 00000 00000',
  email: 'hello@36rc.in',
  instagram: 'https://instagram.com/36rcofficial',
  instagramHandle: '@36rcofficial',

  hero: {
    eyebrow: 'Chhattisgarh Riding Club',
    title: ['Never', 'stop', 'exploring'],
    text: {
      en: "Chhattisgarh's riding club. Weekend rides through ghaats, jungles and waterfalls, safety-first group riding and a family that rides together.",
      hi: 'Chhattisgarh ka riders club. Ghaat, jungle aur waterfall routes pe weekend rides, safety-first group riding aur ek family jo saath chalti hai.',
    },
    // Background photo aur usi photo se kata hua rider (rider bada "36RC" ke aage dikhta hai)
    image: '/images/hero-bg',
    rider: '/images/hero-rider',
    // Hero carousel: pehli slide upar wali motocross photo hai, uske baad ye club ki photos
    slides: [
      { image: '/images/club-start.webp', caption: { en: 'CGRM 2024 · Dirt track start', hi: 'CGRM 2024 · Dirt track start' }, position: '50% 45%' },
      { image: '/images/club-startline.webp', caption: { en: 'Riders on the start line', hi: 'Start line pe riders' }, position: '50% 50%' },
      { image: '/images/club-drift.webp', caption: { en: 'Kicking up dust at CGRM', hi: 'CGRM me dhool udate hue' }, position: '55% 45%' },
    ],
  },

  // Agli ride: hero ke card me dikhti hai. Countdown `start` tak chalta hai (Indian time).
  nextRide: {
    title: 'Ride to Gour Ghat',
    dates: '24–25 Oct 2026',
    start: '2026-10-24T06:00:00+05:30',
    distance: { en: '~350 km one way', hi: '~350 km ek taraf' },
    days: 2,
    blurb: {
      en: 'An epic ride to the hidden gems of Chhattisgarh. Stay and costing details on WhatsApp.',
      hi: 'Chhattisgarh ke hidden gems tak ek epic ride. Stay aur costing details WhatsApp pe.',
    },
  },

  stats: [
    { value: '150+', label: { en: 'Riders', hi: 'Riders' } },
    { value: '80+', label: { en: 'Group rides', hi: 'Group rides' } },
    { value: '50,000+', label: { en: 'Km covered', hi: 'Km chale' } },
    { value: '5', label: { en: 'Seasons', hi: 'Seasons' } },
  ],

  // Join section ke peeche wali photo
  joinImage: '/images/club-team.webp',

  about: {
    // Club ki apni photo: helmet pe 36RC ride stickers
    image: '/images/club-helmet.jpg',
    title: { en: 'A new route every weekend', hi: 'Har weekend ek naya route' },
    text: {
      en: "From Raipur to Bastar's jungles, the Mainpat plateau and the Keshkal ghaat. Any bike, same spirit.",
      hi: 'Raipur se shuru hokar Bastar ke jungle, Mainpat ke plateau aur Keshkal ke ghaat tak. Bike koi bhi ho, josh ek hi hai.',
    },
    points: [
      {
        icon: 'shield',
        title: { en: 'Safety first', hi: 'Safety first' },
        text: {
          en: 'Full gear is compulsory. Every ride has a lead and sweep rider, and nobody starts without a briefing.',
          hi: 'Full gear compulsory. Har ride pe lead aur sweep rider, aur briefing ke bina start nahi.',
        },
      },
      {
        icon: 'route',
        title: { en: 'Planned routes', hi: 'Planned routes' },
        text: {
          en: 'Route, fuel stops and food breaks are fixed in advance. You just enjoy the ride.',
          hi: 'Route, fuel stops aur food breaks pehle se tay. Aapko bas ride enjoy karni hai.',
        },
      },
      {
        icon: 'people',
        title: { en: 'Riders family', hi: 'Riders family' },
        text: {
          en: 'Puncture or breakdown, the group stops together. Nobody gets left behind.',
          hi: 'Puncture ho ya breakdown, group saath rukta hai. Koi peeche nahi chhootta.',
        },
      },
    ],
  },

  // level: 'Easy' | 'Moderate' | 'Hard'
  routes: [
    {
      date: '24–25 Oct',
      place: 'Gour Ghat',
      route: { en: 'Raipur → Gour Ghat · ~350 km one way', hi: 'Raipur → Gour Ghat · ~350 km ek taraf' },
      km: 700,
      days: 2,
      level: 'Moderate',
      scene: 'ghaat',
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
    { title: { en: 'The 36RC family at CGRM night', hi: 'CGRM ki raat, 36RC family' }, meta: 'CGRM 2024', scene: 'night', image: '/images/club-night.webp' },
    { title: { en: 'Over the mound', hi: 'Mitti ke dher ke upar' }, meta: { en: 'CGRM 2024 · Off-road', hi: 'CGRM 2024 · Off-road' }, scene: 'ghaat', image: '/images/club-mound.webp' },
    { title: { en: 'Crew on the ground', hi: 'Ground pe hamari crew' }, meta: 'CGRM 2024', scene: 'forest', image: '/images/club-team.webp', position: '50% 40%' },
    { title: { en: 'Chhattisgarh Riders Meet 2024', hi: 'Chhattisgarh Riders Meet 2024' }, meta: { en: 'Riders from across the state', hi: 'Poore state ke riders' }, scene: 'sunset', image: '/images/club-cgrm.webp', position: '50% 35%' },
    { title: { en: 'On stage, together', hi: 'Stage pe, sab saath' }, meta: 'CGRM 2024', scene: 'night', image: '/images/club-stage.webp', position: '50% 70%' },
  ],


  faqs: [
    {
      q: { en: 'What bike do I need to join?', hi: 'Club join karne ke liye kaunsi bike chahiye?' },
      a: {
        en: 'Any bike works. It just needs to be road-worthy, and you need a valid licence and papers.',
        hi: 'Koi bhi bike chalegi. Bas wo road-worthy honi chahiye aur aapke paas valid licence aur documents hone chahiye.',
      },
    },
    {
      q: { en: 'Is there a membership fee?', hi: 'Kya membership fees hai?' },
      a: {
        en: 'Joining is free. Ride costs (fuel, food, stay) are shared among the riders.',
        hi: 'Joining free hai. Ride ka kharcha (fuel, food, stay) sab riders aapas me share karte hain.',
      },
    },
    {
      q: { en: "I'm a new rider. Can I come?", hi: 'Naye riders bhi aa sakte hain?' },
      a: {
        en: 'Absolutely. Start with the Easy rides. Senior riders will guide you.',
        hi: 'Bilkul. Pehle Easy level wali rides se shuru karo. Senior riders aapko guide karenge.',
      },
    },
    {
      q: { en: 'Is riding gear compulsory?', hi: 'Riding gear zaroori hai?' },
      a: {
        en: "Yes. A full-face helmet, riding jacket, gloves and proper shoes are a must, or you can't ride.",
        hi: 'Haan. Full-face helmet, riding jacket, gloves aur proper shoes ke bina ride allowed nahi hai.',
      },
    },
  ],
}
