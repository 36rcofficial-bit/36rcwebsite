import { createContext, useContext, useEffect, useState } from 'react'

// Website ki do bhashayein: 'en' = English, 'hi' = Hinglish
const KEY = '36rc-lang'
const LangContext = createContext(null)

const readSaved = () => {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'en' || v === 'hi' ? v : 'hi'
  } catch {
    return 'hi'
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readSaved)
  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      // storage band ho to bas yaad nahi rahega
    }
    document.documentElement.lang = lang === 'en' ? 'en' : 'hi-Latn'
  }, [lang])

  // { en, hi } object ho to current bhasha ka text, warna jaisa hai waisa
  const tr = (v) => (v && typeof v === 'object' && 'en' in v ? v[lang] ?? v.en : v)
  return <LangContext.Provider value={{ lang, setLang, tr, u: UI[lang] }}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LangContext)

export function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`lang-toggle ${className}`} role="group" aria-label="Language">
      <span className="lang-thumb" style={{ transform: lang === 'en' ? 'translateX(0)' : 'translateX(100%)' }} aria-hidden="true" />
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      <button type="button" aria-pressed={lang === 'hi'} onClick={() => setLang('hi')}>Hinglish</button>
    </div>
  )
}

const UI = {
  en: {
    nav: { about: 'About', routes: 'Routes', journal: 'Journal', gallery: 'Gallery', faq: 'FAQ' },
    joinClub: 'Join the club',
    viewRides: 'View rides',
    scroll: 'Scroll',
    nextRide: 'Next ride',
    countIn: "I'm in",
    details: 'Details',
    days: 'Days', hrs: 'Hrs', mins: 'Min', secs: 'Sec',
    day: 'day', daysWord: 'days',
    rideJoinMsg: (club, ride, date) => `Hi ${club}! Please add me to the ${ride} (${date}).`,
    rideInfoMsg: (club, ride) => `Hi ${club}! Please share the stay and costing details for ${ride}.`,
    about: (n) => `About ${n}`,
    together: 'covered together',
    upcoming: 'Upcoming rides',
    routesTitle: 'Routes this season',
    routesNote: 'Before every ride the full plan, fuel stops and stay details are shared in the WhatsApp group.',
    bookSeat: 'Book my seat',
    journalEyebrow: 'Ride journal',
    journalTitle: "Miles we've made",
    moreInsta: 'More on Instagram',
    galleryEyebrow: 'Gallery',
    galleryTitle: 'Moments on the road',
    viewGallery: 'View full gallery',
    viewAllRides: 'View all rides', ridesTitle: 'All rides', ridesLead: 'Every ride we have planned and every road we have already covered.',
    upcomingRides: 'Upcoming', completedRides: 'Completed', kmRidden: 'Km ridden', completed: 'Completed', noRides: 'No rides here yet. Check back soon.',
    distance: 'Distance', duration: 'Duration', level: 'Level', ridesNav: 'Rides', eventsNav: 'Exclusive Events',
    eventsTitle: 'Exclusive Events', eventsLead: 'Signature rides and meets that 36RC runs or rides out to every season.', evSoon: 'Coming soon', evDone: 'Completed', evExplore: 'Explore event',
    evWhen: 'When', evWhere: 'Where', evAbout: 'About the event', evHighlights: 'Highlights', evMore: 'More events', evNotFound: 'Event not found',
    evInterested: 'I am interested', evNotify: 'Notify me for the next season', evMsg: (c, n) => `Hi ${c}! Please share details about ${n}.`,
    joinPerks: ['Free to join', 'Weekend rides', 'Safety first'], waDirect: 'Message us on WhatsApp', upcomingEvent: 'Upcoming event', notifyMe: 'Notify me', nextRideShort: 'Next ride',
    rideDetails: 'Ride details', ridePlan: 'Ride plan', dayN: (n) => `Day ${n}`, ridePhotos: 'Photos', whatToCarry: 'What to carry',
    planNote: 'Timings are indicative. The final plan is shared in the WhatsApp group before the ride.',
    carryList: ['Full-face helmet, riding jacket, gloves and boots', 'Driving licence, RC, insurance and PUC', 'Rain gear and a warm layer', 'Puncture kit, tyre inflator and basic tools', 'Water, snacks and any personal medicines', 'Power bank and phone mount'],
    rideDoneNote: 'This ride is done. Check the upcoming rides to join the next one.', contactUs: 'Questions? Call or WhatsApp', moreRides: 'More rides', rideNotFound: 'Ride not found',
    galleryLead: 'Club events, rides and the people who make 36RC.',
    filterAll: 'All', filterClub: 'Club events', filterRides: 'Rides',
    lastUpdated: 'Last updated', privacy: 'Privacy Policy', terms: 'Terms & Conditions', cookies: 'Cookie Policy',
    backHome: 'Back to home', close: 'Close', prev: 'Previous photo', next: 'Next photo',
    member: 'Become a member',
    joinTitle: 'Your next adventure starts here',
    joinText: "Fill in the form and send it on WhatsApp. The team will add you to the club group and share the next ride's details. Joining is free.",
    phone: 'Phone', email: 'Email', instagram: 'Instagram', base: 'Base',
    joinForm: (n) => `Join ${n}`,
    yourName: 'Your name', yourPhone: 'WhatsApp number', city: 'City',
    gender: 'Gender', genders: ['Male', 'Female', 'Other', 'Prefer not to say'],
    bikeBrand: 'Bike brand', bikeModel: 'Model', otherBrand: 'Other', choose: 'Select',
    joinSent: 'Thanks! Your details are saved. Send the WhatsApp message to finish joining.',
    sendWa: 'Send on WhatsApp',
    joinMsg: (club, f) => `Hi ${club}! I'd like to join the club.\nName: ${f.name}\nWhatsApp: ${f.phone}\nCity: ${f.city}\nGender: ${f.gender}\nBike: ${f.brand} ${f.model}`,
    faqTitle: 'New to riding with us?',
    join: 'Join',
    tapSkip: 'Tap to skip',
  },
  hi: {
    nav: { about: 'About', routes: 'Routes', journal: 'Journal', gallery: 'Gallery', faq: 'FAQ' },
    joinClub: 'Club join karo',
    viewRides: 'Rides dekho',
    scroll: 'Scroll',
    nextRide: 'Agli ride',
    countIn: 'Join karo',
    details: 'Details',
    days: 'Din', hrs: 'Ghante', mins: 'Min', secs: 'Sec',
    day: 'din', daysWord: 'din',
    rideJoinMsg: (club, ride, date) => `Hi ${club}! ${ride} (${date}) ke liye mera naam add kar do.`,
    rideInfoMsg: (club, ride) => `Hi ${club}! ${ride} ki stay aur costing details bhej do.`,
    about: (n) => `${n} ke baare me`,
    together: 'saath me chale',
    upcoming: 'Aane wali rides',
    routesTitle: 'Is season ke routes',
    routesNote: 'Har ride se pehle WhatsApp group me poora plan, fuel stops aur stay details aati hain.',
    bookSeat: 'Meri seat book karo',
    journalEyebrow: 'Ride journal',
    journalTitle: 'Humare safar',
    moreInsta: 'Instagram pe aur dekho',
    galleryEyebrow: 'Gallery',
    galleryTitle: 'Raaste ke yaadgaar pal',
    viewGallery: 'Poori gallery dekho',
    viewAllRides: 'Saari rides dekho', ridesTitle: 'Saari rides', ridesLead: 'Har plan ki hui ride aur har wo raasta jo hum chal chuke hain.',
    upcomingRides: 'Aane wali', completedRides: 'Ho chuki', kmRidden: 'Km chale', completed: 'Ho chuki', noRides: 'Abhi yahan koi ride nahi. Jaldi wapas dekho.',
    distance: 'Doori', duration: 'Samay', level: 'Level', ridesNav: 'Rides', eventsNav: 'Exclusive Events',
    eventsTitle: 'Exclusive Events', eventsLead: 'Har season ki signature rides aur meets, jo 36RC chalata hai ya jinme shaamil hota hai.', evSoon: 'Jaldi aa raha', evDone: 'Ho chuka', evExplore: 'Event dekho',
    evWhen: 'Kab', evWhere: 'Kahan', evAbout: 'Event ke baare me', evHighlights: 'Highlights', evMore: 'Aur events', evNotFound: 'Event nahi mila',
    evInterested: 'Mujhe interest hai', evNotify: 'Agle season ki update chahiye', evMsg: (c, n) => `Hi ${c}! ${n} ki details bhej do.`,
    joinPerks: ['Joining free', 'Weekend rides', 'Safety first'], waDirect: 'Seedha WhatsApp karo', upcomingEvent: 'Aane wala event', notifyMe: 'Update chahiye', nextRideShort: 'Agli ride',
    rideDetails: 'Ride details', ridePlan: 'Ride ka plan', dayN: (n) => `Din ${n}`, ridePhotos: 'Photos', whatToCarry: 'Kya saath laana hai',
    planNote: 'Timings andaazan hain. Final plan ride se pehle WhatsApp group me aata hai.',
    carryList: ['Full-face helmet, riding jacket, gloves aur boots', 'Driving licence, RC, insurance aur PUC', 'Rain gear aur ek garam layer', 'Puncture kit, tyre inflator aur basic tools', 'Paani, snacks aur apni dawaiyan', 'Power bank aur phone mount'],
    rideDoneNote: 'Ye ride ho chuki hai. Agli ride join karne ke liye aane wali rides dekho.', contactUs: 'Sawaal? Call ya WhatsApp karo', moreRides: 'Aur rides', rideNotFound: 'Ride nahi mili',
    galleryLead: 'Club events, rides aur wo log jo 36RC banate hain.',
    filterAll: 'Sab', filterClub: 'Club events', filterRides: 'Rides',
    lastUpdated: 'Last updated', privacy: 'Privacy Policy', terms: 'Terms & Conditions', cookies: 'Cookie Policy',
    backHome: 'Home pe wapas', close: 'Band karo', prev: 'Pichli photo', next: 'Agli photo',
    member: 'Member bano',
    joinTitle: 'Aapka agla adventure yahin se',
    joinText: 'Form bharo aur WhatsApp pe bhejo. Team aapko club group me add karegi aur agli ride ki details bhejegi. Joining free hai.',
    phone: 'Phone', email: 'Email', instagram: 'Instagram', base: 'Base',
    joinForm: (n) => `${n} join karo`,
    yourName: 'Aapka naam', yourPhone: 'WhatsApp number', city: 'City',
    gender: 'Gender', genders: ['Male', 'Female', 'Other', 'Nahi batana'],
    bikeBrand: 'Bike brand', bikeModel: 'Model', otherBrand: 'Other', choose: 'Chuno',
    joinSent: 'Thanks! Aapki details save ho gayi. Join poora karne ke liye WhatsApp message bhej do.',
    sendWa: 'WhatsApp pe bhejo',
    joinMsg: (club, f) => `Hi ${club}! Mujhe club join karna hai.\nNaam: ${f.name}\nWhatsApp: ${f.phone}\nCity: ${f.city}\nGender: ${f.gender}\nBike: ${f.brand} ${f.model}`,
    faqTitle: 'Humare saath naye ho?',
    join: 'Join',
    tapSkip: 'Skip karne ke liye tap karo',
  },
}
