import { useState } from 'react'
import { Plus } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { faqs } from '../../data/faqs'

export default function Faq() {
  const [open, setOpen] = useState(0) // index of the open answer, -1 = all closed

  return (
    <section id="faq" className="section-pad bg-charcoal bg-glow">
      <div className="container-page max-w-3xl">
        <SectionHeading title="Questions we get asked" />
        <div className="border-t border-charcoal-line">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className="border-b border-charcoal-line">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl font-semibold sm:text-3xl"
                  >
                    {f.q}
                    <Plus size={26} className={`shrink-0 text-ember transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-prose pb-6 leading-relaxed text-steel">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}