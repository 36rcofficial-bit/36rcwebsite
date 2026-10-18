// Exclusive Events (/events aur /events/:slug). Naya event jodna ho to is list me ek object daal do.
// status: 'upcoming' | 'soon' (dates abhi tay nahi) | 'done'
// Text { en, hi } me. Abhi dates aur details sample hain, asli aane pe badal do.

export const events = [
  {
    slug: 'tiger-trail',
    title: 'Tiger Trail',
    season: { en: 'Forest ride', hi: 'Forest ride' },
    status: 'soon',
    when: { en: 'Dates announced soon', hi: 'Dates jaldi announce hongi' },
    where: { en: 'Forest reserves of Chhattisgarh', hi: 'Chhattisgarh ke forest reserves' },
    tagline: {
      en: 'A slow, respectful ride through tiger country: forest roads, river crossings and nights under the sal trees.',
      hi: 'Tiger country se ek dheemi aur zimmedaar ride: jungle ke raaste, nadi crossings aur sal ke pedon ke neeche raatein.',
    },
    about: [
      {
        en: 'Tiger Trail takes the club deep into the forests of Chhattisgarh along permitted roads, riding at an easy pace with forest rules and quiet zones respected throughout.',
        hi: 'Tiger Trail club ko Chhattisgarh ke jungle ke andar permitted raaston pe le jaata hai, aaraam ki speed pe, forest rules aur quiet zones ka poora dhyan rakhte hue.',
      },
      {
        en: 'Expect early starts, gravel sections, local food and a campfire evening with the crew.',
        hi: 'Subah jaldi start, kuch gravel sections, local khana aur crew ke saath campfire ki shaam.',
      },
    ],
    highlights: [
      [{ en: 'Forest roads', hi: 'Jungle ke raaste' }, { en: 'Permitted routes through sal and teak forest.', hi: 'Sal aur teak ke jungle me permitted raaste.' }],
      [{ en: 'Wildlife etiquette', hi: 'Wildlife etiquette' }, { en: 'Low speeds, no horns, no stopping in core zones.', hi: 'Kam speed, horn nahi, core zones me rukna nahi.' }],
      [{ en: 'Camp night', hi: 'Camp night' }, { en: 'Tents, campfire and stories with the crew.', hi: 'Tent, campfire aur crew ke saath kisse.' }],
      [{ en: 'Local food', hi: 'Local khana' }, { en: 'Meals at village dhabas along the route.', hi: 'Raaste ke gaon ke dhabon pe khana.' }],
    ],
    hero: '/images/amarkantak.jpg',
    photos: ['/images/amarkantak.jpg', '/images/offroad.jpg', '/images/camping.jpg', '/images/footer-forest.jpg', '/images/sunset.jpg', '/images/ghaat-road.jpg'],
  },
  {
    slug: 'cgrm-season-1',
    title: 'CGRM',
    season: { en: 'Season 1', hi: 'Season 1' },
    status: 'done',
    when: { en: '2024', hi: '2024' },
    where: { en: 'Raipur, Chhattisgarh', hi: 'Raipur, Chhattisgarh' },
    tagline: {
      en: 'Chhattisgarh Riders Meet: one weekend, riders from across the state, dirt-track challenges and a night on stage.',
      hi: 'Chhattisgarh Riders Meet: ek weekend, poore state ke riders, dirt-track challenges aur stage pe ek raat.',
    },
    about: [
      {
        en: 'The first Chhattisgarh Riders Meet brought riding clubs and solo riders from across the state together for a weekend of riding, skills and community.',
        hi: 'Pehle Chhattisgarh Riders Meet me poore state ke riding clubs aur solo riders ek weekend ke liye mile: riding, skills aur community.',
      },
      {
        en: '36RC rode, raced and volunteered across the weekend. Season 2 details will be shared on WhatsApp and Instagram.',
        hi: '36RC ne poore weekend ride kiya, race kiya aur volunteer kiya. Season 2 ki details WhatsApp aur Instagram pe aayengi.',
      },
    ],
    highlights: [
      [{ en: 'Dirt-track challenges', hi: 'Dirt-track challenges' }, { en: 'Slow races, off-road loops and skill events with marshals.', hi: 'Slow race, off-road loops aur skill events, marshals ke saath.' }],
      [{ en: 'Rider community', hi: 'Rider community' }, { en: 'Clubs and solo riders from across the state.', hi: 'Poore state ke clubs aur solo riders.' }],
      [{ en: 'Night on stage', hi: 'Stage pe raat' }, { en: 'Live music, club introductions and awards.', hi: 'Live music, club introductions aur awards.' }],
      [{ en: 'Bikes on display', hi: 'Bikes ka display' }, { en: 'Every kind of bike in one paddock.', hi: 'Har tarah ki bike ek paddock me.' }],
    ],
    hero: '/images/club-cgrm.webp',
    photos: ['/images/club-night.webp', '/images/club-drift.webp', '/images/club-start.webp', '/images/club-startline.webp', '/images/club-mound.webp', '/images/club-team.webp', '/images/club-stage.webp', '/images/club-cgrm.webp'],
  },
  {
    slug: 'dekho-bastar-season-2',
    title: 'Dekho Bastar',
    season: { en: 'Season 2', hi: 'Season 2' },
    status: 'soon',
    when: { en: 'Dates announced soon', hi: 'Dates jaldi announce hongi' },
    where: { en: 'Bastar, Chhattisgarh', hi: 'Bastar, Chhattisgarh' },
    tagline: {
      en: 'A multi-day ride through Bastar: waterfalls, tribal markets, caves and some of the best roads in central India.',
      hi: 'Bastar me kai din ki ride: waterfalls, tribal haat, gufayein aur central India ki kuch sabse achhi sadkein.',
    },
    about: [
      {
        en: 'Dekho Bastar is our signature tour of the Bastar region. Season 2 returns with a fresh route covering waterfalls, caves and local haats.',
        hi: 'Dekho Bastar hamara signature Bastar tour hai. Season 2 naye route ke saath aa raha hai: waterfalls, gufayein aur local haat.',
      },
      {
        en: 'Stays, fuel stops and support are planned by the club so riders can focus on the road.',
        hi: 'Stay, fuel stops aur support club plan karta hai, taaki riders bas sadak pe dhyan de sakein.',
      },
    ],
    highlights: [
      [{ en: 'Waterfalls', hi: 'Waterfalls' }, { en: 'Chitrakote, Tirathgarh and lesser-known falls.', hi: 'Chitrakote, Tirathgarh aur kam jaane-maane falls.' }],
      [{ en: 'Tribal haats', hi: 'Tribal haat' }, { en: 'Weekly markets, crafts and local food.', hi: 'Haftawari bazaar, crafts aur local khana.' }],
      [{ en: 'Caves and forests', hi: 'Gufayein aur jungle' }, { en: 'Kanger Valley and its limestone caves.', hi: 'Kanger Valley aur uski limestone gufayein.' }],
      [{ en: 'Supported tour', hi: 'Supported tour' }, { en: 'Planned stays, fuel stops and a sweep rider.', hi: 'Planned stay, fuel stops aur sweep rider.' }],
    ],
    hero: '/images/chitrakote.jpg',
    photos: ['/images/chitrakote.jpg', '/images/camping.jpg', '/images/ghaat-road.jpg', '/images/champaran.jpg', '/images/offroad.jpg', '/images/club-helmet.webp'],
  },
]

export const findEvent = (slug) => events.find((e) => e.slug === slug)
