// Legal pages ka content. Kuch badalna ho to yahin badlo aur `updated` date bhi badal do.
// Note: ye general jaankari hai, legal advice nahi. Zaroorat ho to kisi lawyer se review karwa lo.

const CLUB = 'Chhattisgarh Riding Club (36RC)'
const EMAIL = '36rcofficials@gmail.com'
const PHONE = '+91 96854 79518'
const SITE = '36rc.vercel.app'

export const legal = {
  privacy: {
    title: 'Privacy Policy',
    updated: '18 October 2026',
    intro: `This policy explains what personal information ${CLUB} ("we", "us") collects through ${SITE}, why we collect it and how we look after it. We are a community riding club, not a company that sells data, and we keep what we collect to the minimum we need to run the club.`,
    sections: [
      {
        h: 'Information we collect',
        p: [
          'When you fill in the Join form we collect your name, WhatsApp number, the bike you ride and your city.',
          'When you tap a WhatsApp button (for example "Join", "Book my seat" or "Details"), WhatsApp opens with a pre-written message. Anything you send there, including your WhatsApp profile and number, is shared with us through WhatsApp.',
          'Our hosting provider automatically records basic technical information such as IP address, browser type and the pages requested, to keep the site running and secure.',
        ],
      },
      {
        h: 'How we use it',
        list: [
          'To add you to the club and our WhatsApp groups.',
          'To contact you about upcoming rides, stay and costing details, and safety briefings.',
          'To plan rides (for example, how many riders and which bikes are coming).',
          'To keep the website working and protected from spam or misuse.',
        ],
        p: ['We do not sell, rent or trade your information, and we do not use it for advertising.'],
      },
      {
        h: 'Where it is stored and who can see it',
        p: [
          'Join form entries are saved in a Google Sheet owned by the club and are visible only to the club organisers who manage memberships and rides.',
          'Messages you send us are stored in WhatsApp under WhatsApp\'s own terms and privacy policy.',
          'The website is hosted by Vercel and loads fonts from Google Fonts. These services process technical data (such as your IP address) to deliver the site, under their own privacy policies.',
        ],
      },
      {
        h: 'How long we keep it',
        p: ['We keep member details while you are part of the club. If you leave or ask us to remove your details, we delete them from our sheet within 30 days. WhatsApp chat history is controlled by WhatsApp and the participants of each chat.'],
      },
      {
        h: 'Your choices and rights',
        list: [
          'Ask what information we hold about you.',
          'Ask us to correct or update it.',
          'Ask us to delete it, or remove you from club groups.',
          'Withdraw your consent to being contacted at any time.',
        ],
        p: [`To do any of this, email ${EMAIL} or message ${PHONE} on WhatsApp. We aim to reply within 7 days. We handle personal data in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.`],
      },
      {
        h: 'Children',
        p: ['Club rides are for adult riders with a valid driving licence. We do not knowingly collect information from anyone under 18. If you believe a minor has sent us their details, contact us and we will delete them.'],
      },
      {
        h: 'Changes to this policy',
        p: ['If we change how we use your information, we will update this page and the date at the top.'],
      },
      {
        h: 'Contact',
        p: [`${CLUB}, Raipur, Chhattisgarh. Email: ${EMAIL} · WhatsApp: ${PHONE}`],
      },
    ],
  },

  terms: {
    title: 'Terms & Conditions',
    updated: '18 October 2026',
    intro: `These terms apply to your use of ${SITE} and to joining rides and events organised by ${CLUB}. By using the site, submitting the Join form or taking part in a club ride, you agree to them.`,
    sections: [
      {
        h: 'About the club',
        p: ['36RC is a non-commercial community of motorcycle riders. Organisers and ride leads are volunteers. Joining the club is free; ride costs such as fuel, food and stay are shared by the riders who take part.'],
      },
      {
        h: 'Eligibility',
        list: [
          'You must be at least 18 years old.',
          'You must hold a valid driving licence for your motorcycle.',
          'Your motorcycle must be road-worthy, with valid registration, insurance and pollution certificate.',
        ],
      },
      {
        h: 'Riding gear and safety rules',
        list: [
          'A full-face helmet, riding jacket, gloves and proper footwear are compulsory on every ride.',
          'Attend the pre-ride briefing and follow the lead and sweep riders.',
          'Obey traffic laws and speed limits at all times. Stunts and racing on public roads are not allowed.',
          'No alcohol or intoxicating substances before or during a ride.',
          'Organisers may refuse or remove a rider whose bike, gear or behaviour puts themselves or others at risk.',
        ],
      },
      {
        h: 'Risk and responsibility',
        p: [
          'Motorcycling carries real risk of injury, death and damage to property. You take part in club rides voluntarily and at your own risk, and you are responsible for your own safety, your motorcycle and your belongings.',
          'To the extent permitted by law, the club, its organisers and volunteers are not liable for any injury, loss, damage, theft, breakdown, fine or medical cost arising from your participation in a ride or event.',
          'You are responsible for having adequate personal accident and vehicle insurance.',
        ],
      },
      {
        h: 'Rides, costs and changes',
        p: ['Ride dates, routes, stays and costs shared on the website or WhatsApp are plans and may change because of weather, road conditions, permissions or safety. Organisers may postpone or cancel a ride. Any advance paid towards shared costs (such as stay bookings) is refundable only to the extent the booking itself can be refunded.'],
      },
      {
        h: 'Photos and videos',
        p: [`Photos and videos are taken at club rides and events and may be shared on this website and the club\'s social media. If you would rather not appear, tell an organiser or email ${EMAIL} and we will remove or avoid using images of you.`],
      },
      {
        h: 'Use of this website',
        list: [
          'Do not submit false information or other people\'s details through the Join form.',
          'Do not try to disrupt, hack or misuse the site.',
          'Content on this site (text, logo, photos) belongs to the club or its respective owners and may not be reused commercially without permission.',
        ],
      },
      {
        h: 'Governing law',
        p: ['These terms are governed by the laws of India. Any dispute is subject to the jurisdiction of the courts at Raipur, Chhattisgarh.'],
      },
      {
        h: 'Contact',
        p: [`Questions about these terms: ${EMAIL} · WhatsApp ${PHONE}`],
      },
    ],
  },

  cookies: {
    title: 'Cookie Policy',
    updated: '18 October 2026',
    intro: `This page explains how ${SITE} uses cookies and similar browser storage. Short version: we do not use advertising or tracking cookies.`,
    sections: [
      {
        h: 'What we store in your browser',
        table: [
          ['Name', 'Type', 'Purpose', 'Duration'],
          ['36rc-lang', 'Local storage', 'Remembers whether you chose English or Hinglish.', 'Until you clear your browser data'],
        ],
        p: ['This is strictly necessary for the language toggle to work and does not identify you.'],
      },
      {
        h: 'What we do not use',
        list: [
          'No analytics or tracking cookies.',
          'No advertising or social media pixels.',
          'No cross-site profiling.',
        ],
      },
      {
        h: 'Third-party services',
        p: [
          'Fonts are loaded from Google Fonts, which receives your IP address to deliver the font files. The site is hosted by Vercel, which keeps standard server logs.',
          'When you tap a WhatsApp or Instagram link, you leave our site and those services apply their own cookies and policies.',
        ],
      },
      {
        h: 'Managing storage',
        p: ['You can clear cookies and local storage at any time in your browser settings. If you do, the site will simply go back to its default language.'],
      },
      {
        h: 'Changes',
        p: ['If we ever add analytics or other cookies, we will update this page and ask for your consent where required.'],
      },
    ],
  },
}
