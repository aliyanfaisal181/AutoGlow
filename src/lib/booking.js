import { siteConfig } from '../data/siteConfig'
import { currency } from '../data/packages'
import { buildWhatsAppLink } from './whatsapp'

// Edit these to match your real working hours.
export const TIME_SLOTS = ['09:00', '11:00', '13:00', '15:00']
const DAYS_TO_SHOW = 12

// "2026-11-17" style key in the visitor's local time
export function toDateKey(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// Next bookable days: starts tomorrow, skips Sundays (closed)
export function getAvailableDates() {
  const out = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  while (out.length < DAYS_TO_SHOW) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0) out.push(new Date(d))
  }
  return out
}

export function formatTime(t) {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function formatDateLong(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(y, m - 1, d))
}

// Returns an object of error messages. Empty object = valid.
export function validateBooking(f) {
  const e = {}
  if (!f.packageId) e.packageId = 'Choose a package.'
  if (!f.date) e.date = 'Pick a date.'
  if (!f.time) e.time = 'Pick a time.'
  if (f.name.trim().length < 2 || f.name.length > 100) e.name = 'Enter your full name.'
  const digits = f.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15 || f.phone.length > 30) e.phone = 'Enter a valid phone number.'
  if (f.email && (f.email.length > 200 || !/^\S+@\S+\.\S+$/.test(f.email))) e.email = 'Enter a valid email address.'
  if (f.car.trim().length < 2 || f.car.length > 100) e.car = 'Enter your car’s make and model.'
  return e
}

export function buildBookingLink(f, pkg, ref) {
  const lines = [
    `Hi ${siteConfig.name}, I’d like to book an appointment.`,
    '',
    ref ? `Reference: ${ref}` : null,
    `Package: ${pkg.name} (${currency}${pkg.price})`,
    `Date: ${formatDateLong(f.date)}`,
    `Time: ${formatTime(f.time)}`,
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    f.email ? `Email: ${f.email.trim()}` : null,
    `Car: ${f.car.trim()}`,
    f.notes.trim() ? `Notes: ${f.notes.trim()}` : null,
  ].filter((l) => l !== null)
  return buildWhatsAppLink(lines.join('\n'))
}