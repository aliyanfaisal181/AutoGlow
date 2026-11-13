import { CalendarCheck } from 'lucide-react'
import Button from '../ui/Button'
import { currency } from '../../data/packages'
import { formatDateLong, formatTime } from '../../lib/booking'

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-3 text-sm">
      <dt className="text-steel">{label}</dt>
      <dd className="text-right font-medium">{value || <span className="text-steel">Not chosen yet</span>}</dd>
    </div>
  )
}

export default function BookingSummary({ pkg, date, time, submitting, error }) {
  return (
    <aside className="card p-6 lg:sticky lg:top-28">
      <h3 className="font-display text-3xl font-semibold">Your booking</h3>
      <dl className="mt-4 divide-y divide-charcoal-line border-y border-charcoal-line">
        <Row label="Package" value={pkg && pkg.name} />
        <Row label="Date" value={date && formatDateLong(date)} />
        <Row label="Time" value={time && formatTime(time)} />
      </dl>
      <p className="mt-5 flex items-baseline justify-between">
        <span className="text-sm text-steel">Estimated price</span>
        <span className="font-display text-4xl font-bold">{pkg ? `${currency}${pkg.price}` : '–'}</span>
      </p>
      <Button type="submit" disabled={submitting} className="mt-6 w-full">
        <CalendarCheck size={18} /> {submitting ? 'Saving…' : 'Request this booking'}
      </Button>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      <p className="mt-4 text-xs leading-relaxed text-steel">
        Your request is saved straight away. Your slot is confirmed once we reply.
      </p>
    </aside>
  )
}