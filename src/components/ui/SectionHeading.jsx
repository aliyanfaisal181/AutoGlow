import Reveal from './Reveal'

export default function SectionHeading({ title, description, align = 'left' }) {
  const center = align === 'center'
  return (
    <Reveal className={`mb-14 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <span className={`mb-5 block h-1 w-12 rounded-full bg-gradient-to-r from-ember to-ember/0 ${center ? 'mx-auto' : ''}`} aria-hidden="true" />
      <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">{title}</h2>
      {description && <p className="mt-5 text-base leading-relaxed text-steel sm:text-lg">{description}</p>}
    </Reveal>
  )
}