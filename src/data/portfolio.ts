/**
 * Portfolio items. All current items are CONCEPT / DEMONSTRATION projects
 * created to show VANTORA DIGITAL's creative direction. Replace or add real
 * client work only with client approval, and add metrics only when verified.
 */
export interface Project {
  slug: string;
  title: string;
  category: string;
  industry: string;
  image: string;
  type: 'Concept project' | 'Client project';
  summary: string;
  objective: string;
  deliverables: string[];
  approach: string;
  /** Only verified metrics. Leave empty for concept work. */
  metrics?: { label: string; value: string }[];
}

export const portfolioCategories = [
  'All',
  'Social Media Campaigns',
  'Meta Advertising',
  'Brand Identity',
  'Creative Design',
  'Video Production',
  'Landing Pages',
  'Industry Campaigns',
];

export const projects: Project[] = [
  {
    slug: 'textile-brand-social-campaign',
    title: 'Textile Brand Social Campaign',
    category: 'Social Media Campaigns',
    industry: 'Textiles & Retail',
    image: 'images/work-textile-campaign.webp',
    type: 'Concept project',
    summary: 'A rich, texture-led Instagram campaign concept for a fabric and saree retailer.',
    objective: 'Showcase new fabric collections and drive showroom visits and WhatsApp enquiries.',
    deliverables: ['Content calendar', 'Carousel & story designs', 'Reels concept', 'Captions'],
    approach: 'Close-up texture photography, warm colour grading and collection-led storytelling with clear calls to action.',
  },
  {
    slug: 'hospital-awareness-campaign',
    title: 'Hospital Awareness Campaign',
    category: 'Meta Advertising',
    industry: 'Healthcare',
    image: 'images/work-hospital-campaign.webp',
    type: 'Concept project',
    summary: 'A trust-first Meta ad concept promoting health check-up packages.',
    objective: 'Increase awareness of preventive health packages and appointment enquiries.',
    deliverables: ['Audience strategy', 'Ad creatives', 'Lead form copy', 'Landing page wireframe'],
    approach: 'Calm, clinical visuals, clear package information and a simple appointment booking journey that respects healthcare advertising policies.',
  },
  {
    slug: 'real-estate-lead-funnel',
    title: 'Real Estate Lead Funnel',
    category: 'Landing Pages',
    industry: 'Real Estate',
    image: 'images/work-realestate-campaign.webp',
    type: 'Concept project',
    summary: 'A landing page and lead campaign concept for a premium residential project.',
    objective: 'Generate qualified site-visit enquiries from home buyers.',
    deliverables: ['Landing page design', 'Lead campaign plan', 'Brochure-style creatives', 'WhatsApp follow-up flow'],
    approach: 'Lifestyle-led visuals, amenity highlights and a short, mobile-first enquiry form connected to Google Sheets.',
  },
  {
    slug: 'restaurant-launch-promo',
    title: 'Restaurant Launch Promo',
    category: 'Video Production',
    industry: 'Restaurants & Hospitality',
    image: 'images/work-restaurant-campaign.webp',
    type: 'Concept project',
    summary: 'A short-form reel and ad creative concept for a burger restaurant launch.',
    objective: 'Build local buzz and footfall for a new outlet launch.',
    deliverables: ['Reel script', 'Food styling direction', 'Short-form edits', 'Local reach ads'],
    approach: 'Fast-paced, appetite-driven video with warm cinematic lighting and a clear launch-offer message.',
  },
  {
    slug: 'meta-ads-creative-system',
    title: 'Meta Ads Creative System',
    category: 'Meta Advertising',
    industry: 'E-commerce',
    image: 'images/meta-ads.webp',
    type: 'Concept project',
    summary: 'A scalable set of sponsored-post templates for Facebook and Instagram.',
    objective: 'Create consistent, testable ad creatives for ongoing campaigns.',
    deliverables: ['Ad templates', 'Video ad frames', 'Copy variations', 'Testing plan'],
    approach: 'Modular templates that make A/B testing of hooks, visuals and offers quick and consistent.',
  },
  {
    slug: 'brand-identity-growth-kit',
    title: 'Brand Identity Growth Kit',
    category: 'Brand Identity',
    industry: 'Industry Campaigns',
    image: 'images/studio-growth.webp',
    type: 'Concept project',
    summary: 'A premium brand presentation and digital identity kit.',
    objective: 'Give a growing business a confident, consistent digital identity.',
    deliverables: ['Brand presentation', 'Social profile kit', 'Colour & type guide', 'Launch posts'],
    approach: 'Dark, cinematic visuals with metallic and electric-blue accents to communicate premium quality.',
  },
  {
    slug: 'video-studio-production',
    title: 'Studio Video Production',
    category: 'Video Production',
    industry: 'Industry Campaigns',
    image: 'images/video-production.webp',
    type: 'Concept project',
    summary: 'A product video and editing workflow concept for brand storytelling.',
    objective: 'Produce professional product videos for social media and ads.',
    deliverables: ['Shot list', 'Product video', 'Reel cut-downs', 'Thumbnail design'],
    approach: 'Controlled studio lighting, clean compositions and platform-specific edits.',
  },
  {
    slug: 'campaign-performance-dashboard',
    title: 'Campaign Reporting Dashboard',
    category: 'Creative Design',
    industry: 'Industry Campaigns',
    image: 'images/campaign-dashboard.webp',
    type: 'Concept project',
    summary: 'A clear reporting dashboard design for tracking leads, reach and conversions.',
    objective: 'Help business owners understand campaign performance at a glance.',
    deliverables: ['Dashboard design', 'KPI definitions', 'Monthly report template'],
    approach: 'Simple visual hierarchy that highlights what matters: enquiries, cost and growth trends. Figures shown are illustrative only.',
  },
  {
    slug: 'targeted-strategy-campaign',
    title: 'Targeted Strategy Campaign',
    category: 'Industry Campaigns',
    industry: 'Manufacturing',
    image: 'images/target-strategy.webp',
    type: 'Concept project',
    summary: 'An audience-first campaign strategy concept for a B2B manufacturer.',
    objective: 'Reach distributors and business buyers with a credible brand message.',
    deliverables: ['Customer avatars', 'Channel strategy', 'Content pillars', 'Ad concepts'],
    approach: 'Research-led targeting combined with educational content that builds trust with B2B buyers.',
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
