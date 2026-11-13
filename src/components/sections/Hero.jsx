import { useState } from 'react'
import { ArrowRight, Clock, MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { siteConfig } from '../../data/siteConfig'
import { services } from '../../data/services'

// Dots on the car. x/y are percentages of the car image. `service` links to data/services.js.
const hotspots = [
  { service: 'ceramic', label: 'Roof and bonnet', x: 52.9, y: 8 },
  { service: 'interior', label: 'Cabin', x: 43.1, y: 17 },
  { service: 'correction', label: 'Paintwork', x: 81.4, y: 30.5 },
  { service: 'wheels', label: 'Wheels', x: 75.7, y: 51 },
]

export default function Hero() {
  const [active, setActive] = useState('ceramic')
  const current = services.find((s) => s.id === active)

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pb-28 pt-28 sm:pt-32">
      {/* Studio backdrop: ember glow behind the car, fine diagonal lines, dark floor */}
      <div className="absolute inset-0" aria-hidden="true"
        style={{ background: 'radial-gradient(60% 55% at 74% 52%, rgba(242,106,33,.22), transparent 70%), radial-gradient(90% 80% at 50% 0%, #1c1c1d, #0a0a0a 70%)' }} />
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink to-transparent" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
        <div>
          <p className="rise mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur" style={{ animationDelay: '0.1s' }}>
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Open {siteConfig.hours}
          </p>

          <h1 className="sheen font-display text-[clamp(3.25rem,8vw,6.75rem)] font-bold leading-[0.9] tracking-tight">
            Showroom
            <br />
            gloss, again.
          </h1>

          <p className="rise mt-7 max-w-md text-lg leading-relaxed text-white/75" style={{ animationDelay: '0.9s' }}>
            We restore, correct and protect your paint by hand. Pick a package,
            choose a time, and drop the car off looking tired.
          </p>

          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '1.1s' }}>
            <Button href="#booking">
              Book an appointment <ArrowRight size={18} />
            </Button>
            <Button variant="ghost" external
              href={buildWhatsAppLink(`Hi ${siteConfig.name}, I’d like a quote for my car.`)}>
              <MessageCircle size={18} /> Get a quote on WhatsApp
            </Button>
          </div>
        </div>

        {/* Interactive car: tap a dot to see what we do to that part of the car */}
        <div className="drive">
          <div className="relative">
            <img src="/images/hero-car.svg" alt="Black sedan on a studio floor" className="w-full select-none" draggable={false} />
            {hotspots.map((h) => {
              const isActive = active === h.service
              return (
                <button key={h.service} type="button"
                  onClick={() => setActive(h.service)}
                  aria-pressed={isActive}
                  aria-label={`${h.label}: ${services.find((s) => s.id === h.service).title}`}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
                  {!isActive && <span className="absolute h-5 w-5 animate-ping rounded-full bg-ember opacity-60 motion-reduce:animate-none" />}
                  <span className={`relative rounded-full transition-all duration-200 ${isActive ? 'h-5 w-5 bg-white ring-4 ring-ember' : 'h-3.5 w-3.5 bg-ember ring-4 ring-ember/30'}`} />
                </button>
              )
            })}
          </div>

          <div aria-live="polite" className="mt-4 card p-5 backdrop-blur-md sm:p-6">
            <h2 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">{current.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-steel">{current.description}</p>
            <div className="mt-4 flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2 text-steel"><Clock size={14} /> {current.duration}</span>
              <a href="#packages" className="font-bold text-ember hover:text-ember-soft">See packages</a>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-steel">Tap the glowing dots to see what we do to each part of the car.</p>
        </div>
      </div>
    </section>
  )
}