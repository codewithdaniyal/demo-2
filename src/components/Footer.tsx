import { Link } from "react-router-dom";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { salonConfig } from "@/lib/salon-data";
import TextLogo from "./TextLogo";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <TextLogo className="items-start" />
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              Premium beauty services for the modern Pakistani woman. Where tradition meets elegance.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Services", path: "/services" },
                { label: "Bridal Packages", path: "/packages" },
                { label: "Gallery", path: "/gallery" },
                { label: "Book Appointment", path: "/booking" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Hours</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Monday – Saturday</p>
              <p className="font-semibold text-foreground">10:00 AM – 8:00 PM</p>
              <p className="mt-3">Sunday</p>
              <p className="font-semibold text-foreground">12:00 PM – 6:00 PM</p>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href={`tel:${salonConfig.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> {salonConfig.phone}
              </a>
              <a href={`mailto:${salonConfig.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> {salonConfig.email}
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {salonConfig.address}
              </p>
              <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" /> {salonConfig.instagram}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {salonConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
