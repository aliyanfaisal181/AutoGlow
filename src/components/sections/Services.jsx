import { Droplets, Armchair, Sparkles, ShieldCheck, Lightbulb, Disc3, Clock } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'
import Reveal from '../ui/Reveal'
import { services } from '../../data/services'

const icons = { Droplets, Armchair, Sparkles, ShieldCheck, Lightbulb, Disc3 }
// Cards at these positions are double width on large screens, giving a bento layout
const wide = new Set([0, 3, 5])

export default function Services() {
  return (
    <section id="services" className="section-pad bg-ink bg-glow">
      <div className="container-page">
        <SectionHeading
          title="What we do to your car"
          description="Every job is done by hand, with products chosen for your paint rather than for speed."
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, icon, title, description, duration }, i) => {
            const Icon = icons[icon]
            const big = wide.has(i)
            return (
              <li key={id} className={big ? 'lg:col-span-2' : ''}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <SpotlightCard className="flex h-full flex-col p-7 sm:p-9">
                    {Icon && <Icon size={170} strokeWidth={1} aria-hidden="true"
                      className="pointer-events-none absolute -right-8 -top-8 text-white opacity-[0.04]" />}
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-ember-soft to-ember text-ink">
                      {Icon && <Icon size={24} />}
                    </span>
                    <h3 className={`mt-7 font-display font-semibold leading-tight ${big ? 'text-4xl' : 'text-3xl'}`}>{title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-steel">{description}</p>
                    <p className="mt-auto flex items-center gap-2 pt-8 text-sm text-steel">
                      <Clock size={14} /> {duration}
                    </p>
                  </SpotlightCard>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}