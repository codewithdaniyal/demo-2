export interface SalonConfig {
  slug: string;
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapsLink: string;
  instagram: string;
  hours: string;
  primaryColor?: string;
}

export const salons: Record<string, SalonConfig> = {
  "glamour-studio": {
    slug: "glamour-studio",
    name: "Glamour",
    tagline: "Where Elegance Meets Tradition",
    phone: "+92 300 1234567",
    whatsapp: "923001234567",
    email: "hello@glamourstudio.pk",
    address: "F-7 Markaz, Jinnah Super, Islamabad",
    googleMapsLink: "https://maps.google.com",
    instagram: "@glamourstudio.pk",
    hours: "Mon–Sat: 10:00 AM – 8:00 PM | Sun: 12:00 PM – 6:00 PM",
    primaryColor: "#D4903A", // Champagne Gold
  },
  "rose-beauty": {
    slug: "rose-beauty",
    name: "Rose Beauty",
    tagline: "Luxury Pink Haven for the Modern Woman",
    phone: "+92 321 9876543",
    whatsapp: "923219876543",
    email: "info@rosebeauty.pk",
    address: "DHA Phase 5, Lahore",
    googleMapsLink: "https://maps.google.com",
    instagram: "@rosebeauty.lahore",
    hours: "Daily: 10:00 AM – 9:00 PM",
    primaryColor: "#E05270", // Rose Pink
  },
  "golden-touch": {
    slug: "golden-touch",
    name: "Golden Touch",
    tagline: "Unleash Your Inner Glow",
    phone: "+92 333 5556667",
    whatsapp: "923335556667",
    email: "contact@goldentouch.pk",
    address: "Clifton Block 4, Karachi",
    googleMapsLink: "https://maps.google.com",
    instagram: "@goldentouch.khi",
    hours: "Tue–Sun: 11:00 AM – 8:00 PM | Mon: Closed",
    primaryColor: "#1A7A5E", // Emerald/Gold vibe
  },
};

export const salonConfig = salons["glamour-studio"];

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  image: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceMin: number;
  priceMax?: number;
  isPopular?: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  includes: string[];
  price: number;
  duration: string;
  tag?: string;
  isFeatured?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  title: string;
  bio: string;
  specializations: string[];
  yearsExperience: number;
  image: string;
}

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "bridal",
    name: "Bridal",
    icon: "Crown",
    image: "bridal",
    services: [
      { id: "b1", name: "Barat Makeup", description: "Complete bridal look with HD airbrush makeup, hairstyling & dupatta setting", duration: "3-4 hours", priceMin: 45000, priceMax: 85000, isPopular: true },
      { id: "b2", name: "Walima Makeup", description: "Elegant reception look with dewy finish and soft glam styling", duration: "2-3 hours", priceMin: 35000, priceMax: 65000 },
      { id: "b3", name: "Nikah Makeup", description: "Subtle, graceful makeup for the Nikah ceremony", duration: "2 hours", priceMin: 25000, priceMax: 45000 },
      { id: "b4", name: "Mehndi Night Look", description: "Vibrant, colorful makeup to match your mehndi outfit", duration: "1.5 hours", priceMin: 15000, priceMax: 30000 },
      { id: "b5", name: "Bridal Trial", description: "Pre-wedding trial to finalize your perfect look", duration: "2 hours", priceMin: 10000, priceMax: 20000 },
    ],
  },
  {
    id: "hair",
    name: "Hair",
    icon: "Scissors",
    image: "hair",
    services: [
      { id: "h1", name: "Haircut & Styling", description: "Precision cut with blow dry and styling", duration: "1 hour", priceMin: 2500, priceMax: 5000 },
      { id: "h2", name: "Keratin Treatment", description: "Brazilian keratin smoothing for frizz-free hair", duration: "2-3 hours", priceMin: 8000, priceMax: 18000, isPopular: true },
      { id: "h3", name: "Hair Color", description: "Full color, highlights, or balayage with premium products", duration: "2-3 hours", priceMin: 5000, priceMax: 15000 },
      { id: "h4", name: "Hair Spa Treatment", description: "Deep conditioning and scalp therapy", duration: "1 hour", priceMin: 3000, priceMax: 6000 },
      { id: "h5", name: "Bridal Updo", description: "Elaborate bridal hairstyle with accessories", duration: "1.5 hours", priceMin: 8000, priceMax: 15000 },
    ],
  },
  {
    id: "skin",
    name: "Skincare",
    icon: "Sparkles",
    image: "skin",
    services: [
      { id: "s1", name: "Hydra Facial", description: "Deep cleansing, exfoliation & hydration facial", duration: "1 hour", priceMin: 5000, priceMax: 10000, isPopular: true },
      { id: "s2", name: "Gold Facial", description: "Luxury 24K gold facial for radiant glow", duration: "1.5 hours", priceMin: 6000, priceMax: 12000 },
      { id: "s3", name: "Whitening Facial", description: "Brightening treatment for even skin tone", duration: "1 hour", priceMin: 4000, priceMax: 8000 },
      { id: "s4", name: "Acne Treatment", description: "Clinical-grade treatment for acne-prone skin", duration: "45 min", priceMin: 3500, priceMax: 7000 },
    ],
  },
  {
    id: "mehndi",
    name: "Mehndi",
    icon: "Palette",
    image: "mehndi",
    services: [
      { id: "m1", name: "Bridal Mehndi (Full)", description: "Both hands & feet with intricate traditional designs", duration: "4-5 hours", priceMin: 15000, priceMax: 35000, isPopular: true },
      { id: "m2", name: "Party Mehndi", description: "Single hand front design for events", duration: "1 hour", priceMin: 2000, priceMax: 5000 },
      { id: "m3", name: "Arabic Mehndi", description: "Elegant Arabic-style flowing patterns", duration: "1.5 hours", priceMin: 3000, priceMax: 8000 },
    ],
  },
  {
    id: "nails",
    name: "Nails",
    icon: "Gem",
    image: "nails",
    services: [
      { id: "n1", name: "Gel Manicure", description: "Long-lasting gel polish with nail art options", duration: "1 hour", priceMin: 2500, priceMax: 5000 },
      { id: "n2", name: "Acrylic Extensions", description: "Full set of sculpted acrylic nails", duration: "1.5 hours", priceMin: 4000, priceMax: 8000 },
      { id: "n3", name: "Bridal Nail Art", description: "Custom bridal nail design with gems & glitter", duration: "1.5 hours", priceMin: 5000, priceMax: 10000, isPopular: true },
    ],
  },
];

