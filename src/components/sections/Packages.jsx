import { Check, MessageCircle } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { packages, currency } from '../../data/packages'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { siteConfig } from '../../data/siteConfig'

export default function Packages({ onSelect }) {
  return (
    <section id="packages" className="section-pad bg-charcoal bg-glow">
      <div className="container-page">
        <SectionHeading align="center" title="Three packages, no surprises"
          description="Prices are for a standard car. Larger vehicles or heavy soiling are quoted before we start." />

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 100} className="h-full">
              {/* Featured card gets a glowing gradient border; the others use the standard card */}
              <div className={`relative h-full rounded-3xl ${pkg.featured
                ? 'bg-gradient-to-b from-ember via-ember/40 to-ember/0 p-px shadow-[0_0_90px_-25px_rgba(242,106,33,.65)] lg:-my-4'
                : ''}`}>
                {pkg.featured && (
                  <span className="absolute -top-3.5 left-8 z-10 rounded-full bg-gradient-to-b from-ember-soft to-ember px-4 py-1 text-xs font-bold text-ink">
                    Most booked
                  </span>
                )}
                <article className={`flex h-full flex-col rounded-3xl p-8 ${pkg.featured ? 'bg-[#131313]' : 'card'}`}>
                  <h3 className="font-display text-4xl font-semibold">{pkg.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{pkg.summary}</p>

                  <p className="mt-7 flex items-baseline gap-2">
                    <span className={`font-display text-7xl font-bold leading-none ${pkg.featured ? 'text-gradient' : ''}`}>
                      {currency}{pkg.price}
                    </span>
                    <span className="text-sm text-steel">{pkg.duration}</span>
                  </p>

                  <ul className="mt-8 flex-1 space-y-3.5 border-t border-white/10 pt-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm leading-relaxed text-white/85">
                        <Check size={18} className="mt-0.5 shrink-0 text-ember" />{f}
                      </li>
                    ))}
                  </ul>

                  <Button variant={pkg.featured ? 'primary' : 'ghost'} href="#booking"
                    onClick={() => onSelect(pkg.id)} className="mt-10">
                    Book {pkg.name}
                  </Button>
                  <a href={buildWhatsAppLink(`Hi ${siteConfig.name}, I’m interested in the ${pkg.name} package. Is it available this week?`)}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 text-sm text-steel transition-colors hover:text-ember">
                    <MessageCircle size={16} /> Ask about {pkg.name} on WhatsApp
                  </a>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}