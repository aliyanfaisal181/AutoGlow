import { useState } from 'react'
import { ImageOff, MoveHorizontal } from 'lucide-react'

// Shows the photo, or a labelled placeholder if the file isn't there yet.
function Photo({ src, alt, label }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-charcoal-card p-4 text-center text-xs text-steel">
        <ImageOff size={22} />
        <span>{label} photo missing</span>
        <code className="break-all text-[11px]">public{src}</code>
      </div>
    )
  }
  return (
    <img src={src} alt={alt} onError={() => setFailed(true)} draggable={false}
      loading="lazy" className="h-full w-full object-cover" />
  )
}

// The invisible range input does the dragging, so mouse, touch and keyboard all work.
export default function BeforeAfterSlider({ item }) {
  const [pos, setPos] = useState(50)

  return (
    <figure>
      <div className="relative aspect-[4/3] select-none overflow-hidden rounded-2xl border border-charcoal-line bg-charcoal focus-within:ring-2 focus-within:ring-ember">
        <div className="absolute inset-0"><Photo src={item.after} alt={`${item.title}: after`} label="After" /></div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Photo src={item.before} alt={`${item.title}: before`} label="Before" />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ember px-3 py-1 text-xs font-bold text-ink">After</span>

        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-ember" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ember text-ink shadow-lg">
            <MoveHorizontal size={20} />
          </span>
        </div>

        <input type="range" min="0" max="100" value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare before and after: ${item.title}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
      </div>
      <figcaption className="mt-4">
        <p className="font-display text-2xl font-semibold">{item.title}</p>
        <p className="text-sm text-steel">{item.car}</p>
      </figcaption>
    </figure>
  )
}