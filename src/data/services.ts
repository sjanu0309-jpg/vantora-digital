export type ServiceIconName = 'meta' | 'social' | 'video' | 'content' | 'avatar' | 'leads';

export interface Service {
  slug: string;
  icon: ServiceIconName;
  name: string;
  short: string;
  summary: string;
  heroLine: string;
  intro: string;
  deliverables: string[];
  benefits: { title: string; text: string }[];
  approach: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  portfolioCategory: string;
}

export const services: Service[] = [
  {
    slug: 'meta-advertising',
    icon: 'meta',
    name: 'Meta Advertising',
    short: 'Facebook & Instagram ads that reach the right people and bring real enquiries.',
    summary:
      'Facebook and Instagram advertising, campaign strategy, audience targeting, optimisation and paid lead generation.',
    heroLine: 'Reach the right customers on Facebook and Instagram.',
    intro:
      'Meta advertising lets your business appear in front of the people most likely to buy — by location, interests, behaviour and intent. We plan, build and manage Facebook and Instagram campaigns around one goal: turning ad spend into genuine business conversations.',
    deliverables: [
      'Campaign strategy and objective planning',
      'Audience research and targeting setup',
      'Ad creatives and ad copy (static, carousel and video)',
      'Meta Pixel and conversion event setup guidance',
      'A/B testing of audiences, creatives and offers',
      'Regular performance reporting and optimisation',
    ],
    benefits: [
      { title: 'Precise targeting', text: 'Spend your budget on the audiences that matter to your business.' },
      { title: 'Measurable results', text: 'Track reach, clicks, leads and cost per result in clear reports.' },
      { title: 'Faster enquiries', text: 'Lead and message campaigns bring prospects straight to you.' },
      { title: 'Continuous improvement', text: 'Ongoing testing keeps campaigns improving over time.' },
    ],
    approach: [
      { title: 'Audit & goals', text: 'Review your account, offer and goals to set clear campaign objectives.' },
      { title: 'Build & target', text: 'Structure campaigns, define audiences and prepare scroll-stopping creatives.' },
      { title: 'Launch & monitor', text: 'Go live with tracking in place and monitor early signals closely.' },
      { title: 'Optimise & scale', text: 'Shift budget to what works and scale winning campaigns responsibly.' },
    ],
    faqs: [
      { q: 'What budget do I need to start Meta advertising?', a: 'It depends on your goals, location and industry. We recommend a budget during your free consultation, so you can start small, learn quickly and scale what works.' },
      { q: 'Is the ad budget included in your fee?', a: 'No. Ad spend is paid directly to Meta from your own ad account. Our fee covers strategy, creative, setup and management.' },
      { q: 'How soon will I see results?', a: 'Campaigns usually begin delivering within days, but the first few weeks are a learning phase. We share honest progress updates — we never guarantee specific results.' },
    ],
    portfolioCategory: 'Meta Advertising',
  },
  {
    slug: 'social-media-management',
    icon: 'social',
    name: 'Social Media Management',
    short: 'Consistent, on-brand content and engagement that grows your audience.',
    summary:
      'Social strategy, content calendars, account management, brand positioning and audience engagement.',
    heroLine: 'Show up consistently. Build a brand people trust.',
    intro:
      'Your social media is often the first place customers check before they contact you. We manage your Facebook, Instagram and LinkedIn presence with a clear strategy, a planned content calendar and on-brand creatives — so your business looks professional and stays top of mind.',
    deliverables: [
      'Social media strategy and brand positioning',
      'Monthly content calendar',
      'Post and story designs',
      'Captions, hashtags and posting schedule',
      'Profile optimisation (bio, highlights, cover)',
      'Monthly insights report',
    ],
    benefits: [
      { title: 'Consistent presence', text: 'A steady posting rhythm without the daily stress.' },
      { title: 'Professional brand image', text: 'Cohesive visuals that build credibility.' },
      { title: 'Stronger engagement', text: 'Content designed for your audience and their questions.' },
      { title: 'Time saved', text: 'Focus on your business while we handle the planning and posting.' },
    ],
    approach: [
      { title: 'Brand discovery', text: 'Understand your audience, tone of voice and competitors.' },
      { title: 'Content plan', text: 'Create content pillars and a monthly calendar for approval.' },
      { title: 'Design & publish', text: 'Produce creatives and captions, then schedule and publish.' },
      { title: 'Review & refine', text: 'Analyse insights monthly and refine what we post.' },
    ],
    faqs: [
      { q: 'Which platforms do you manage?', a: 'Primarily Facebook, Instagram and LinkedIn. We recommend platforms based on where your customers spend their time.' },
      { q: 'Will I approve content before it goes live?', a: 'Yes. You review the monthly calendar and creatives before anything is published.' },
      { q: 'How many posts per month?', a: 'This depends on the plan we agree together. We focus on quality and consistency rather than volume.' },
    ],
    portfolioCategory: 'Social Media Campaigns',
  },
  {
    slug: 'video-creative-production',
    icon: 'video',
    name: 'Video & Creative Production',
    short: 'Promotional videos, reels and ad creatives that stop the scroll.',
    summary:
      'Promotional videos, reels, ad creatives, AI-assisted video production and visual storytelling.',
    heroLine: 'Visual stories that make people stop, watch and act.',
    intro:
      'Video and strong visuals are the fastest way to capture attention online. We create promotional videos, short-form reels and ad creatives — including AI-assisted production — that explain your offer clearly and make your brand memorable.',
    deliverables: [
      'Promotional and brand videos',
      'Instagram Reels and short-form videos',
      'Static and motion ad creatives',
      'AI-assisted video and visual production',
      'Script writing and storyboarding',
      'Editing, captions and platform-ready formats',
    ],
    benefits: [
      { title: 'Higher attention', text: 'Motion and storytelling stand out in busy feeds.' },
      { title: 'Clearer message', text: 'Explain your product or service in seconds.' },
      { title: 'Better ad performance', text: 'Fresh creatives help prevent ad fatigue.' },
      { title: 'Reusable assets', text: 'One shoot, many formats for every platform.' },
    ],
    approach: [
      { title: 'Concept', text: 'Define the message, audience and creative idea.' },
      { title: 'Script & plan', text: 'Write the script and plan visuals, shots or AI assets.' },
      { title: 'Produce', text: 'Shoot, generate and edit with your brand style.' },
      { title: 'Deliver', text: 'Export in the right sizes for reels, stories, feeds and ads.' },
    ],
    faqs: [
      { q: 'Do you shoot on location?', a: 'We can plan on-location shoots depending on your location and project scope. We also produce videos using your existing footage, product images and AI-assisted visuals.' },
      { q: 'What is AI-assisted video production?', a: 'We use AI tools to support visuals, voice-overs and editing — combined with human creative direction — to produce quality content efficiently.' },
      { q: 'How many revisions are included?', a: 'Revision rounds are agreed upfront for each project so expectations are clear.' },
    ],
    portfolioCategory: 'Video Production',
  },
  {
    slug: 'content-copywriting',
    icon: 'content',
    name: 'Content & Copywriting',
    short: 'Persuasive words for ads, captions, websites and brand messaging.',
    summary:
      'Marketing copy, advertising headlines, captions, brand messaging and persuasive content.',
    heroLine: 'Words that connect, persuade and convert.',
    intro:
      'Great design gets attention — great copy gets action. We write clear, persuasive content for your ads, social posts, landing pages and brand messaging, written for your customers and focused on the next step you want them to take.',
    deliverables: [
      'Brand messaging and tone of voice',
      'Ad headlines and primary text',
      'Social media captions',
      'Landing page and website copy',
      'Offer and call-to-action writing',
      'Content ideas and hooks for reels',
    ],
    benefits: [
      { title: 'Clear communication', text: 'Customers instantly understand what you offer.' },
      { title: 'More conversions', text: 'Copy built around benefits and strong calls to action.' },
      { title: 'Consistent voice', text: 'One recognisable brand voice across every channel.' },
      { title: 'Audience-first', text: 'Language that speaks to real customer needs.' },
    ],
    approach: [
      { title: 'Research', text: 'Learn your product, customers and competitors.' },
      { title: 'Message map', text: 'Define key messages, benefits and proof points.' },
      { title: 'Write', text: 'Draft copy tailored to each platform and format.' },
      { title: 'Refine', text: 'Polish with your feedback and test variations in ads.' },
    ],
    faqs: [
      { q: 'Do you write in languages other than English?', a: 'Please mention your preferred language in the enquiry form and we will confirm what we can support.' },
      { q: 'Can you rewrite my existing website content?', a: 'Yes. We can review and improve existing copy so it is clearer and more persuasive.' },
      { q: 'Do I own the copy you write?', a: 'Yes, once the project is complete and paid for, the final approved copy is yours to use.' },
    ],
    portfolioCategory: 'Creative Design',
  },
  {
    slug: 'customer-avatar-strategy',
    icon: 'avatar',
    name: 'Customer Avatar & Strategy',
    short: 'Know your audience deeply and plan marketing that actually fits them.',
    summary:
      'Customer research, audience profiling, personas, competitor analysis and campaign strategy.',
    heroLine: 'Know exactly who you are talking to — and how to win them.',
    intro:
      'Every successful campaign starts with understanding the customer. We research your market, define detailed customer avatars and analyse competitors to build a marketing strategy that targets the right people with the right message.',
    deliverables: [
      'Customer research and audience profiling',
      'Detailed customer avatars / personas',
      'Competitor analysis',
      'Positioning and unique selling points',
      'Channel and campaign strategy',
      'Marketing roadmap with priorities',
    ],
    benefits: [
      { title: 'Less wasted spend', text: 'Target the people most likely to buy.' },
      { title: 'Sharper messaging', text: 'Speak directly to real customer problems.' },
      { title: 'Competitive edge', text: 'Find gaps your competitors are missing.' },
      { title: 'Clear direction', text: 'A practical plan your whole team can follow.' },
    ],
    approach: [
      { title: 'Discover', text: 'Workshops and questions about your business and customers.' },
      { title: 'Research', text: 'Market, audience and competitor analysis.' },
      { title: 'Define', text: 'Build customer avatars and positioning.' },
      { title: 'Plan', text: 'Turn insights into a step-by-step marketing strategy.' },
    ],
    faqs: [
      { q: 'What is a customer avatar?', a: 'A customer avatar is a detailed profile of your ideal customer — their needs, goals, objections and buying behaviour — used to guide your marketing.' },
      { q: 'Is strategy a one-time project?', a: 'It can be. Many clients start with a strategy project and then continue with execution services.' },
      { q: 'Do I need strategy before running ads?', a: 'It is strongly recommended. A clear strategy makes every rupee of ad spend work harder.' },
    ],
    portfolioCategory: 'Brand Identity',
  },
  {
    slug: 'lead-generation-landing-pages',
    icon: 'leads',
    name: 'Lead Generation & Landing Pages',
    short: 'Conversion-focused funnels that turn visitors into quality enquiries.',
    summary:
      'Lead campaigns, conversion-focused landing pages, enquiry funnels and campaign optimisation.',
    heroLine: 'Turn attention into quality enquiries.',
    intro:
      'Traffic alone does not grow a business — enquiries do. We build lead generation campaigns and conversion-focused landing pages that guide visitors to take action, with forms and follow-up flows that make it easy for prospects to reach you.',
    deliverables: [
      'Lead generation campaign setup',
      'Conversion-focused landing page design',
      'Enquiry forms and lead capture',
      'Thank-you pages and WhatsApp follow-up flows',
      'Lead tracking in Google Sheets or CRM',
      'Funnel analysis and optimisation',
    ],
    benefits: [
      { title: 'More quality leads', text: 'Focused pages that convert better than generic websites.' },
      { title: 'Organised follow-up', text: 'Every enquiry captured and tracked in one place.' },
      { title: 'Lower cost per lead', text: 'Testing and optimisation improve efficiency over time.' },
      { title: 'Faster response', text: 'Instant notifications and WhatsApp follow-up options.' },
    ],
    approach: [
      { title: 'Offer', text: 'Define a compelling offer and lead magnet.' },
      { title: 'Build', text: 'Design the landing page, form and tracking.' },
      { title: 'Drive traffic', text: 'Launch targeted campaigns to the page.' },
      { title: 'Optimise', text: 'Test headlines, forms and audiences to improve results.' },
    ],
    faqs: [
      { q: 'Where will my leads be stored?', a: 'We can send leads to Google Sheets, email or your preferred CRM, depending on your setup.' },
      { q: 'Do you build the landing pages?', a: 'Yes. We design and build fast, mobile-friendly landing pages focused on conversion.' },
      { q: 'Can you guarantee a number of leads?', a: 'No honest agency can guarantee numbers. We commit to a clear process, transparent reporting and continuous optimisation.' },
    ],
    portfolioCategory: 'Landing Pages',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
