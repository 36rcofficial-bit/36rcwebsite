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
    galleryLead: 'Club events, rides and the people who make 36RC.',
    filterAll: 'All', filterClub: 'Club events', filterRides: 'Rides',
    backHome: 'Back to home', close: 'Close', prev: 'Previous photo', next: 'Next photo',
    member: 'Become a member',
    joinTitle: 'Your next adventure starts here',
    joinText: "Fill in the form and send it on WhatsApp. The team will add you to the club group and share the next ride's details. Joining is free.",
    phone: 'Phone', email: 'Email', instagram: 'Instagram', base: 'Base',
    joinForm: (n) => `Join ${n}`,
    yourName: 'Your name', yourPhone: 'WhatsApp number', bike: 'Bike', city: 'City',
    joinSent: 'Thanks! Your details are saved. Send the WhatsApp message to finish joining.',
    sendWa: 'Send on WhatsApp',
    joinMsg: (club, f) => `Hi ${club}! I'd like to join the club.\nName: ${f.name}\nWhatsApp: ${f.phone}\nBike: ${f.bike}\nCity: ${f.city}`,
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
    galleryLead: 'Club events, rides aur wo log jo 36RC banate hain.',
    filterAll: 'Sab', filterClub: 'Club events', filterRides: 'Rides',
    backHome: 'Home pe wapas', close: 'Band karo', prev: 'Pichli photo', next: 'Agli photo',
    member: 'Member bano',
    joinTitle: 'Aapka agla adventure yahin se',
    joinText: 'Form bharo aur WhatsApp pe bhejo. Team aapko club group me add karegi aur agli ride ki details bhejegi. Joining free hai.',
    phone: 'Phone', email: 'Email', instagram: 'Instagram', base: 'Base',
    joinForm: (n) => `${n} join karo`,
    yourName: 'Aapka naam', yourPhone: 'WhatsApp number', bike: 'Bike', city: 'City',
    joinSent: 'Thanks! Aapki details save ho gayi. Join poora karne ke liye WhatsApp message bhej do.',
    sendWa: 'WhatsApp pe bhejo',
    joinMsg: (club, f) => `Hi ${club}! Mujhe club join karna hai.\nNaam: ${f.name}\nWhatsApp: ${f.phone}\nBike: ${f.bike}\nCity: ${f.city}`,
    faqTitle: 'Humare saath naye ho?',
    join: 'Join',
    tapSkip: 'Skip karne ke liye tap karo',
  },
}
