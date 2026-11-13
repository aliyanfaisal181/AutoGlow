// The steps are a real sequence, so numbering them is meaningful here.
export default function StepHeading({ number, children }) {
  return (
    <legend className="mb-5 flex items-center gap-3 font-display text-3xl font-semibold">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember text-base font-bold text-ink">
        {number}
      </span>
      {children}
    </legend>
  )
}

export function FieldError({ message }) {
  if (!message) return null
  return <p role="alert" className="mt-2 text-sm text-red-400">{message}</p>
}