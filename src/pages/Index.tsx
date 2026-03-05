import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowRight, Crown, Scissors, Sparkles, Palette, Gem, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-salon.jpg";
import bridalImage from "@/assets/bridal-makeup.jpg";
import mehndiImage from "@/assets/mehndi.jpg";
import hairImage from "@/assets/hair-styling.jpg";
import skincareImage from "@/assets/skincare.jpg";
import nailsImage from "@/assets/nails.jpg";
import { useSalon } from "@/hooks/useSalon";
import { serviceCategories, packages, reviews } from "@/lib/salon-data";

const iconMap: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-6 h-6" />,
  Scissors: <Scissors className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Gem: <Gem className="w-6 h-6" />,
};

const categoryImages: Record<string, string> = {
  bridal: bridalImage,
  hair: hairImage,
  skin: skincareImage,
  mehndi: mehndiImage,
  nails: nailsImage,
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Index = () => {
  const salonConfig = useSalon();

  return (
    <div>
    {/* Hero Section */ }
    < section className = "relative min-h-[90vh] flex items-center justify-center overflow-hidden" >
      <div className="absolute inset-0" >
        <img src={ heroImage } alt = "Glamour Studio luxury salon interior" className = "w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40" />
            </div>
            < div className = "relative container mx-auto px-4 py-20" >
              <motion.div
            initial={ { opacity: 0, y: 40 } }
  animate = {{ opacity: 1, y: 0 }
}
transition = {{ duration: 0.8 }}
className = "max-w-2xl"
  >
  <span className="font-tagline text-lg md:text-xl text-primary tracking-widest" >
    Premium Beauty Experience
      </span>
      < h1 className = "font-display text-4xl md:text-6xl lg:text-7xl font-bold mt-4 leading-tight" >
        Where Elegance{ " " }
<span className="text-gradient-gold" > Meets Tradition </span>
  </h1>
  < p className = "text-muted-foreground text-lg mt-6 leading-relaxed max-w-lg" >
    Islamabad's premier destination for bridal beauty, hair artistry, and luxurious self-care. 
              Experience beauty rooted in Pakistani tradition.
            </p>
  < div className = "flex flex-wrap gap-4 mt-8" >
    <Link
                to="/booking"
className = "bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-full font-semibold shadow-gold hover:scale-105 transition-transform"
  >
  Book Appointment
    </Link>
    < Link
to = "/services"
className = "border border-primary/30 text-foreground px-8 py-3.5 rounded-full font-semibold hover:bg-primary/5 transition-colors"
  >
  View Services
    </Link>
    </div>
    < div className = "flex items-center gap-6 mt-10 text-sm text-muted-foreground" >
      <span className="flex items-center gap-1.5" >
        <Star className="w-4 h-4 text-primary fill-primary" /> 4.9 Rating
          </span>
          < span > 500 + Happy Brides </span>
            < span > 12 + Years </span>
            </div>
            </motion.div>
            </div>
            </section>

{/* Services Preview */ }
<section className="py-20 bg-background" >
  <div className="container mx-auto px-4" >
    <motion.div { ...fadeUp } className = "text-center mb-14" >
      <span className="font-tagline text-primary tracking-widest text-sm uppercase" > Our Expertise </span>
        < h2 className = "font-display text-3xl md:text-5xl font-bold mt-3" >
          Beauty Services
            </h2>
            < p className = "text-muted-foreground mt-4 max-w-lg mx-auto" >
              From bridal transformations to everyday pampering, we offer a complete range of beauty services.
            </p>
                </motion.div>
                < div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
                {
                  serviceCategories.slice(0, 3).map((cat, i) => (
                    <motion.div
                key= { cat.id }
                { ...fadeUp }
                transition = {{ duration: 0.6, delay: i * 0.1 }}
                  >
                  <Link to="/services" className = "group block" >
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/5]" >
                      <img
                      src={ categoryImages[cat.image] }
alt = { cat.name }
className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-6" >
      <div className="text-champagne-light mb-2" > { iconMap[cat.icon]} </div>
        < h3 className = "font-display text-2xl font-bold text-champagne-light" > { cat.name } </h3>
          < p className = "text-champagne-light/70 text-sm mt-1" >
            { cat.services.length } services · From PKR { cat.services[0].priceMin.toLocaleString() }
</p>
  </div>
  </div>
  </Link>
  </motion.div>
            ))}
</div>
  < div className = "text-center mt-10" >
    <Link
              to="/services"
className = "inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
  >
  View All Services < ArrowRight className = "w-4 h-4" />
    </Link>
    </div>
    </div>
    </section>

{/* Packages Preview */ }
<section className="py-20 bg-card" >
  <div className="container mx-auto px-4" >
    <motion.div { ...fadeUp } className = "text-center mb-14" >
      <span className="font-tagline text-primary tracking-widest text-sm uppercase" > Bridal Specials </span>
        < h2 className = "font-display text-3xl md:text-5xl font-bold mt-3" > Wedding Packages </h2>
          </motion.div>
          < div className = "grid grid-cols-1 md:grid-cols-3 gap-6" >
          {
            packages.map((pkg, i) => (
              <motion.div
                key= { pkg.id }
                { ...fadeUp }
                transition = {{ duration: 0.6, delay: i * 0.1 }}
className = {`relative rounded-2xl p-8 border ${pkg.isFeatured
  ? "border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-gold"
  : "border-border bg-background"
  }`}
              >
{
  pkg.tag && (
    <span className="absolute -top-3 left-6 bg-gradient-gold text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
      { pkg.tag }
      </span>
                )
}
  < h3 className = "font-display text-2xl font-bold mt-2" > { pkg.name } </h3>
    < p className = "text-muted-foreground text-sm mt-2" > { pkg.description } </p>
      < div className = "mt-6" >
        <span className="text-3xl font-bold text-gradient-gold" >
          PKR { pkg.price.toLocaleString() }
</span>
  < span className = "text-muted-foreground text-sm ml-2" >· { pkg.duration } </span>
    </div>
    < ul className = "mt-6 space-y-2.5" >
    {
      pkg.includes.map((item) => (
        <li key= { item } className = "flex items-start gap-2 text-sm text-muted-foreground" >
        <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        { item }
      </li>
      ))
    }
      </ul>
      < Link
to = "/booking"
className = {`block mt-8 text-center py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105 ${pkg.isFeatured
  ? "bg-gradient-gold text-primary-foreground shadow-gold"
  : "border border-primary text-primary hover:bg-primary/5"
  }`}
                >
  Book This Package
    </Link>
    </motion.div>
            ))}
</div>
  </div>
  </section>

{/* Reviews */ }
<section className="py-20 bg-background" >
  <div className="container mx-auto px-4" >
    <motion.div { ...fadeUp } className = "text-center mb-14" >
      <span className="font-tagline text-primary tracking-widest text-sm uppercase" > Testimonials </span>
        < h2 className = "font-display text-3xl md:text-5xl font-bold mt-3" > What Our Clients Say </h2>
          </motion.div>
          < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {
            reviews.slice(0, 6).map((review, i) => (
              <motion.div
                key= { review.id }
                { ...fadeUp }
                transition = {{ duration: 0.6, delay: i * 0.08 }}
className = "bg-card rounded-2xl p-6 border border-border"
  >
  <div className="flex gap-1 mb-3" >
  {
    Array.from({ length: review.rating }).map((_, j) => (
      <Star key= { j } className = "w-4 h-4 text-primary fill-primary" />
                  ))
  }
    </div>
    < p className = "text-sm text-muted-foreground leading-relaxed italic" >
      "{review.text}"
      </p>
      < div className = "mt-4 flex items-center justify-between" >
        <div>
        <p className="font-semibold text-sm" > { review.clientName } </p>
          < p className = "text-xs text-muted-foreground" > { review.service } </p>
            </div>
            < span className = "text-xs text-muted-foreground" > { review.date } </span>
              </div>
              </motion.div>
            ))}
</div>
  </div>
  </section>

{/* CTA */ }
<section className="py-20 bg-gradient-gold" >
  <div className="container mx-auto px-4 text-center" >
    <motion.div { ...fadeUp } >
    <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground" >
      Ready to Look Your Best ?
        </h2>
        < p className = "text-primary-foreground/80 mt-4 max-w-lg mx-auto" >
          Book your appointment today and experience the luxury of { salonConfig.name }.
</p>
  < div className = "flex flex-wrap justify-center gap-4 mt-8" >
    <Link
                to="/booking"
className = "bg-background text-foreground px-8 py-3.5 rounded-full font-semibold hover:scale-105 transition-transform"
  >
  Book Appointment
    </Link>
    < a
href = {`https://wa.me/${salonConfig.whatsapp}`}
target = "_blank"
rel = "noopener noreferrer"
className = "border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:bg-primary-foreground/10 transition-colors"
  >
  WhatsApp Us
    </a>
    </div>
    </motion.div>
    </div>
    </section>
    </div>
  );
};

export default Index;
