import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { packages } from "@/lib/salon-data";

const PackagesPage = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="font-tagline text-primary tracking-widest text-sm uppercase">Bridal Specials</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Wedding Packages</h1>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Comprehensive bridal packages designed to make your special day unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 border ${
                pkg.isFeatured
                  ? "border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-gold scale-105"
                  : "border-border bg-card"
              }`}
            >
              {pkg.tag && (
                <span className="absolute -top-3 left-6 bg-gradient-gold text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  {pkg.tag}
                </span>
              )}
              <h3 className="font-display text-2xl font-bold mt-2">{pkg.name}</h3>
              <p className="text-muted-foreground text-sm mt-2">{pkg.description}</p>
              <div className="mt-6">
                <span className="text-3xl font-bold text-gradient-gold">PKR {pkg.price.toLocaleString()}</span>
                <span className="text-muted-foreground text-sm ml-2">· {pkg.duration}</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/booking"
                className={`block mt-8 text-center py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105 ${
                  pkg.isFeatured
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
    </div>
  );
};

export default PackagesPage;
