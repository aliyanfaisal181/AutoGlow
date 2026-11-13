// A card whose border and surface glow orange where the cursor is.
export default function SpotlightCard({ as: Tag = 'div', className = '', children, ...props }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag onMouseMove={onMove} className={`card spotlight overflow-hidden ${className}`} {...props}>
      {children}
    </Tag>
  )
}