export const packages: Package[] = [
  {
    id: "p1",
    name: "Barat Package",
    description: "The ultimate bridal package for your biggest day",
    includes: ["HD Airbrush Bridal Makeup", "Bridal Hairstyling & Dupatta Setting", "Full Bridal Mehndi (Hands & Feet)", "Bridal Nail Art", "Pre-Bridal Facial", "Bridal Trial Session"],
    price: 95000,
    duration: "Full Day",
    tag: "Most Popular",
    isFeatured: true,
  },
  {
    id: "p2",
    name: "Nikah Package",
    description: "Graceful and elegant for your Nikah ceremony",
    includes: ["Soft Glam Nikah Makeup", "Elegant Hairstyling", "Party Mehndi (Both Hands)", "Gel Manicure & Pedicure", "Brightening Facial"],
    price: 55000,
    duration: "4-5 hours",
    tag: "Best Value",
  },
  {
    id: "p3",
    name: "Walima Package",
    description: "Radiant reception-ready look",
    includes: ["Dewy Walima Makeup", "Reception Hairstyling", "Arabic Mehndi Touch-up", "Nail Polish Change", "Gold Facial"],
    price: 65000,
    duration: "4-5 hours",
  },
];

export const artists: Artist[] = [
  {
    id: "a1",
    name: "Ayesha Khan",
    title: "Lead Bridal Artist",
    bio: "With 12 years of experience, Ayesha specializes in creating timeless bridal looks that blend traditional Pakistani aesthetics with modern techniques.",
    specializations: ["Bridal Makeup", "Airbrush", "Contouring"],
    yearsExperience: 12,
    image: "artist1",
  },
  {
    id: "a2",
    name: "Sana Malik",
    title: "Senior Hair Stylist",
    bio: "Sana is known for her expertise in bridal updos and contemporary hair coloring techniques using premium international products.",
    specializations: ["Hair Styling", "Color Expert", "Keratin"],
    yearsExperience: 8,
    image: "artist2",
  },
  {
    id: "a3",
    name: "Fatima Noor",
    title: "Mehndi Artist",
    bio: "A master of traditional and contemporary mehndi designs, Fatima creates stunning bridal henna art that tells a story.",
    specializations: ["Bridal Mehndi", "Arabic Designs", "Modern Fusion"],
    yearsExperience: 10,
    image: "artist3",
  },
];

export const reviews: Review[] = [
  { id: "r1", clientName: "Hira Ahmed", rating: 5, text: "Absolutely stunning bridal makeup! Ayesha made me feel like a queen on my Barat day. The whole team was so professional and caring.", service: "Barat Package", date: "2 weeks ago" },
  { id: "r2", clientName: "Zara Sheikh", rating: 5, text: "The keratin treatment here is amazing! My hair has never looked this smooth and shiny. Will definitely be coming back.", service: "Keratin Treatment", date: "1 month ago" },
  { id: "r3", clientName: "Amina Tariq", rating: 5, text: "Fatima's mehndi work is a masterpiece. Every guest at my wedding was asking who did my mehndi!", service: "Bridal Mehndi", date: "3 weeks ago" },
  { id: "r4", clientName: "Nadia Hussain", rating: 5, text: "Best salon experience in Islamabad. The ambiance is luxurious and the staff treats you like royalty.", service: "Gold Facial", date: "1 week ago" },
  { id: "r5", clientName: "Saira Khan", rating: 5, text: "Got the Nikah package and it was worth every rupee. Looked exactly like I wanted — elegant and graceful.", service: "Nikah Package", date: "2 months ago" },
  { id: "r6", clientName: "Maria Butt", rating: 5, text: "Their nail art is incredible! The bridal nail design perfectly matched my outfit. So many compliments!", service: "Bridal Nail Art", date: "1 month ago" },
];

export const galleryItems: GalleryItem[] = [
  { id: "g1", image: "bridal1", caption: "Traditional Barat Bridal Look", category: "bridal" },
  { id: "g2", image: "mehndi1", caption: "Intricate Bridal Mehndi", category: "mehndi" },
  { id: "g3", image: "hair1", caption: "Elegant Bridal Updo", category: "hair" },
  { id: "g4", image: "skin1", caption: "Glowing Bridal Skin", category: "skin" },
  { id: "g5", image: "nails1", caption: "Rose Gold Bridal Nails", category: "nails" },
  { id: "g6", image: "bridal2", caption: "Walima Soft Glam", category: "bridal" },
  { id: "g7", image: "mehndi2", caption: "Arabic Mehndi Design", category: "mehndi" },
  { id: "g8", image: "hair2", caption: "Balayage Color", category: "hair" },
];
