// Accessible selectable card built on a real radio input,
// so keyboard and screen-reader users can use it too.
export default function ChoiceCard({ name, value, checked, onChange, children, className = '', disabled = false }) {
  return (
    <label className={`block ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
      />
      <span
        className={`block rounded-xl border border-white/10 bg-white/[0.04] transition-all hover:border-white/30 peer-checked:border-ember peer-checked:bg-ember/10 peer-checked:shadow-[0_0_30px_-8px_rgba(242,106,33,.6)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember peer-disabled:opacity-35 peer-disabled:hover:border-white/10 ${className}`}
      >
        {children}
      </span>
    </label>
  )
}