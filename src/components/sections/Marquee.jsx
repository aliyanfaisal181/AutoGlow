const words = ['Paint correction', 'Ceramic coating', 'Interior detailing', 'Wheels and tyres', 'Headlight restoration', 'Hand wash']

// Slow-moving ticker. The list is doubled so the loop is seamless.
export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden border-b border-white/10 py-8" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.slice(0, words.length).map((w) => (
              <span key={`${copy}-${w}`} className="flex items-center">
                <span className="outline-text px-8 font-display text-5xl font-bold sm:text-7xl">{w}</span>
                <span className="h-2.5 w-2.5 rotate-45 bg-ember" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}