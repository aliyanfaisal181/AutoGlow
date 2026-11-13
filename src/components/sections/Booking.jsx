import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import PackageStep from '../booking/PackageStep'
import DateTimeStep from '../booking/DateTimeStep'
import DetailsStep from '../booking/DetailsStep'
import BookingSummary from '../booking/BookingSummary'
import { packages } from '../../data/packages'
import {
  validateBooking, buildBookingLink, formatDateLong, formatTime, getAvailableDates, toDateKey,
} from '../../lib/booking'
import { isSupabaseConfigured } from '../../lib/supabase'
import { fetchTakenSlots, createBooking, SlotTakenError } from '../../lib/api'

const emptyDetails = { date: '', time: '', name: '', phone: '', email: '', car: '', notes: '' }
const whatsappFallback = 'Something went wrong saving your booking. Please try again, or message us on WhatsApp.'

// `packageId` lives in App so the Packages section can preselect it.
export default function Booking({ packageId, onPackageChange }) {
  const [form, setForm] = useState(emptyDetails)
  const [errors, setErrors] = useState({})
  const [taken, setTaken] = useState(new Set())
  const [slotsError, setSlotsError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [done, setDone] = useState(null) // { ref, link } after a successful save

  const pkg = packages.find((p) => p.id === packageId)

  const loadSlots = useCallback(async () => {
    if (!isSupabaseConfigured) return
    try {
      setTaken(await fetchTakenSlots(toDateKey(getAvailableDates()[0])))
      setSlotsError(false)
    } catch (err) {
      console.error('Could not load taken slots', err)
      setSlotsError(true)
    }
  }, [])

  useEffect(() => { loadSlots() }, [loadSlots])

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const pickDate = (value) => {
    update('date', value)
    // Drop the chosen time if it is already booked on the new date
    if (taken.has(`${value}|${form.time}`)) update('time', '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    const found = validateBooking({ ...form, packageId })
    setErrors(found)
    if (Object.keys(found).length) {
      requestAnimationFrame(() =>
        document.querySelector('[data-invalid="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      )
      return
    }
    if (!isSupabaseConfigured) {
      setSubmitError('Online booking is not connected yet. Please message us on WhatsApp to book.')
      return
    }
    setSubmitting(true)
    try {
      const ref = await createBooking(form, packageId)
      setDone({ ref, link: buildBookingLink(form, pkg, ref) })
      loadSlots()
    } catch (err) {
      if (err instanceof SlotTakenError) {
        setSubmitError('Sorry, that time was just booked by someone else. Please pick another time.')
        update('time', '')
        loadSlots()
      } else {
        console.error('Booking failed', err)
        setSubmitError(whatsappFallback)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const reset = () => {
    setForm(emptyDetails)
    setErrors({})
    setSubmitError('')
    setDone(null)
    onPackageChange('')
  }

  return (
    <section id="booking" className="section-pad bg-ink bg-glow">
      <div className="container-page">
        <SectionHeading
          title="Book your appointment"
          description="Choose a package, a day and a drop-off time. We’ll reply to confirm."
        />

        {import.meta.env.DEV && !isSupabaseConfigured && (
          <p className="mb-8 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200">
            Developer note: Supabase isn’t connected. Add your keys to the .env file and restart npm run dev.
            This message only shows on your computer, not on the live site.
          </p>
        )}

        {done ? (
          <div className="card max-w-2xl p-8 sm:p-10">
            <CheckCircle2 size={40} className="text-ember" />
            <h3 className="mt-4 font-display text-4xl font-semibold">Booking request received</h3>
            <p className="mt-3 leading-relaxed text-steel">
              Your request is saved. We’ll reply to confirm your slot, so please keep your phone nearby.
            </p>
            <p className="mt-5 text-sm text-steel">
              Reference: <span className="font-bold tracking-wider text-white">{done.ref}</span>
            </p>
            <dl className="mt-4 grid gap-2 text-sm">
              <div><dt className="inline text-steel">Package: </dt><dd className="inline">{pkg?.name}</dd></div>
              <div><dt className="inline text-steel">When: </dt><dd className="inline">{formatDateLong(form.date)}, {formatTime(form.time)}</dd></div>
              <div><dt className="inline text-steel">Car: </dt><dd className="inline">{form.car}</dd></div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={done.link} external variant="ghost"><MessageCircle size={18} /> Message us on WhatsApp</Button>
              <Button type="button" onClick={reset}>Make another booking</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
            <div className="space-y-12">
              <PackageStep value={packageId} onChange={onPackageChange} error={errors.packageId} />
              <DateTimeStep date={form.date} time={form.time} onDate={pickDate} onTime={(v) => update('time', v)}
                errors={errors} taken={taken} slotsError={slotsError} />
              <DetailsStep values={form} onChange={update} errors={errors} />
            </div>
            <BookingSummary pkg={pkg} date={form.date} time={form.time} submitting={submitting} error={submitError} />
          </form>
        )}
      </div>
    </section>
  )
}