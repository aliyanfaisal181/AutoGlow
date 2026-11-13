import { useMemo } from 'react'
import ChoiceCard from '../ui/ChoiceCard'
import StepHeading, { FieldError } from './StepHeading'
import { getAvailableDates, toDateKey, TIME_SLOTS, formatTime } from '../../lib/booking'

const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'short' })
const month = new Intl.DateTimeFormat('en-GB', { month: 'short' })

// `taken` is a Set of "YYYY-MM-DD|HH:MM" strings that are already booked.
export default function DateTimeStep({ date, time, onDate, onTime, errors, taken, slotsError }) {
  const dates = useMemo(() => getAvailableDates(), [])
  const isTaken = (d, t) => taken.has(`${d}|${t}`)

  return (
    <>
      <fieldset data-invalid={!!errors.date}>
        <StepHeading number={2}>Pick a date</StepHeading>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {dates.map((d) => {
            const key = toDateKey(d)
            const full = TIME_SLOTS.every((t) => isTaken(key, t))
            return (
              <ChoiceCard key={key} name="date" value={key} checked={date === key}
                onChange={() => onDate(key)} disabled={full} className="py-3 text-center">
                <span className="block text-xs text-steel">{weekday.format(d)}</span>
                <span className="block font-display text-3xl font-semibold leading-tight">{d.getDate()}</span>
                <span className="block text-xs text-steel">{full ? 'Full' : month.format(d)}</span>
              </ChoiceCard>
            )
          })}
        </div>
        <p className="mt-3 text-xs text-steel">Closed on Sundays. Same-day bookings: message us on WhatsApp.</p>
        {slotsError && (
          <p className="mt-2 text-xs text-amber-400">
            We couldn’t check which slots are taken right now. You can still request one and we’ll confirm.
          </p>
        )}
        <FieldError message={errors.date} />
      </fieldset>

      <fieldset data-invalid={!!errors.time}>
        <StepHeading number={3}>Pick a drop-off time</StepHeading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TIME_SLOTS.map((t) => {
            const unavailable = Boolean(date) && isTaken(date, t)
            return (
              <ChoiceCard key={t} name="time" value={t} checked={time === t}
                onChange={() => onTime(t)} disabled={unavailable}
                className="py-3.5 text-center text-sm font-bold">
                {formatTime(t)}
                {unavailable && <span className="block text-xs font-normal text-steel">Booked</span>}
              </ChoiceCard>
            )
          })}
        </div>
        {!date && <p className="mt-3 text-xs text-steel">Pick a date first to see which times are free.</p>}
        <FieldError message={errors.time} />
      </fieldset>
    </>
  )
}