import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'

// A real sequence, so numbering is meaningful here.
const steps = [
  { title: 'Choose and book', text: 'Pick a package, a day and a drop-off time. We confirm your slot on WhatsApp.' },
  { title: 'Drop off your car', text: 'We walk around it with you, note any existing marks and agree the work before we start.' },
  { title: 'Collect and enjoy', text: 'We go through the finished car together. You pay when you collect it.' },
]

export default function Process() {
  return (
    <section id="process" className="section-pad bg-ink bg-glow">
      <div className="container-page">
        <SectionHeading title="How it works" description="Three steps, and no waiting around for a quote." />
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 120} className="h-full">
                <SpotlightCard className="h-full p-8">
                  <span className="outline-text font-display text-8xl font-bold leading-none">{i + 1}</span>
                  <h3 className="mt-6 font-display text-3xl font-semibold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-steel">{s.text}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ol>
        <Button href="#booking" className="mt-12">Book your slot</Button>
      </div>
    </section>
  )
}