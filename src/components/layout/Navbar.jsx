import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { navLinks, siteConfig } from '../../data/siteConfig'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the link of the section currently in view
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Mobile menu: lock page scroll, close on Escape
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open])

  const linkClass = (id) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === id ? 'bg-white/10 text-white' : 'text-steel hover:text-white'}`

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <nav aria-label="Main"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-4 transition-all duration-300 sm:h-16 sm:px-6 ${
          scrolled || open
            ? 'border-white/10 bg-ink/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,.9)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}>
        <a href="#top" className="font-display text-3xl font-bold tracking-tight">
          Auto<span className="text-gradient">Glow</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}><a href={`#${l.id}`} className={linkClass(l.id)}>{l.label}</a></li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#booking" className="px-6 py-2.5">Book now</Button>
        </div>

        <button type="button" onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu"
          className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 font-display text-4xl font-semibold">
              {l.label}
            </a>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <Button href="#booking" onClick={() => setOpen(false)}>Book now</Button>
            <Button variant="ghost" external
              href={buildWhatsAppLink(`Hi ${siteConfig.name}, I’d like to ask about a detail.`)}>
              <MessageCircle size={18} /> WhatsApp us
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}