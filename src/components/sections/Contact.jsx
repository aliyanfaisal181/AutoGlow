import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Field, { inputClass } from '../ui/Field'
import { siteConfig } from '../../data/siteConfig'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { isSupabaseConfigured } from '../../lib/supabase'
import { createContactMessage } from '../../lib/api'

const empty = { name: '', phone: '', message: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2 || v.name.length > 100) e.name = 'Enter your name.'
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15 || v.phone.length > 30) e.phone = 'Enter a valid phone number.'
  if (v.message.trim().length < 10) e.message = 'Write at least a short sentence (10 characters).'
  else if (v.message.length > 2000) e.message = 'Please keep your message under 2000 characters.'
  return e
}

export default function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorText, setErrorText] = useState('')

  const whatsappHref = buildWhatsAppLink(`Hi ${siteConfig.name}, I have a question.`)

  const bind = (field) => ({
    id: field, name: field, value: values[field], className: inputClass,
    maxLength: { name: 100, phone: 30, message: 2000 }[field],
    'aria-invalid': !!errors[field],
    onChange: (e) => {
      setValues((v) => ({ ...v, [field]: e.target.value }))
      setErrors((er) => ({ ...er, [field]: undefined }))
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    if (!isSupabaseConfigured) {
      setStatus('error')
      setErrorText('The contact form is not connected yet. Please message us on WhatsApp instead.')
      return
    }
    setStatus('sending')
    try {
      await createContactMessage(values)
      setValues(empty)
      setStatus('sent')
    } catch (err) {
      console.error('Contact message failed', err)
      setStatus('error')
      setErrorText('Something went wrong sending your message. Please try again, or message us on WhatsApp.')
    }
  }

  const details = [
    { Icon: Phone, label: siteConfig.phoneDisplay, href: `tel:+${siteConfig.whatsappNumber}` },
    { Icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { Icon: MapPin, label: siteConfig.address },
    { Icon: Clock, label: siteConfig.hours },
  ]

  return (
    <section id="contact" className="section-pad bg-ink bg-glow">
      <div className="container-page grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            title="Talk to us"
            description="Questions about a package, a stubborn stain or a quote for a bigger vehicle? Send a message and we’ll reply."
          />
          <ul className="space-y-5">
            {details.map(({ Icon, label, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-charcoal-card text-ember">
                  <Icon size={20} />
                </span>
                {href ? <a href={href} className="hover:text-ember">{label}</a> : <span>{label}</span>}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5 card p-6 sm:p-8">
          <Field id="name" label="Name" error={errors.name}>
            <input type="text" autoComplete="name" {...bind('name')} />
          </Field>
          <Field id="phone" label="Phone / WhatsApp" error={errors.phone}>
            <input type="tel" autoComplete="tel" {...bind('phone')} />
          </Field>
          <Field id="message" label="Your message" error={errors.message}>
            <textarea rows={5} {...bind('message')} />
          </Field>
          <Button type="submit" disabled={status === 'sending'} className="w-full">
            <Send size={18} /> {status === 'sending' ? 'Sending…' : 'Send message'}
          </Button>
          {status === 'sent' && (
            <p role="status" className="rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-300">
              Message sent. We’ll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{errorText}</p>
          )}
          <p className="text-xs text-steel">
            Prefer WhatsApp?{' '}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-bold text-ember underline">
              Message us there
            </a>.
          </p>
        </form>
      </div>
    </section>
  )
}