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
  whatsapp: '919685479518',
  phone: '+91 96854 79518',
  email: '36rcofficials@gmail.com',
  // Google Sheet ka Web App URL (setup: google-sheet/README.md). Khaali ho to sirf WhatsApp khulta hai.
  sheetUrl: '',
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

  // Hero ke upar chalti patti. Dates aane pe `text` badal do; khaali `items` = ticker band.
  ticker: {
    href: '/events',
    items: [
      { en: 'Upcoming event', hi: 'Aane wala event', tag: true },
      { en: 'CGRM 2.0', hi: 'CGRM 2.0', big: true },
      { en: 'Dates will be announced soon', hi: 'Dates jaldi announce hongi' },
    ],
  },

  // Hero ka upar-right card: aane wala event. Dates aane pe when badal do.
  heroEvent: {
    title: 'CGRM 2.0',
    season: { en: 'Season 2', hi: 'Season 2' },
    place: { en: 'Chhattisgarh Riders Meet', hi: 'Chhattisgarh Riders Meet' },
    when: { en: 'Dates will be announced soon', hi: 'Dates jaldi announce hongi' },
    href: '/events/cgrm-season-1',
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

  // Gallery: do patti me dheere chalti photos. size: 'wide' | 'tall' | normal
  gallery: [
    [
      { image: '/images/club-night.webp', alt: '36RC family at CGRM night', size: 'wide' },
      { image: '/images/club-mound.webp', alt: 'Rider over a dirt mound' },
      { image: '/images/club-helmet.webp', alt: 'Helmet with 36RC ride stickers', size: 'tall' },
      { image: '/images/club-startline.webp', alt: 'Riders on the start line', size: 'wide' },
      { image: '/images/chitrakote.jpg', alt: 'Chitrakote waterfall' },
      { image: '/images/club-team.webp', alt: '36RC crew with bikes', size: 'wide' },
    ],
    [
      { image: '/images/club-drift.webp', alt: 'Rider kicking up dust', size: 'wide' },
      { image: '/images/ghaat-road.jpg', alt: 'Riders on a ghaat road' },
      { image: '/images/club-cgrm.webp', alt: 'Riders celebrating at CGRM 2024', size: 'wide' },
      { image: '/images/camping.jpg', alt: 'Motorcycle camp' },
      { image: '/images/club-start.webp', alt: 'Dirt track start at CGRM', size: 'wide' },
      { image: '/images/club-stage.webp', alt: 'Club on stage at CGRM' },
    ],
  ],

  // Full gallery page (/gallery). type: 'club' (club events) | 'ride' (rides & routes)
  galleryAll: [
    { image: '/images/club-night.webp', type: 'club', caption: { en: 'The 36RC family at CGRM night', hi: 'CGRM ki raat, 36RC family' } },
    { image: '/images/club-drift.webp', type: 'club', caption: { en: 'Kicking up dust at CGRM', hi: 'CGRM me dhool udate hue' } },
    { image: '/images/club-helmet.webp', type: 'club', caption: { en: 'A helmet full of ride stickers', hi: 'Ride stickers se bhara helmet' } },
    { image: '/images/ghaat-road.jpg', type: 'ride', caption: { en: 'Keshkal ghaat climb', hi: 'Keshkal ghaat ki chadhai' } },
    { image: '/images/club-startline.webp', type: 'club', caption: { en: 'Riders on the start line', hi: 'Start line pe riders' } },
    { image: '/images/chitrakote.jpg', type: 'ride', caption: { en: 'Chitrakote in full flow', hi: 'Chitrakote poore uphaan pe' } },
    { image: '/images/club-mound.webp', type: 'club', caption: { en: 'Over the mound', hi: 'Mitti ke dher ke upar' } },
    { image: '/images/club-team.webp', type: 'club', caption: { en: 'Crew on the ground', hi: 'Ground pe hamari crew' } },
    { image: '/images/offroad.jpg', type: 'ride', caption: { en: 'Dirt trail to Sirpur', hi: 'Sirpur ka kachcha raasta' } },
    { image: '/images/club-cgrm.webp', type: 'club', caption: { en: 'Chhattisgarh Riders Meet 2024', hi: 'Chhattisgarh Riders Meet 2024' } },
    { image: '/images/camping.jpg', type: 'ride', caption: { en: 'Camp night near Jagdalpur', hi: 'Jagdalpur ke paas camp night' } },
    { image: '/images/club-start.webp', type: 'club', caption: { en: 'Dirt track start', hi: 'Dirt track start' } },
    { image: '/images/champaran.jpg', type: 'ride', caption: { en: 'Misty morning, Mainpat', hi: 'Mainpat ki dhundh bhari subah' } },
    { image: '/images/club-stage.webp', type: 'club', caption: { en: 'On stage, together', hi: 'Stage pe, sab saath' } },
    { image: '/images/sunset.jpg', type: 'ride', caption: { en: 'Sunset halt', hi: 'Sunset pe ruke' } },
    { image: '/images/amarkantak.jpg', type: 'ride', caption: { en: 'Forest roads to Amarkantak', hi: 'Amarkantak ke jungle raaste' } },
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
      start: '2026-10-24',
      place: 'Gour Ghat',
      about: { en: 'An epic two-day ride to the hidden gems of Chhattisgarh. Stay and costing shared on WhatsApp.', hi: 'Chhattisgarh ke hidden gems tak do din ki epic ride. Stay aur costing WhatsApp pe.' },
      route: { en: 'Raipur → Gour Ghat · ~350 km one way', hi: 'Raipur → Gour Ghat · ~350 km ek taraf' },
      km: 700,
      days: 2,
      level: 'Moderate',
      scene: 'ghaat',
      image: '/images/champaran.jpg',
    },
    {
      date: '08–09 Nov',
      start: '2026-11-08',
      place: 'Chitrakote Falls',
      about: { en: "Through Jagdalpur to India's widest waterfall, with a night halt in Bastar.", hi: 'Jagdalpur hote hue Bharat ke sabse chaude waterfall tak, Bastar me night halt.' },
      route: 'Raipur → Jagdalpur → Chitrakote',
      km: 560,
      days: 2,
      level: 'Moderate',
      scene: 'waterfall',
      image: '/images/chitrakote.jpg',
    },
    {
      date: '23 Nov',
      start: '2026-11-23',
      place: 'Keshkal Ghaat',
      about: { en: 'A one-day ghaat run with twisty climbs and a lunch stop in Kanker.', hi: 'Ek din ki ghaat ride, ghumavdaar chadhai aur Kanker me lunch.' },
      route: 'Raipur → Keshkal → Kanker',
      km: 340,
      days: 1,
      level: 'Moderate',
      scene: 'ghaat',
      image: '/images/ghaat-road.jpg',
    },
    {
      date: '13–14 Dec',
      start: '2026-12-13',
      place: 'Amarkantak',
      about: { en: 'Forest roads to the source of the Narmada. Longer days, for riders with some experience.', hi: 'Narmada ke udgam tak jungle ke raaste. Lambe din, thode experienced riders ke liye.' },
      route: 'Raipur → Bilaspur → Amarkantak',
      km: 520,
      days: 2,
      level: 'Hard',
      scene: 'forest',
      image: '/images/amarkantak.jpg',
    },
  ],

  // Pichli rides (Rides page pe "Completed" me). Upar wali rides ki date nikalne pe wo bhi apne aap Completed me aa jaati hain.
  pastRides: [
    { date: '05 Oct', start: '2026-10-05', place: 'Sirpur', route: 'Raipur → Sirpur', km: 180, days: 1, level: 'Easy', image: '/images/offroad.jpg' },
    { date: '14 Sep', start: '2026-09-14', place: 'Mainpat', route: 'Raipur → Mainpat', km: 680, days: 2, level: 'Moderate', image: '/images/champaran.jpg' },
    { date: '16–17 Aug', start: '2026-08-16', place: { en: 'Jagdalpur camp', hi: 'Jagdalpur camp' }, route: 'Raipur → Jagdalpur', km: 600, days: 2, level: 'Moderate', image: '/images/camping.jpg' },
    { date: '19–20 Jul', start: '2026-07-19', place: 'Chitrakote Falls', route: 'Raipur → Jagdalpur → Chitrakote', km: 560, days: 2, level: 'Moderate', image: '/images/chitrakote.jpg' },
    { date: '21 Jun', start: '2026-06-21', place: 'Keshkal Ghaat', route: 'Raipur → Keshkal → Kanker', km: 340, days: 1, level: 'Moderate', image: '/images/ghaat-road.jpg' },
  ],

  journal: [
    { title: { en: 'Keshkal ghaat climb', hi: 'Keshkal ghaat ki chadhai' }, meta: 'Jun 2026 · 340 km', scene: 'ghaat', image: '/images/ghaat-road.jpg' },
    { title: { en: 'Dirt trail to Sirpur', hi: 'Sirpur ka kachcha raasta' }, meta: 'Oct 2026 · 180 km', scene: 'forest', image: '/images/offroad.jpg' },
    { title: { en: 'Misty morning, Mainpat', hi: 'Mainpat ki dhundh bhari subah' }, meta: 'Sep 2026 · 680 km', scene: 'dawn', image: '/images/champaran.jpg' },
    { title: { en: 'Chitrakote in full flow', hi: 'Chitrakote poore uphaan pe' }, meta: 'Jul 2026 · 560 km', scene: 'waterfall', image: '/images/chitrakote.jpg' },
    { title: { en: 'Camp night near Jagdalpur', hi: 'Jagdalpur ke paas camp night' }, meta: { en: 'Aug 2026 · 2 days', hi: 'Aug 2026 · 2 din' }, scene: 'night', image: '/images/camping.jpg' },
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
