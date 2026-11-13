// Generates the site's built-in car artwork as SVG files.
// Run from the project folder:  node scripts/generate-images.mjs
// Replace the output with real photos any time; just keep the file names (or edit the data files).
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images')
mkdirSync(join(out, 'gallery'), { recursive: true })

// Small seeded random generator so the artwork is identical every run
const rng = (seed) => { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }
const r1 = (n) => Math.round(n * 10) / 10

const BODIES = {
  sedan: {
    path: 'M100 405 L100 350 Q100 322 135 316 L250 300 L330 240 Q345 228 370 228 L470 228 Q495 228 515 244 L580 300 L690 318 Q735 326 740 365 L742 405 L662 405 A62 62 0 0 0 538 405 L292 405 A62 62 0 0 0 168 405 Z',
    wheels: [230, 600], tire: 56,
    glass: ['M268 298 L335 246 Q345 238 362 238 L418 238 L418 298 Z', 'M432 238 L470 238 Q488 238 500 248 L552 298 L432 298 Z'],
    doors: [296, 424], head: [700, 330], tail: [100, 342], mirror: [556, 304], top: 225,
  },
  suv: {
    path: 'M100 405 L100 335 Q100 302 132 298 L192 292 L214 236 Q222 220 246 220 L520 220 Q546 220 556 236 L596 300 L700 316 Q742 324 744 366 L746 405 L671 405 A66 66 0 0 0 539 405 L291 405 A66 66 0 0 0 159 405 Z',
    wheels: [225, 605], tire: 60,
    glass: ['M228 290 L246 238 L330 238 L330 290 Z', 'M344 238 L436 238 L436 290 L344 290 Z', 'M450 238 L520 238 Q534 238 542 250 L574 290 L450 290 Z'],
    doors: [337, 443], head: [704, 326], tail: [100, 330], mirror: [560, 298], top: 217,
  },
}

const sharedDefs = `
<linearGradient id="silver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eceff2"/><stop offset=".5" stop-color="#9aa1a9"/><stop offset="1" stop-color="#d4d8dc"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26303c"/><stop offset="1" stop-color="#090c10"/></linearGradient>
<linearGradient id="mud" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3b2b" stop-opacity="0"/><stop offset="1" stop-color="#4a3b2b" stop-opacity=".8"/></linearGradient>
<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="studio" cx=".62" cy=".45" r=".8"><stop offset="0" stop-color="#2a2a2c"/><stop offset=".55" stop-color="#141414"/><stop offset="1" stop-color="#070707"/></radialGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1c1d"/><stop offset="1" stop-color="#050505"/></linearGradient>`

