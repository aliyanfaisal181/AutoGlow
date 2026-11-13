import { supabase } from './supabase'

export class SlotTakenError extends Error {}
export class NotConfiguredError extends Error {}

function client() {
  if (!supabase) throw new NotConfiguredError('Supabase is not configured')
  return supabase
}

// Returns a Set of "YYYY-MM-DD|HH:MM" strings for slots that are already booked.
export async function fetchTakenSlots(fromDate) {
  const { data, error } = await client().rpc('get_taken_slots', { from_date: fromDate })
  if (error) throw error
  return new Set(data.map((r) => `${r.booking_date}|${r.time_slot}`))
}

// The id is made here so we can show a reference without reading the row back
// (visitors are not allowed to read bookings, which protects other customers' data).
export async function createBooking(form, packageId) {
  const id = crypto.randomUUID()
  const { error } = await client().from('bookings').insert({
    id,
    package_id: packageId,
    booking_date: form.date,
    time_slot: form.time,
    name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim() || null,
    car: form.car.trim(),
    notes: form.notes.trim() || null,
  })
  if (error) {
    if (error.code === '23505') throw new SlotTakenError('Slot already booked')
    throw error
  }
  return id.slice(0, 8).toUpperCase()
}

export async function createContactMessage({ name, phone, message }) {
  const { error } = await client().from('contact_messages').insert({
    name: name.trim(),
    phone: phone.trim(),
    message: message.trim(),
  })
  if (error) throw error
}