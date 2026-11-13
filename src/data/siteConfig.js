// Single source of truth for business details.
// Change these once and the whole site updates.
export const siteConfig = {
  name: 'AutoGlow',
  tagline: 'Premium car detailing',
  // International format, digits only (no +, spaces or dashes).
  // Example: 15551234567 -> +1 555 123 4567
  whatsappNumber: '15551234567',
  phoneDisplay: '+1 555 123 4567',
  email: 'hello@autoglow.example',
  address: '12 Garage Row, Your City',
  hours: 'Mon–Sat, 8:00–18:00',
}

// Order here is the order in the navbar. Each id must match a section id.
export const navLinks = [
  { id: 'services', label: 'Services' },
  { id: 'packages', label: 'Packages' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]