function wheel(cx, cy, r, dirty) {
  const rim = r * 0.68
  const spokeFill = dirty ? '#76695a' : 'url(#silver)'
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0b0b0b"/><circle cx="${cx}" cy="${cy}" r="${r - 7}" fill="none" stroke="#1c1c1c" stroke-width="3"/>`
  s += `<circle cx="${cx}" cy="${cy}" r="${rim}" fill="#14161a"/><circle cx="${cx}" cy="${cy}" r="${rim - 2}" fill="none" stroke="${spokeFill}" stroke-width="5"/>`
  for (let i = 0; i < 5; i++) {
    s += `<path d="M-5 -${r1(rim * 0.2)} L-9 -${r1(rim * 0.92)} L9 -${r1(rim * 0.92)} L5 -${r1(rim * 0.2)} Z" transform="translate(${cx} ${cy}) rotate(${i * 72})" fill="${spokeFill}"/>`
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${r1(rim * 0.2)}" fill="${spokeFill}"/><circle cx="${cx}" cy="${cy}" r="${r1(rim * 0.08)}" fill="#111"/>`
  if (dirty) s += `<circle cx="${cx}" cy="${cy}" r="${r1(rim)}" fill="#3a2f25" opacity=".3"/>`
  return s
}

function car({ kind, id, top, bottom, dirty = false, swirl = false, beads = false, seed = 1, rim = false }) {
  const b = BODIES[kind]
  const rnd = rng(seed)
  const clip = `${id}-clip`
  let s = `<g id="${id}"><defs><clipPath id="${clip}"><path d="${b.path}"/></clipPath>
<linearGradient id="${id}-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>`
  s += wheel(b.wheels[0], 405, b.tire, dirty) + wheel(b.wheels[1], 405, b.tire, dirty)
  s += `<path d="${b.path}" fill="url(#${id}-body)"${rim ? ' stroke="#f26a21" stroke-opacity=".55" stroke-width="1.6"' : ''}/>`
  s += `<g clip-path="url(#${clip})">`
  if (!dirty) {
    s += `<path d="M110 336 L735 342 L735 354 L110 348 Z" fill="#fff" opacity=".16"/>`
    s += `<polygon points="300,215 380,215 300,415 220,415" fill="url(#sheen)" opacity=".5"/><polygon points="520,215 560,215 480,415 440,415" fill="url(#sheen)" opacity=".3"/>`
    s += `<rect x="95" y="388" width="660" height="22" fill="#000" opacity=".35"/>`
  }
  if (swirl) {
    for (let i = 0; i < 46; i++) {
      const cx = 120 + rnd() * 620, cy = 245 + rnd() * 140, rr = 8 + rnd() * 30
      s += `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(rr)}" fill="none" stroke="#fff" stroke-opacity="${r1(0.1 + rnd() * 0.14)}" stroke-width=".8" stroke-dasharray="${r1(rr * (1 + rnd() * 3))} 999"/>`
    }
    s += `<rect x="90" y="215" width="670" height="200" fill="#9aa0a8" opacity=".18"/>`
  }
  if (dirty) {
    s += `<rect x="90" y="215" width="670" height="200" fill="#8b7c68" opacity=".38"/><rect x="90" y="300" width="670" height="115" fill="url(#mud)"/>`
    for (let i = 0; i < 34; i++) {
      const x = 100 + rnd() * 640, y1 = 250 + rnd() * 80, y2 = y1 + 40 + rnd() * 110
      s += `<line x1="${r1(x)}" y1="${r1(y1)}" x2="${r1(x + rnd() * 6 - 3)}" y2="${r1(y2)}" stroke="#5e4d3a" stroke-width="${r1(0.8 + rnd() * 2.4)}" opacity="${r1(0.16 + rnd() * 0.22)}"/>`
    }
    for (let i = 0; i < 80; i++) {
      s += `<circle cx="${r1(100 + rnd() * 640)}" cy="${r1(225 + rnd() * 185)}" r="${r1(0.8 + rnd() * 1.8)}" fill="#44372a" opacity="${r1(0.25 + rnd() * 0.3)}"/>`
    }
    if (beads) {
      for (let i = 0; i < 26; i++) {
        s += `<circle cx="${r1(120 + rnd() * 600)}" cy="${r1(235 + rnd() * 150)}" r="${r1(3 + rnd() * 5)}" fill="none" stroke="#e6dfd0" stroke-opacity=".5"/>`
      }
    }
  } else if (beads) {
    for (let i = 0; i < 70; i++) {
      const x = 115 + rnd() * 620, y = 232 + rnd() * 160, rr = 2 + rnd() * 4.5
      s += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(rr)}" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-opacity=".55" stroke-width=".8"/><circle cx="${r1(x - rr * 0.3)}" cy="${r1(y - rr * 0.3)}" r="${r1(rr * 0.28)}" fill="#fff" opacity=".9"/>`
    }
  }
  s += `</g>`
  b.doors.forEach((x) => { s += `<line x1="${x}" y1="300" x2="${x}" y2="396" stroke="#000" stroke-opacity=".5" stroke-width="1.3"/>` })
  b.glass.forEach((g) => {
    s += `<path d="${g}" fill="url(#glass)" stroke="#000" stroke-opacity=".6" stroke-width="2"/>`
    if (dirty) s += `<path d="${g}" fill="#a39682" opacity=".34"/>`
    else s += `<path d="${g}" fill="url(#sheen)" opacity=".5"/>`
  })
  b.doors.forEach((x) => { s += `<rect x="${x + 22}" y="318" width="22" height="4" rx="2" fill="#000" opacity=".45"/>` })
  s += `<ellipse cx="${b.mirror[0]}" cy="${b.mirror[1]}" rx="11" ry="6" fill="${top}" stroke="#000" stroke-opacity=".5"/>`
  s += `<rect x="${b.wheels[0] + b.tire + 8}" y="397" width="${b.wheels[1] - b.wheels[0] - 2 * b.tire - 16}" height="3" fill="#cfd3d8" opacity="${dirty ? 0.2 : 0.55}"/>`
  const [hx, hy] = b.head, [tx, ty] = b.tail
  s += `<path d="M${hx} ${hy} l38 12 q3 10 0 16 l-38 -8 Z" fill="${dirty ? '#8f897a' : '#f6f2e4'}"/>`
  s += `<path d="M${tx} ${ty} l8 -4 h10 v18 l-18 2 Z" fill="${dirty ? '#7a2a1c' : '#ff3b1f'}"/>`
  return s + `</g>`
}

