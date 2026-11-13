import { siteConfig } from '../data/siteConfig'

// Builds a wa.me link that opens WhatsApp with a pre-filled message.
export function buildWhatsAppLink(message = '') {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${siteConfig.whatsappNumber}${text}`
}
