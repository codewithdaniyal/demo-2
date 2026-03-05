import { motion } from "framer-motion";
import { Instagram, Award, Clock } from "lucide-react";
import { artists } from "@/lib/salon-data";
import bridalImage from "@/assets/bridal-makeup.jpg";
import hairImage from "@/assets/hair-styling.jpg";
import mehndiImage from "@/assets/mehndi.jpg";

const artistImages: Record<string, string> = {
  artist1: bridalImage,
  artist2: hairImage,
  artist3: mehndiImage,
};

const TeamPage = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="font-tagline text-primary tracking-widest text-sm uppercase">Meet The Artists</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Our Team</h1>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Expert beauty professionals dedicated to making you look and feel your best.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {artists.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl border border-border overflow-hidden group"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={artistImages[artist.image]}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold text-champagne-light">{artist.name}</h3>
                  <p className="text-champagne-light/80 text-sm">{artist.title}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{artist.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {artist.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-primary" /> {artist.yearsExperience} years
                  </span>
                  <a href="#" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Instagram className="w-4 h-4" /> Follow
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