const wrap = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><defs>${sharedDefs}</defs>${body}</svg>`

function galleryCar(opts) {
  return wrap(800, 600, `<rect width="800" height="600" fill="url(#studio)"/><rect y="470" width="800" height="130" fill="url(#floor)"/>
<ellipse cx="400" cy="486" rx="340" ry="16" fill="#000" opacity=".65"/>
<g transform="translate(26 36) scale(.95)">${car(opts)}</g>`)
}

function galleryWheel(dirty) {
  const sp = dirty ? '#76695a' : 'url(#silver)'
  let s = `<rect width="800" height="600" fill="url(#studio)"/><g transform="translate(400 300)">`
  s += `<circle r="268" fill="#0b0b0b"/><circle r="252" fill="none" stroke="${dirty ? '#2a2623' : '#222'}" stroke-width="5"/>`
  s += `<circle r="206" fill="${dirty ? '#6f6455' : 'url(#silver)'}"/><circle r="190" fill="#101215"/>`
  s += `<circle r="150" fill="${dirty ? '#5b3f2c' : '#8c9298'}"/><circle r="150" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="3"/>`
  s += `<path d="M96 108 A146 146 0 0 1 -60 140" fill="none" stroke="${dirty ? '#5c3a22' : '#f26a21'}" stroke-width="40" stroke-linecap="round"/>`
  for (let i = 0; i < 10; i++) s += `<path d="M-10 -56 L-18 -186 L18 -186 L10 -56 Z" transform="rotate(${i * 36})" fill="${sp}"/>`
  s += `<circle r="62" fill="${sp}"/><circle r="40" fill="#14161a"/>`
  for (let i = 0; i < 5; i++) s += `<circle cx="0" cy="-51" r="6" transform="rotate(${i * 72})" fill="#0b0b0b"/>`
  if (dirty) {
    const rnd = rng(9)
    s += `<circle r="206" fill="#3a2f25" opacity=".32"/>`
    for (let i = 0; i < 60; i++) s += `<circle cx="${r1(rnd() * 400 - 200)}" cy="${r1(rnd() * 400 - 200)}" r="${r1(1 + rnd() * 3)}" fill="#2c2219" opacity=".5"/>`
  } else {
    s += `<path d="M-190 -60 A200 200 0 0 1 -60 -190" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/>`
  }
  return wrap(800, 600, s + `</g>`)
}

const w = (name, svg) => { writeFileSync(join(out, name), svg); console.log('Created public/images/' + name) }

// Hero: car only (transparent background) with floor reflection; the page supplies the studio backdrop
const heroCar = car({ kind: 'sedan', id: 'hero', top: '#3d3f46', bottom: '#050506', rim: true, seed: 3 })
w('hero-car.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="70 200 700 400"><defs>${sharedDefs}
<linearGradient id="fadeG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="fade" maskUnits="userSpaceOnUse" x="70" y="461" width="700" height="140"><rect x="70" y="461" width="700" height="140" fill="url(#fadeG)"/></mask></defs>
<ellipse cx="420" cy="464" rx="350" ry="13" fill="#000" opacity=".7"/>
${heroCar}
<g mask="url(#fade)"><use href="#hero" transform="translate(0 922) scale(1 -1)" opacity=".5"/></g></svg>`)

w('gallery/1-before.svg', galleryCar({ kind: 'sedan', id: 'g1b', top: '#4a4d54', bottom: '#15161a', swirl: true, seed: 11 }))
w('gallery/1-after.svg', galleryCar({ kind: 'sedan', id: 'g1a', top: '#3b3d43', bottom: '#08080a', seed: 11 }))
w('gallery/2-before.svg', galleryCar({ kind: 'suv', id: 'g2b', top: '#6c727b', bottom: '#2a2d33', dirty: true, beads: true, seed: 21 }))
w('gallery/2-after.svg', galleryCar({ kind: 'suv', id: 'g2a', top: '#7a8089', bottom: '#2e3238', beads: true, seed: 21 }))
w('gallery/3-before.svg', galleryWheel(true))
w('gallery/3-after.svg', galleryWheel(false))