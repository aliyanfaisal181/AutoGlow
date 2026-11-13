import SectionHeading from '../ui/SectionHeading'
import BeforeAfterSlider from '../gallery/BeforeAfterSlider'
import { gallery } from '../../data/gallery'

export default function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-charcoal bg-glow">
      <div className="container-page">
        <SectionHeading
          title="See the difference"
          description="Drag the slider on each photo to compare the car before and after the work."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => <BeforeAfterSlider key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  )
}