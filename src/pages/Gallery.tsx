import { useState } from "react";
import { motion } from "framer-motion";
import bridalImage from "@/assets/bridal-makeup.jpg";
import mehndiImage from "@/assets/mehndi.jpg";
import hairImage from "@/assets/hair-styling.jpg";
import skincareImage from "@/assets/skincare.jpg";
import nailsImage from "@/assets/nails.jpg";
import heroImage from "@/assets/hero-salon.jpg";

const categories = ["All", "Bridal", "Mehndi", "Hair", "Skin", "Nails"];

const galleryData = [
  { id: 1, image: bridalImage, caption: "Traditional Barat Bridal Look", category: "Bridal" },
  { id: 2, image: mehndiImage, caption: "Intricate Bridal Mehndi", category: "Mehndi" },
  { id: 3, image: hairImage, caption: "Elegant Bridal Updo", category: "Hair" },
  { id: 4, image: skincareImage, caption: "Glowing Bridal Skin", category: "Skin" },
  { id: 5, image: nailsImage, caption: "Rose Gold Bridal Nails", category: "Nails" },
  { id: 6, image: heroImage, caption: "Our Luxury Salon", category: "Bridal" },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? galleryData
    : galleryData.filter((item) => item.category === activeCategory);

  return (
    <div className= "py-16" >
    <div className="container mx-auto px-4" >
      <motion.div
          initial={ { opacity: 0, y: 20 } }
  animate = {{ opacity: 1, y: 0 }
}
className = "text-center mb-14"
  >
  <span className="font-tagline text-primary tracking-widest text-sm uppercase" > Our Work </span>
    < h1 className = "font-display text-4xl md:text-5xl font-bold mt-3" > Gallery </h1>
      < p className = "text-muted-foreground mt-4" > A glimpse of our finest beauty transformations.</p>
        </motion.div>

        < div className = "flex flex-wrap justify-center gap-3 mb-10" >
        {
          categories.map((cat) => (
            <button
              key= { cat }
              onClick = {() => setActiveCategory(cat)}
className = {`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
    ? "bg-gradient-gold text-primary-foreground shadow-gold"
    : "bg-muted text-muted-foreground hover:bg-muted/80"
  }`}
            >
  { cat }
  </button>
          ))}
</div>

  < div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" >
  {
    filtered.map((item, i) => (
      <motion.div
              key= { item.id }
              initial = {{ opacity: 0, scale: 0.95 }}
animate = {{ opacity: 1, scale: 1 }}
transition = {{ delay: i * 0.08 }}
className = "group relative overflow-hidden rounded-2xl aspect-square"
  >
  <img
                src={ item.image }
alt = { item.caption }
className = "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors duration-300 flex items-end" >
    <div className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" >
      <p className="text-champagne-light font-display text-lg font-semibold" > { item.caption } </p>
        < p className = "text-champagne-light/70 text-sm" > { item.category } </p>
          </div>
          </div>
          </motion.div>
          ))}
</div>
  </div>
  </div>
  );
};

export default GalleryPage;
