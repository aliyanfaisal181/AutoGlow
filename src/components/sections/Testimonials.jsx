import { Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { testimonials } from '../../data/testimonials'

function Stars({ count }) {
  return (
    <div className="flex gap-1 text-ember" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
    </div>
  )
}

export default function Testimonials() {
  const [featured, ...rest] = testimonials
  return (
    <section id="reviews" className="section-pad bg-ink bg-glow">
      <div className="container-page">
        <SectionHeading title="What customers say" />
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <figure className="flex flex-col justify-between rounded-3xl border border-ember/60 bg-gradient-to-b from-ember/15 to-white/[0.02] p-8 shadow-[0_0_80px_-30px_rgba(242,106,33,.6)] sm:p-10">
            <Stars count={featured.rating} />
            <blockquote className="mt-6 font-display text-3xl font-medium leading-tight sm:text-4xl">
              {featured.quote}
            </blockquote>
            <figcaption className="mt-8 text-sm text-steel">
              <span className="font-bold text-white">{featured.name}</span>, {featured.car}
            </figcaption>
          </figure>

          <div className="grid gap-6">
            {rest.map((t) => (
              <figure key={t.id} className="card p-6">
                <Stars count={t.rating} />
                <blockquote className="mt-4 leading-relaxed text-white/85">{t.quote}</blockquote>
                <figcaption className="mt-4 text-sm text-steel">
                  <span className="font-bold text-white">{t.name}</span>, {t.car}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}