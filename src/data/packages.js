// Edit prices and features here. Prices are placeholders.
export const currency = '$'

export const packages = [
  {
    id: 'essential',
    name: 'Essential',
    price: 89,
    summary: 'A thorough clean, inside and out.',
    duration: 'About 3 hours',
    features: [
      'Hand wash and dry',
      'Wheel and tyre clean',
      'Interior vacuum and wipe-down',
      'Window cleaning, inside and out',
      'Spray sealant for 4–6 weeks of protection',
    ],
    featured: false,
  },
  {
    id: 'signature',
    name: 'Signature',
    price: 189,
    summary: 'Our most booked detail. Deep clean plus real protection.',
    duration: 'About 6 hours',
    features: [
      'Everything in Essential',
      'Clay bar and iron fallout removal',
      'Single-stage polish for gloss',
      'Interior steam clean and leather care',
      'Paint sealant for 6 months of protection',
    ],
    featured: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 599,
    summary: 'Full correction and a ceramic coating that lasts.',
    duration: '2 days',
    features: [
      'Everything in Signature',
      'Multi-stage paint correction',
      'Ceramic coating, 2-year rated',
      'Headlight restoration',
      'Engine bay clean and dress',
    ],
    featured: false,
  },
]
