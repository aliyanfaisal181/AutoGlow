import { MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { siteConfig } from '../../data/siteConfig'

// Floating button, visible on every page position.
export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppLink(`Hi ${siteConfig.name}, I'd like to ask about a detail.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/50 transition-transform hover:scale-105"
    >
      <MessageCircle size={28} />
    </a>
  )
}
