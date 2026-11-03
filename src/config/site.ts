/**
 * Central business configuration.
 * Edit this file to update contact details, social links and integrations.
 * Only VERIFIED details should be placed here.
 */
export const site = {
  name: 'VANTORA DIGITAL',
  shortName: 'Vantora Digital',
  tagline: 'DIGITAL LIFE GROWTH',
  domain: 'https://vantoradigital.info',
  description:
    'VANTORA DIGITAL is a creative digital marketing agency helping businesses grow through Meta advertising, social media management, creative production, content and lead generation.',
  email: 'vantoradigital197@gmail.com',
  phoneDisplay: '+91 80729 44769',
  phoneE164: '+918072944769',
  whatsappNumber: '918072944769',
  whatsappMessage: "Hi VANTORA DIGITAL, I'd like a free consultation for my business.",
  country: 'India',
  social: {
    facebook: 'https://www.facebook.com/share/19opepAbXi/?mibextid=wwXIfr',
    googleBusiness: 'https://share.google/d2l6oHwE4L45O2fEv',
    /**
     * LinkedIn: no direct page URL was supplied, so this opens a LinkedIn
     * company search for "Vantora Digital". Replace with your page URL,
     * e.g. https://www.linkedin.com/company/your-page/
     */
    linkedin: 'https://www.linkedin.com/search/results/companies/?keywords=Vantora%20Digital',
    /** Add your Instagram profile URL here; it stays hidden while empty. */
    instagram: '',
  },
  /** Google Apps Script Web App URL (set VITE_GOOGLE_SCRIPT_URL in .env). */
  formEndpoint: (import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined) ?? '',
  /** Google Analytics 4 measurement ID, e.g. G-XXXXXXX (set VITE_GA_ID). */
  gaId: (import.meta.env.VITE_GA_ID as string | undefined) ?? '',
  /** Optional booking calendar link (Calendly / Google Calendar appointment page). */
  bookingUrl: (import.meta.env.VITE_BOOKING_URL as string | undefined) ?? '',
};

export const whatsappLink = (msg = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`;

export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

/**
 * Founder profile — fill in ONLY verified, approved details.
 * The founder section on the About page stays hidden while `name` is empty.
 */
export const founder = {
  name: '',
  designation: '',
  photo: '', // e.g. 'images/founder.webp' placed in /public/images
  bio: '',
};
