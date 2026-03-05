import { MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { salonConfig } from "@/lib/salon-data";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Link
        to="/booking"
        className="bg-gradient-gold text-primary-foreground p-3.5 rounded-full shadow-gold hover:scale-110 transition-transform animate-glow"
        title="Book Appointment"
      >
        <Calendar className="w-5 h-5" />
      </Link>
      <a
        href={`https://wa.me/${salonConfig.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-emerald text-primary-foreground p-3.5 rounded-full shadow-lg hover:scale-110 transition-transform"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FloatingCTA;
