import { motion } from "framer-motion";
import { Crown, Scissors, Sparkles, Palette, Gem, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { serviceCategories } from "@/lib/salon-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-5 h-5" />,
  Scissors: <Scissors className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Gem: <Gem className="w-5 h-5" />,
};

const ServicesPage = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="font-tagline text-primary tracking-widest text-sm uppercase">
            Our Expertise
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Services & Pricing
          </h1>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Explore our complete range of beauty services. All prices in Pakistani Rupees (PKR).
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {serviceCategories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <AccordionItem
                  value={category.id}
                  className="border border-border rounded-xl overflow-hidden bg-card"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <span className="text-primary">{iconMap[category.icon]}</span>
                      <span className="font-display text-xl font-semibold">
                        {category.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {category.services.length} services
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      {category.services.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-start justify-between p-4 rounded-lg bg-background border border-border/50"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{service.name}</h4>
                              {service.isPopular && (
                                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-primary" /> Popular
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {service.description}
                            </p>
                            <span className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                              <Clock className="w-3 h-3" /> {service.duration}
                            </span>
                          </div>
                          <div className="text-right ml-4 shrink-0">
                            <p className="font-bold text-primary">
                              PKR {service.priceMin.toLocaleString()}
                              {service.priceMax && (
                                <span className="text-muted-foreground font-normal">
                                  {" "}– {service.priceMax.toLocaleString()}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/booking"
                      className="block mt-6 text-center bg-gradient-gold text-primary-foreground py-3 rounded-full font-semibold shadow-gold hover:scale-[1.02] transition-transform"
                    >
                      Book {category.name} Service
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
