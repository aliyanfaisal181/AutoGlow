import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { navLinks, siteConfig } from '../../data/siteConfig'

export default function Footer() {
  return (
    <footer className="border-t border-charcoal-line bg-ink">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-bold">
            Auto<span className="text-ember">Glow</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-steel">
            Detailing, paint correction and ceramic coating for cars that
            deserve better than a drive-through wash.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-3 text-sm text-steel">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="transition-colors hover:text-ember">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-3 text-sm text-steel">
          <li className="flex items-center gap-3"><MapPin size={16} className="text-ember" />{siteConfig.address}</li>
          <li className="flex items-center gap-3">
            <Phone size={16} className="text-ember" />
            <a href={`tel:+${siteConfig.whatsappNumber}`} className="hover:text-white">{siteConfig.phoneDisplay}</a>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={16} className="text-ember" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a>
          </li>
          <li className="flex items-center gap-3"><Clock size={16} className="text-ember" />{siteConfig.hours}</li>
        </ul>
      </div>
      <div className="border-t border-charcoal-line py-5 text-center text-xs text-steel">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  )
}
