import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import Hero from './components/sections/Hero'
import TrustStrip from './components/sections/TrustStrip'
import Marquee from './components/sections/Marquee'
import Services from './components/sections/Services'
import Packages from './components/sections/Packages'
import Process from './components/sections/Process'
import Booking from './components/sections/Booking'
import Gallery from './components/sections/Gallery'
import Testimonials from './components/sections/Testimonials'
import Faq from './components/sections/Faq'
import Contact from './components/sections/Contact'

export default function App() {
  // Shared so a package button in Packages preselects it in Booking.
  const [packageId, setPackageId] = useState('')

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Marquee />
        <Services />
        <Packages onSelect={setPackageId} />
        <Process />
        <Booking packageId={packageId} onPackageChange={setPackageId} />
        <Gallery />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}