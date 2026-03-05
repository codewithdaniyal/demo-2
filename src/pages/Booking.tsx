import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from "lucide-react";
import { serviceCategories, packages, artists, salonConfig } from "@/lib/salon-data";
import { toast } from "sonner";

const occasions = ["Barat", "Nikah", "Walima", "Mehndi", "Party", "Engagement", "Other"];

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    serviceCategory: "",
    service: "",
    packageId: "",
    artist: "",
    occasion: "",
    notes: "",
  });

  const selectedCategory = serviceCategories.find((c) => c.id === formData.serviceCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking request submitted! We'll confirm via WhatsApp shortly.", {
      duration: 5000,
    });
    setFormData({
      name: "", phone: "", email: "", date: "", time: "",
      serviceCategory: "", service: "", packageId: "", artist: "", occasion: "", notes: "",
    });
  };

  const inputClass = "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="font-tagline text-primary tracking-widest text-sm uppercase">Reserve Your Spot</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Book Appointment</h1>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Fill out the form below and we'll confirm your appointment via WhatsApp.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" /> Full Name *
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-primary" /> Phone / WhatsApp *
              </label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="03XX-XXXXXXX"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-primary" /> Email (optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" /> Preferred Date *
              </label>
              <input
                required
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" /> Preferred Time *
              </label>
              <input
                required
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5">Service Category</label>
              <select
                value={formData.serviceCategory}
                onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value, service: "" })}
                className={inputClass}
              >
                <option value="">Select category</option>
                {serviceCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5">Specific Service</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className={inputClass}
                disabled={!selectedCategory}
              >
                <option value="">Select service</option>
                {selectedCategory?.services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} — PKR {s.priceMin.toLocaleString()}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5">Or Choose a Package</label>
              <select
                value={formData.packageId}
                onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                className={inputClass}
              >
                <option value="">Select package</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} — PKR {p.price.toLocaleString()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5">Preferred Artist</label>
              <select
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                className={inputClass}
              >
                <option value="">No preference</option>
                {artists.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} — {a.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5">Occasion</label>
            <select
              value={formData.occasion}
              onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              className={inputClass}
            >
              <option value="">Select occasion</option>
              {occasions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-primary" /> Special Requests
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any specific requirements or preferences..."
              rows={3}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-gold text-primary-foreground py-4 rounded-full font-semibold text-lg shadow-gold hover:scale-[1.02] transition-transform"
          >
            Submit Booking Request
          </button>

          <p className="text-center text-xs text-muted-foreground">
            We'll confirm your appointment via WhatsApp within 2 hours during business hours.
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default BookingPage;
