import StepHeading, { FieldError } from './StepHeading'

const LIMITS = { name: 100, phone: 30, email: 200, car: 100, notes: 1000 }

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-steel/70 transition-colors focus:border-ember focus:outline-none'

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label} {optional && <span className="text-steel">(optional)</span>}
      </label>
      {children}
      <FieldError message={error} />
    </div>
  )
}

export default function DetailsStep({ values, onChange, errors }) {
  const bind = (field) => ({
    id: field,
    name: field,
    value: values[field],
    onChange: (e) => onChange(field, e.target.value),
    maxLength: LIMITS[field],
    className: inputClass,
    'aria-invalid': !!errors[field],
    'data-invalid': !!errors[field],
  })

  return (
    <fieldset>
      <StepHeading number={4}>Your details</StepHeading>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input type="text" autoComplete="name" placeholder="Jane Doe" {...bind('name')} />
        </Field>
        <Field id="phone" label="Phone / WhatsApp" error={errors.phone}>
          <input type="tel" autoComplete="tel" placeholder="+1 555 123 4567" {...bind('phone')} />
        </Field>
        <Field id="email" label="Email" error={errors.email} optional>
          <input type="email" autoComplete="email" placeholder="jane@example.com" {...bind('email')} />
        </Field>
        <Field id="car" label="Car make and model" error={errors.car}>
          <input type="text" placeholder="BMW 3 Series, 2019" {...bind('car')} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="notes" label="Anything we should know?" optional>
            <textarea rows={3} placeholder="Pet hair, a stain, a scratch you’re worried about…" {...bind('notes')} />
          </Field>
        </div>
      </div>
    </fieldset>
  )
}