const variants = {
  primary:
    'bg-gradient-to-b from-ember-soft to-ember text-ink shadow-[0_8px_30px_-6px_rgba(242,106,33,.6)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-6px_rgba(242,106,33,.85)]',
  ghost:
    'border border-white/15 bg-white/5 text-white backdrop-blur hover:border-ember/60 hover:bg-white/10',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50'

/** Renders an <a> when `href` is given, otherwise a <button>. */
export default function Button({ variant = 'primary', href, external = false, className = '', children, ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`
  if (href) {
    return (
      <a href={href} className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {children}
      </a>
    )
  }
  return <button className={classes} {...props}>{children}</button>
}