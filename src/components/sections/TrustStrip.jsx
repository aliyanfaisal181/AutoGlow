import { Clock, MapPin, MessageCircle, Tag } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import { packages, currency } from '../../data/packages'

// Floats over the bottom edge of the hero. Everything is read from your own data files.
export default function TrustStrip() {
  const lowest = Math.min(...packages.map((p) => p.price))
  const items = [
    { Icon: Tag, title: `From ${currency}${lowest}`, text: `${packages.length} fixed-price packages` },
    { Icon: MessageCircle, title: 'Free quotes', text: 'Send photos on WhatsApp' },
    { Icon: Clock, title: 'Open', text: siteConfig.hours },
    { Icon: MapPin, title: 'Find us', text: siteConfig.address },
  ]
  return (
    <section aria-label="At a glance" className="relative z-10 -mt-14">
      <div className="container-page">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] lg:grid-cols-4">
          {items.map(({ Icon, title, text }) => (
            <li key={title} className="flex items-start gap-4 bg-[#121212]/95 p-5 backdrop-blur sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-ember-soft to-ember text-ink">
                <Icon size={20} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-2xl font-semibold leading-none">{title}</p>
                <p className="mt-1.5 text-sm text-steel">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}