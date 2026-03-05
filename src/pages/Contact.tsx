import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram } from "lucide-react";
import { useSalon } from "@/hooks/useSalon";

const ContactPage = () => {
  const salonConfig = useSalon();

  return (
    <div className= "py-16" >
    <div className="container mx-auto px-4" >
      <motion.div
          initial={ { opacity: 0, y: 20 } }
  animate = {{ opacity: 1, y: 0 }
}
className = "text-center mb-14"
  >
  <span className="font-tagline text-primary tracking-widest text-sm uppercase" > Get In Touch </span>
    < h1 className = "font-display text-4xl md:text-5xl font-bold mt-3" > Contact Us </h1>
      < p className = "text-muted-foreground mt-4 max-w-lg mx-auto" >
        We'd love to hear from you. Reach out through any of the channels below.
          </p>
          </motion.div>

          < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto" >
          {
            [
            { icon: Phone, label: "Phone", value: salonConfig.phone, href: `tel:${salonConfig.phone}` },
            { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${salonConfig.whatsapp}` },
            { icon: Mail, label: "Email", value: salonConfig.email, href: `mailto:${salonConfig.email}` },
            { icon: MapPin, label: "Location", value: salonConfig.address, href: salonConfig.googleMapsLink },
            { icon: Instagram, label: "Instagram", value: salonConfig.instagram, href: "#" },
            { icon: Clock, label: "Hours", value: salonConfig.hours, href: undefined },
          ].map((item, i) => (
              <motion.div
              key= { item.label }
              initial = {{ opacity: 0, y: 20 }}
animate = {{ opacity: 1, y: 0 }}
transition = {{ delay: i * 0.1 }}
            >
  {
    item.href ? (
      <a
                  href= { item.href }
                  target={ item.href.startsWith("http") ? "_blank" : undefined }
                  rel="noopener noreferrer"
                  className="block bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-gold transition-all text-center group"
    >
    <item.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
      < h3 className="font-display text-lg font-semibold" > { item.label } </h3>
      < p className="text-sm text-muted-foreground mt-1" > { item.value } </p>
      </a>
              ) : (
        <div className="bg-card border border-border rounded-2xl p-6 text-center" >
      <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
      <h3 className="font-display text-lg font-semibold" > { item.label } </h3>
      < p className = "text-sm text-muted-foreground mt-1" > { item.value } </p>
      </div>
      )}
</motion.div>
          ))}
</div>

  < motion.div
initial = {{ opacity: 0, y: 30 }}
animate = {{ opacity: 1, y: 0 }}
transition = {{ delay: 0.4 }}
className = "mt-16 max-w-4xl mx-auto bg-card border border-border rounded-2xl overflow-hidden"
  >
  <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.4!2d73.04!3d33.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQzJzEyLjAiTiA3M8KwMDInMjQuMCJF!5e0!3m2!1sen!2s!4v1"
width = "100%"
height = "350"
style = {{ border: 0 }}
allowFullScreen
loading = "lazy"
referrerPolicy = "no-referrer-when-downgrade"
title = {`${salonConfig.name} Location`}
          />
  </motion.div>
  </div>
  </div>
  );
};

export default ContactPage;
