/**
 * Testimonials — add ONLY genuine, approved customer reviews.
 * Each review should have the customer's permission. `source` links to the
 * original review (Google Business Profile, Facebook, LinkedIn or Instagram).
 * Rating is optional — include it only when it is verified from the source.
 *
 * Example:
 * {
 *   name: 'Customer Name',
 *   business: 'Business Name, City',
 *   photo: 'images/testimonials/customer.webp',
 *   text: 'Their genuine review text…',
 *   rating: 5,
 *   source: { label: 'Google', url: 'https://…' },
 * }
 */
export interface Testimonial {
  name: string;
  business?: string;
  photo?: string;
  text: string;
  rating?: number;
  source?: { label: string; url: string };
}

export const testimonials: Testimonial[] = [];
