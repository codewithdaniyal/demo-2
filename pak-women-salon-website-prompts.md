# 🌸 Pakistani Women's Beauty Salon — Complete Cursor Vibe Coding Prompt Guide
### Demo-Ready · Supabase Integrated · Vercel Deployable · Dynamic Text Logo

---

> **How to Use This Guide:**
> Copy each prompt **step by step** into Cursor. Wait for full implementation before moving to the next step. Do NOT combine steps — Cursor performs best with focused, single-context prompts.

---

## 📋 TABLE OF CONTENTS

1. [Project Setup & Architecture](#step-1)
2. [Supabase Schema & MCP Integration](#step-2)
3. [Design System & Theme Engine](#step-3)
4. [Dynamic Text Logo & Multi-Client System](#step-4)
5. [Hero Section with Video Background](#step-5)
6. [Navigation & Mobile-First Layout](#step-6)
7. [Services Menu with Accordion](#step-7)
8. [Online Booking System](#step-8)
9. [WhatsApp & Floating CTAs](#step-9)
10. [Gallery & Instagram Feed](#step-10)
11. [Google Reviews Integration](#step-11)
12. [Team / Artists Section](#step-12)
13. [Dark Mode Implementation](#step-13)
14. [Vercel Deployment & Demo Links](#step-14)
15. [AI Image Generation Prompts](#step-15)

---

<a name="step-1"></a>
## STEP 1 — Project Setup & Architecture

### 🎯 Cursor Prompt:

```
Create a complete Next.js 14 (App Router) project for a Pakistani women's beauty salon website called "Demo Pak Women Salon". 

TECH STACK:
- Next.js 14 with App Router and TypeScript
- Tailwind CSS v3 with custom design tokens
- Supabase (via MCP) for backend
- Framer Motion for animations
- next-themes for dark/light mode
- Shadcn/ui for accessible components
- react-hook-form + zod for forms
- date-fns for date handling
- Vercel for deployment

PROJECT STRUCTURE:
Create this exact folder structure:

/app
  /[locale] (optional for future i18n)
  /(routes)
    /page.tsx               ← Homepage
    /services/page.tsx      ← Full services list
    /booking/page.tsx       ← Booking page
    /gallery/page.tsx       ← Gallery
    /team/page.tsx          ← Meet the artists
    /contact/page.tsx       ← Contact
  /api
    /booking/route.ts       ← Booking API
    /reviews/route.ts       ← Reviews proxy
/components
  /layout
    Navbar.tsx
    Footer.tsx
    FloatingCTA.tsx         ← WhatsApp + Book Now buttons
  /sections
    Hero.tsx
    Services.tsx
    BookingWidget.tsx
    Gallery.tsx
    Reviews.tsx
    Team.tsx
    Packages.tsx
  /ui                       ← Shadcn components
  /common
    TextLogo.tsx            ← Dynamic text logo (NO images)
    DarkModeToggle.tsx
    WhatsAppButton.tsx
/lib
  /supabase
    client.ts
    server.ts
    types.ts
  /config
    salon.config.ts         ← Per-client config loaded from URL/env
    theme.config.ts
  /hooks
    useBooking.ts
    useSalon.ts
    useReviews.ts
/public
  /videos                  ← Hero background videos
  /images                  ← AI-generated images

ENVIRONMENT VARIABLES needed (.env.local template):
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_SALON_SLUG=               ← This changes per demo client
NEXT_PUBLIC_INSTAGRAM_TOKEN=

Install all dependencies. Set up tsconfig.json, tailwind.config.ts with custom color tokens, and next.config.js with image domains. Initialize Shadcn/ui with the "new-york" style. Create a .env.local.example file.

Also create /lib/config/salon.config.ts that exports a getSalonConfig() function. This function reads NEXT_PUBLIC_SALON_SLUG from env (or query param ?salon=xyz on localhost) and returns a full config object with: salonName, tagline, primaryColor, accentColor, whatsappNumber, address, googleMapsLink, instagramHandle, services[], packages[]. Include 3 demo configs: "glamour-studio", "rose-beauty", "golden-touch" — each with completely different names, colors, and contact info so the same codebase works for 3 different demo clients just by changing the Vercel env variable.
```

---

<a name="step-2"></a>
## STEP 2 — Supabase Schema & MCP Integration

### 🎯 Cursor Prompt:

```
Using Supabase MCP, create the complete database schema for the Pakistani women's beauty salon website. Execute all SQL via the MCP tools directly.

CREATE THE FOLLOWING TABLES:

1. TABLE: salons
   - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - slug TEXT UNIQUE NOT NULL              ← e.g. "glamour-studio"
   - name TEXT NOT NULL
   - tagline TEXT
   - whatsapp_number TEXT
   - address TEXT
   - city TEXT
   - google_maps_link TEXT
   - instagram_handle TEXT
   - logo_text TEXT                         ← Text to display as logo
   - logo_font TEXT                         ← Google font name
   - primary_color TEXT                     ← Hex color
   - accent_color TEXT                      ← Hex color
   - hero_video_url TEXT
   - is_active BOOLEAN DEFAULT true
   - created_at TIMESTAMPTZ DEFAULT now()

2. TABLE: service_categories
   - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - salon_id UUID REFERENCES salons(id)
   - name TEXT NOT NULL                     ← e.g. "Bridal", "Hair", "Skin"
   - name_urdu TEXT                         ← Urdu translation
   - icon TEXT                              ← Lucide icon name
   - display_order INT DEFAULT 0
   - is_active BOOLEAN DEFAULT true

3. TABLE: services
   - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - salon_id UUID REFERENCES salons(id)
   - category_id UUID REFERENCES service_categories(id)
   - name TEXT NOT NULL
   - name_urdu TEXT
   - description TEXT
   - duration_minutes INT
   - price_min INT                          ← Pakistani Rupees
   - price_max INT
   - is_popular BOOLEAN DEFAULT false
   - display_order INT DEFAULT 0
   - is_active BOOLEAN DEFAULT true

4. TABLE: packages
   - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - salon_id UUID REFERENCES salons(id)
   - name TEXT NOT NULL                     ← e.g. "Barat Package", "Nikah Package"
   - name_urdu TEXT
   - description TEXT
   - includes TEXT[]                        ← Array of included services
   - price INT
   - duration_hours DECIMAL
   - is_featured BOOLEAN DEFAULT false
   - tag TEXT                               ← e.g. "Most Popular", "Best Value"
   - display_order INT DEFAULT 0

5. TABLE: artists
   - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - salon_id UUID REFERENCES salons(id)
   - name TEXT NOT NULL
   - title TEXT                             ← e.g. "Senior Makeup Artist"
   - bio TEXT
   - specializations TEXT[]
   - years_experience INT
   - image_url TEXT
   - instagram_url TEXT
   - is_active BOOLEAN DEFAULT true
   - display_order INT DEFAULT 0

6. TABLE: bookings
   - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - salon_id UUID REFERENCES salons(id)
   - client_name TEXT NOT NULL
   - client_phone TEXT NOT NULL
   - client_email TEXT
   - service_id UUID REFERENCES services(id)
   - package_id UUID REFERENCES packages(id)
   - artist_id UUID REFERENCES artists(id)
   - booking_date DATE NOT NULL
   - booking_time TIME NOT NULL
   - occasion TEXT                          ← e.g. "Barat", "Walima", "Party"
   - notes TEXT
   - status TEXT DEFAULT 'pending'          ← pending, confirmed, completed, cancelled
   - whatsapp_confirmed BOOLEAN DEFAULT false
   - created_at TIMESTAMPTZ DEFAULT now()

7. TABLE: gallery_items
   - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - salon_id UUID REFERENCES salons(id)
   - image_url TEXT NOT NULL
   - caption TEXT
   - category TEXT                          ← bridal, hair, skin, nails, mehndi
   - is_featured BOOLEAN DEFAULT false
   - display_order INT DEFAULT 0
   - created_at TIMESTAMPTZ DEFAULT now()

8. TABLE: reviews
   - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - salon_id UUID REFERENCES salons(id)
   - client_name TEXT
   - rating INT CHECK (rating BETWEEN 1 AND 5)
   - review_text TEXT
   - service_name TEXT
   - is_verified BOOLEAN DEFAULT false
   - is_featured BOOLEAN DEFAULT true
   - source TEXT DEFAULT 'google'           ← google, manual
   - created_at TIMESTAMPTZ DEFAULT now()

9. TABLE: time_slots
   - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
   - salon_id UUID REFERENCES salons(id)
   - day_of_week INT                        ← 0=Sunday, 6=Saturday
   - start_time TIME
   - end_time TIME
   - slot_duration_minutes INT DEFAULT 60
   - is_available BOOLEAN DEFAULT true

10. TABLE: blocked_dates
    - id UUID PRIMARY KEY DEFAULT gen_random_uuid()
    - salon_id UUID REFERENCES salons(id)
    - blocked_date DATE NOT NULL
    - reason TEXT
    - is_full_day BOOLEAN DEFAULT true

ENABLE ROW LEVEL SECURITY on all tables. Create policies:
- Public can read: salons, service_categories, services, packages, artists, gallery_items, reviews, time_slots
- Public can insert: bookings (anyone can book)
- Only authenticated (service_role) can do everything else

CREATE INDEXES on:
- bookings(salon_id, booking_date)
- services(salon_id, category_id)
- gallery_items(salon_id, category)

SEED DATA: Insert 3 demo salons with slug "glamour-studio", "rose-beauty", "golden-touch". For each salon insert at least 5 service categories, 20 services with PKR pricing, 3 packages (Barat, Nikah, Walima), 3 artists, 10 gallery items, 8 reviews with 5-star ratings, and time slots from 10am-8pm daily.

After creating schema, generate TypeScript types in /lib/supabase/types.ts using the Supabase CLI structure. Also create /lib/supabase/client.ts and /lib/supabase/server.ts with proper Supabase client initialization for Next.js App Router (client component vs server component usage).
```

---

<a name="step-3"></a>
## STEP 3 — Design System & Theme Engine

### 🎯 Cursor Prompt:

```
Create a comprehensive, luxury design system for a Pakistani women's beauty salon website. This must feel like a high-end spa — warm, calming, elegant, and culturally resonant for Pakistani women.

UPDATE tailwind.config.ts with these complete custom tokens:

COLORS (add all of these):
- 'champagne': { 50: '#fdf8f0', 100: '#f9eedb', 200: '#f2dbb4', 300: '#e8c27a', 400: '#dea94e', 500: '#d4903a', 600: '#b87530', 700: '#966028', 800: '#7a4e25', 900: '#654222' }
- 'terracotta': { 50: '#fdf4f0', 100: '#fbe5db', 200: '#f6c9b5', 300: '#efa285', 400: '#e57a55', 500: '#da5c35', 600: '#c44729', 700: '#a33924', 800: '#852f22', 900: '#6e2920' }
- 'rose-gold': { 50: '#fdf2f4', 100: '#fce7ea', 200: '#f9d0d7', 300: '#f4aab6', 400: '#ec7b8e', 500: '#e05270', 600: '#cb3358', 700: '#aa274a', 800: '#8f2345', 900: '#7c2240' }
- 'emerald-deep': { 500: '#1a7a5e', 600: '#156650', 700: '#115442', 800: '#0d4335', 900: '#0a3329' }
- 'cream': { 50: '#fefdf8', 100: '#fdf9ed', 200: '#faf2d3', 300: '#f6e9ac', 400: '#f0db7e', 500: '#e9cb56' }
- 'ink': { 900: '#1a1208', 800: '#2d2010', 700: '#3d2e18' }

FONTS (via Google Fonts in layout.tsx):
- Display font: 'Playfair Display' (for headings, logo)
- Body font: 'Plus Jakarta Sans' (for body text)
- Accent font: 'Cormorant Garamond' (for taglines, quotes)
- Urdu font: 'Noto Nastaliq Urdu' (for any Urdu text)

CUSTOM CSS VARIABLES in globals.css:
Create CSS custom properties for light and dark mode:
Light mode: --background: cream-50, --foreground: ink-900, --primary: champagne-500, --accent: terracotta-500
Dark mode: --background: ink-900, --foreground: cream-100, --primary: champagne-400, --accent: terracotta-400

ANIMATIONS in tailwind.config.ts:
- 'shimmer': keyframes for a gold shimmer sweep effect
- 'float': subtle up-down floating for decorative elements
- 'fade-up': fade in from below on scroll
- 'glow': subtle pulsing glow for CTA buttons

COMPONENT BASE STYLES (create /styles/components.css):
.btn-primary { champagne gradient background, rounded-full, shadow-lg, hover scale }
.btn-whatsapp { green gradient, WhatsApp brand color }
.card-luxury { glass morphism effect, subtle border, backdrop-blur }
.section-heading { Playfair Display, gradient text from champagne to terracotta }
.price-tag { champagne background badge }

Create a ThemeProvider component at /components/providers/ThemeProvider.tsx using next-themes. Wrap the entire app in it via /app/layout.tsx.

Create /app/layout.tsx with:
- HTML lang="en" dir="ltr"
- Google Fonts loaded via next/font
- ThemeProvider wrapping everything
- Inter-font fallback
- Metadata with dynamic title using salon name from config
- Open Graph tags

Create a global /styles/globals.css with smooth scrolling, custom scrollbar (champagne colored), and selection color styling.

IMPORTANT: Every color choice must feel warm, premium, and appropriate for Pakistani aesthetics — think gold embroidery, silk fabric textures, and warm candlelight.
```

---

<a name="step-4"></a>
## STEP 4 — Dynamic Text Logo & Multi-Client Demo System

### 🎯 Cursor Prompt:

```
Create a dynamic text-based logo system that allows the same deployed Vercel URL to show completely different salon branding based on an environment variable or URL parameter. NO PNG logos — everything is pure CSS + typography.

CREATE /components/common/TextLogo.tsx:

This component must:
1. Read salon config from context (getSalonConfig())
2. Display a beautifully styled text logo using:
   - Primary font: Playfair Display (serif, elegant)
   - Optional: decorative elements made purely with CSS/unicode
3. Support these visual styles based on config.logoStyle:
   - "minimal": Clean text, thin divider line, tagline below in Cormorant
   - "ornate": Text with CSS decorative flourishes (✦ or ❋) on sides
   - "stacked": Two-line stacked layout with first word large, second smaller
   - "monogram": Large single letter initial + full name beside it
4. Accept props: size ("sm" | "md" | "lg"), variant ("light" | "dark" | "colored")
5. Animate in on page load with a fade

EXAMPLE OUTPUT for "glamour-studio" config:
✦ Glamour Studio ✦
  Beauty & Wellness

EXAMPLE OUTPUT for "rose-beauty" config:
R
ROSE BEAUTY
Salon & Spa

CREATE /lib/config/salon.config.ts:

Export this full interface and 3 demo configs:

interface SalonConfig {
  slug: string
  salonName: string
  salonNameLine1: string         ← First line of logo
  salonNameLine2?: string        ← Optional second line
  logoStyle: 'minimal' | 'ornate' | 'stacked' | 'monogram'
  tagline: string
  taglineUrdu?: string           ← Optional Urdu tagline
  primaryColor: string           ← Tailwind class like "champagne"
  accentColor: string
  heroHeading: string
  heroSubheading: string
  whatsappNumber: string         ← Format: 923001234567 (no + sign)
  whatsappMessage: string        ← Pre-filled WhatsApp message
  address: string
  city: string
  phone: string
  email: string
  googleMapsLink: string
  instagramHandle: string
  facebookLink?: string
  workingHours: string
  closedOn: string
  metaTitle: string
  metaDescription: string
}

const configs: Record<string, SalonConfig> = {
  "glamour-studio": {
    slug: "glamour-studio",
    salonName: "Glamour Studio",
    salonNameLine1: "Glamour",
    salonNameLine2: "Studio",
    logoStyle: "ornate",
    tagline: "Where Every Woman Shines",
    taglineUrdu: "جہاں ہر عورت چمکتی ہے",
    primaryColor: "champagne",
    accentColor: "terracotta",
    heroHeading: "Discover Your Most Beautiful Self",
    heroSubheading: "Premium beauty services crafted for the modern Pakistani woman",
    whatsappNumber: "923001234567",
    whatsappMessage: "Hi! I'd like to book an appointment at Glamour Studio.",
    address: "123 Main Boulevard, DHA Phase 5",
    city: "Lahore",
    phone: "+92 300 123 4567",
    email: "hello@glamourstudio.pk",
    googleMapsLink: "https://maps.google.com/?q=DHA+Lahore",
    instagramHandle: "@glamourstudio.pk",
    workingHours: "10:00 AM – 8:00 PM",
    closedOn: "Monday",
    metaTitle: "Glamour Studio | Premium Beauty Salon Lahore",
    metaDescription: "Lahore's finest beauty salon for bridal, hair, skin & wellness services."
  },
  "rose-beauty": { ... /* similar with rose/pink theme, Karachi */ },
  "golden-touch": { ... /* similar with emerald/gold theme, Islamabad */ }
}

export function getSalonConfig(): SalonConfig {
  const slug = process.env.NEXT_PUBLIC_SALON_SLUG 
    || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('salon') : null)
    || 'glamour-studio'
  return configs[slug] || configs['glamour-studio']
}

CREATE /components/providers/SalonProvider.tsx:
A React context provider that calls getSalonConfig() and provides the config to all child components.

UPDATE /app/layout.tsx to wrap everything in SalonProvider.

Also create a hidden /demo page at /app/demo/page.tsx that shows all 3 salon configs side by side for client previews, with a link to switch between them.
```

---

<a name="step-5"></a>
## STEP 5 — Hero Section with Cinematic Video Background

### 🎯 Cursor Prompt:

```
Build a stunning, cinematic hero section for the Pakistani women's beauty salon website. This is the most important section — it must immediately communicate luxury, beauty, and trust to a Pakistani woman visiting on her phone.

CREATE /components/sections/Hero.tsx:

VISUAL DESIGN:
- Full viewport height (100svh for mobile safety)
- Background: HTML5 <video> element with these attributes: autoPlay muted loop playsInline preload="metadata"
- Video overlay: gradient from rgba(0,0,0,0.5) top to rgba(0,0,0,0.3) bottom PLUS a warm champagne color overlay at 15% opacity to give a golden warmth
- Fallback image if video fails to load
- On mobile: Use a high-quality static image instead of video (detect with useMediaQuery)

CONTENT LAYOUT (centered, mobile-first):
Position all content in the lower-center of the hero:

1. BADGE (top): Small pill badge with sparkle icon: "✦ Trusted by 5000+ Women in [City]"
   - Glass morphism style: backdrop-blur, white/10 background, white border
   - Animate in first with fade-down, 0.3s delay

2. MAIN HEADING:
   - Line 1: "Your Beauty," (Playfair Display, 3.5rem mobile / 6rem desktop, cream-100)
   - Line 2: "Our Passion." (same font but with champagne-400 gradient)  
   - Animate in with fade-up, 0.5s delay

3. SUBHEADING:
   - "Premium salon services for every occasion — from daily glam to your dream bridal look."
   - Plus Jakarta Sans, cream-200, smaller size
   - Animate in with fade-up, 0.7s delay

4. CTA BUTTONS (side by side on mobile):
   - Button 1: "Book Appointment" → champagne gradient, rounded-full, with calendar icon
   - Button 2: "WhatsApp Us" → white/10 glass, WhatsApp icon in green, white text
   - Both: min-height 52px (thumb-friendly), animate in with fade-up, 0.9s delay

5. SCROLL INDICATOR: Animated chevron-down at bottom center

SCROLL EFFECT:
- As user scrolls down, hero content fades out (parallax opacity)
- Video slightly zooms in on scroll (scale 1.0 to 1.1)
- Use useScroll + useTransform from Framer Motion

STATS BAR (bottom of hero, overlapping next section):
A floating card with glass morphism showing 3 stats:
- "5000+ Happy Clients"
- "8+ Years Experience"  
- "100+ Services"
Each stat has a gold number + smaller label. This bar overlaps into the next section by -40px (negative margin).

MOBILE OPTIMIZATIONS:
- On screens < 768px, use a static image background (no video — saves bandwidth)
- Text sizes reduce gracefully
- Buttons stack vertically if viewport is very narrow
- The stats bar becomes horizontal scroll on very small screens

VIDEO FILE: Reference /public/videos/hero-bg.mp4 — add a comment explaining this should be a 15-30 second looping video of a beauty salon (see AI video generation suggestions in comments)

Use Framer Motion for all animations. All animations should respect prefers-reduced-motion.
```

---

<a name="step-6"></a>
## STEP 6 — Navigation & Mobile-First Layout

### 🎯 Cursor Prompt:

```
Build a complete, mobile-first navigation system with a sticky header, mobile drawer, and floating CTAs for the Pakistani women's beauty salon website.

CREATE /components/layout/Navbar.tsx:

DESKTOP NAVBAR (hidden on mobile):
- Position: sticky top-0, z-50
- Initial state: transparent background with blur
- On scroll (>50px): white/dark glass background with border-bottom
- Smooth transition between states with useScroll

LEFT: TextLogo component (dynamic based on salon config)
CENTER: Navigation links — Home, Services, Gallery, Team, Contact
  - Active link indicator: small champagne dot below
  - Hover: champagne underline animation (width expands from 0)
RIGHT: 
  - Dark mode toggle (sun/moon icon)
  - "Book Now" button (champagne gradient, small, rounded-full)

MOBILE NAVBAR (visible on mobile, hidden desktop):
- Minimal: just TextLogo on left + hamburger menu icon on right
- Hamburger: animated 3-line to X transition with Framer Motion

MOBILE DRAWER:
- Slides in from RIGHT side (not bottom — feels more native)
- Backdrop blur overlay
- Full height drawer (100svh)
- Content:
  - Salon name + tagline at top
  - Navigation links (large, tap-friendly, min 56px each)
  - WhatsApp button (full width, green)
  - Book Now button (full width, champagne)
  - Working hours at bottom
  - Social icons (Instagram, Facebook)
- Close on: X button, backdrop click, Escape key, link click

CREATE /components/layout/FloatingCTA.tsx:

This is CRITICAL for conversions. A floating action button group that stays visible while scrolling:

DESKTOP: Fixed bottom-right corner
  - Primary: "Book Appointment" button (champagne, pill shape with calendar icon)
  - Secondary: WhatsApp round button (green circle, 52px)
  - They stack vertically with 12px gap

MOBILE: Fixed bottom bar (full width, above browser nav)
  - Two equal buttons side by side: "📅 Book Now" | "💬 WhatsApp"
  - Height: 60px, sitting above safe area inset
  - champagne gradient for Book Now, green for WhatsApp
  - Add padding-bottom: env(safe-area-inset-bottom) for iPhone notch

BEHAVIOR:
- Hide when user is in the hero section (IntersectionObserver)
- Show with slide-up animation when hero goes out of view
- Pulse animation on WhatsApp button every 5 seconds to draw attention
- On click: Book Now → /booking page | WhatsApp → opens wa.me/{number}?text={prefilledMessage}

CREATE /components/layout/Footer.tsx:

Three-column layout (stacks to one column on mobile):
Column 1: TextLogo + tagline + social icons + "Made with ❤️ in Pakistan"
Column 2: Quick links to all pages + Services submenu
Column 3: Contact info (address, phone, WhatsApp, hours) + Google Maps embed (small)

Bottom bar: Copyright + Privacy Policy + Terms links
Color: Dark background (ink-900 in light mode / deeper in dark mode), cream text

The entire site's padding and spacing must be optimized for thumbs:
- Minimum tap target: 44x44px (Apple HIG standard)  
- Body text: 16px minimum on mobile (prevents auto-zoom on iOS)
- Section padding: py-16 mobile, py-24 desktop
```

---

<a name="step-7"></a>
## STEP 7 — Services Menu with Accordion & Pricing

### 🎯 Cursor Prompt:

```
Build a comprehensive, beautifully designed services section with accordion-style pricing breakdowns for a Pakistani women's beauty salon. This section must handle ALL salon services — not just bridal.

CREATE /components/sections/Services.tsx:

SECTION LAYOUT:
- Section heading: "Our Services" with Playfair Display
- Subheading: "From everyday glam to once-in-a-lifetime moments"
- Background: soft cream/champagne gradient in light mode, deep ink in dark mode

CATEGORY TABS (sticky on scroll within section):
Horizontally scrollable pill tabs for each service category:
- All Services
- 💍 Bridal (shadi, barat, walima)
- 💇‍♀️ Hair (cut, color, treatment, keratin)
- 💆‍♀️ Skin (facials, cleanup, bleach, whitening)
- 💅 Nails (manicure, pedicure, nail art, gel)
- 👁️ Makeup (party, formal, casual, photoshoot)
- 🌿 Mehndi (bridal, party, arabic)
- 🛁 Body (waxing, threading, massage)

Tab design: 
- Active: champagne gradient background, white text
- Inactive: outlined, terracotta text
- Scrollable on mobile with hidden scrollbar

SERVICES DISPLAY — Accordion Pattern:
Each category renders as an accordion section:

<AccordionItem>
  <AccordionTrigger>
    [Icon] Category Name (e.g., "Hair Services") [chevron] [X services]
  </AccordionTrigger>
  <AccordionContent>
    Grid of service cards (2 column on mobile, 3 on desktop)
  </AccordionContent>
</AccordionItem>

SERVICE CARD DESIGN:
Each service card shows:
- Service name (bold, ink color)
- Duration: "45 min" (small, muted)
- Price: "Rs. 1,500 – 2,500" OR "Starting Rs. 800"
- "Most Popular" badge (champagne) if is_popular = true
- "Book This" button (small, outlined champagne)
- Hover: card lifts with shadow, border becomes champagne colored

PACKAGES SECTION (within the same component, below services):
A distinct "Signature Packages" subsection with card layout:

Package Card (full border, premium feel):
- Package name (large, Playfair Display): e.g., "Barat Bridal Package"
- Duration badge: "Full Day"
- Price: large, gold colored "Rs. 25,000"
- Includes list: checkmark bullets with all included services
- "Most Popular" ribbon on featured package (diagonal top-right corner)
- Book Package button (champagne gradient, full width)

PACKAGES TO INCLUDE (as seed/static data fallback):
1. Barat Bridal Package: Base makeup, hair styling, draping, jewelry setting, touch-up kit = Rs. 18,000–35,000
2. Nikah/Nikkah Package: Soft glam makeup, simple hair, mehndi = Rs. 8,000–15,000  
3. Walima Package: Party makeup, blowout, nail art = Rs. 10,000–20,000
4. Monthly Glow Package: 4 facials + 2 cleanups + threading = Rs. 5,000/month
5. Party Glam Package: Full makeup + hair = Rs. 3,500–6,000
6. Dulhan Mehndi Package: Bridal mehndi (both hands & feet) = Rs. 4,000–12,000

FAQ ACCORDION below packages:
5 common questions with answers:
- "What is included in the Barat Package?"
- "Do you do home service / on-location makeup?"
- "How early should I book for my wedding?"
- "What makeup brands do you use?"
- "Is there parking available?"

ALL DATA: Fetch from Supabase using salon_id from SalonConfig context. Show loading skeletons while fetching. Handle empty state gracefully.

Add smooth expand/collapse animation using Framer Motion AnimatePresence.
```

---

<a name="step-8"></a>
## STEP 8 — Smart Online Booking System

### 🎯 Cursor Prompt:

```
Build a complete, mobile-optimized online booking system for the Pakistani women's beauty salon website. The booking flow must feel smooth, trustworthy, and require minimal effort from the client.

CREATE /components/sections/BookingWidget.tsx AND /app/booking/page.tsx:

BOOKING FLOW — 4 Steps (wizard/stepper UI):

STEP 1: "What are you coming for?"
- Large tap-friendly cards for occasion type:
  [💒 Bridal] [🎉 Party/Event] [✂️ Hair] [✨ Skin & Facial] [💅 Nails] [🌿 Mehndi] [💇 Regular Visit]
- Cards: 2-column grid on mobile, big icons, large text
- Multi-select allowed (client can choose multiple)
- Selected state: champagne border + champagne background tint

STEP 2: "Pick your date & artist"
- Date picker: Custom calendar component (NOT a native date input)
  - Month view with tappable date cells
  - Blocked dates shown as greyed out (fetch from blocked_dates table)
  - Already-booked dates show warning if fully booked
  - Today's date highlighted in champagne
  - Only future dates selectable (7 days advance minimum for bridal)
- Time slots: Horizontal scrollable chip row
  - Fetch available slots from time_slots table
  - Already booked slots greyed out
  - Slots: 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm, 6pm, 7pm
- Artist selector: Optional horizontal scroll of artist cards
  - Each card: artist photo (or avatar), name, specialty
  - "No Preference" option always shown first

STEP 3: "Tell us about you"
Form fields (all with floating labels, mobile-optimized):
- Full Name (required)
- WhatsApp Number (required) — Pakistani format: 03XX-XXXXXXX
  Input type="tel", pattern validation for Pakistani numbers
- Email (optional)
- Special notes / Inspiration (textarea, optional)
  Placeholder: "Share any special requests, inspo photos, or occasion details..."
- How did you hear about us? (optional dropdown)

STEP 4: Confirmation Screen
- Large green checkmark animation (Framer Motion)
- Booking summary card:
  - Service selected
  - Date & time
  - Artist (if chosen)
  - Client name & phone
- Two prominent buttons:
  1. "Confirm via WhatsApp" → Opens WhatsApp with pre-filled confirmation message
     Message template: "Hi [SalonName]! I'd like to confirm my appointment:
     📅 Date: [date]
     ⏰ Time: [time]
     💄 Service: [service]
     👤 Name: [name]
     📞 Phone: [phone]"
  2. "Add to Calendar" → Creates .ics file download
- Text: "Our team will confirm your appointment within 2 hours during working hours."

BACKEND: /app/api/booking/route.ts:
POST handler that:
1. Validates all required fields with zod schema
2. Checks slot availability in Supabase (not already booked)
3. Inserts booking record into bookings table
4. Returns booking confirmation with ID

MINI BOOKING WIDGET for homepage:
A simplified version of the booking form (just date + service type + phone number) that appears as a floating card on the homepage. "Quick Book" heading. When submitted, redirects to full /booking page with pre-filled data.

USE react-hook-form + zod for all form validation.
Show inline errors in red below each field.
Disable submit button and show spinner while submitting.
All steps animate in/out with Framer Motion slide transitions.
Progress bar at top showing step 1/4, 2/4, etc.
Back button on all steps except step 1.
```

---

<a name="step-9"></a>
## STEP 9 — WhatsApp Integration & Floating CTAs

### 🎯 Cursor Prompt:

```
Implement a comprehensive WhatsApp integration system. For the Pakistani market, WhatsApp IS the primary communication channel — this must be implemented perfectly.

CREATE /components/common/WhatsAppButton.tsx:

FLOATING WHATSAPP BUTTON:
- Position: Fixed, bottom-right on desktop (above the fold, z-index 100)
- On mobile: Included in the bottom CTA bar (not floating separately)
- Design: 
  - Circle button, 60px diameter
  - WhatsApp brand green: #25D366
  - WhatsApp logo (white SVG icon)
  - Subtle shadow: 0 4px 20px rgba(37, 211, 102, 0.4)
  - Hover: scale(1.1), brighter shadow
  - Pulse animation ring every 8 seconds (green ring expands and fades)
  
NOTIFICATION BADGE:
- Small speech bubble above the button that auto-appears after 8 seconds on page
- Message: "👋 Chat with us!" 
- Dismiss on click anywhere
- Only shows once per session (sessionStorage)
- Slide-in animation from right

WHATSAPP CLICK BEHAVIOR:
On click, open: https://wa.me/{whatsappNumber}?text={encodedMessage}
Where message is: "Hi [SalonName]! I visited your website and would like to inquire about your services. 🌸"
Message is URL-encoded. Number comes from SalonConfig.

CREATE /components/common/WhatsAppShareButton.tsx:
Reusable button for sharing specific service/package details to WhatsApp:
"Share on WhatsApp" button on each service card that pre-fills: "I'm interested in [Service Name] at [Salon Name]. Price: Rs. [price]. Can I book? 💄"

WHATSAPP QUICK ACTIONS on booking confirmation (Step 4):
Generate a WhatsApp message with full booking details:

Template (dynamic):
```
Hello [SalonName]! 🌸

I would like to confirm my appointment:

📅 *Date:* [Day, Date Month Year]
⏰ *Time:* [Time]
💄 *Service:* [Service/Package Name]
👩 *Artist Preference:* [Artist Name or "No preference"]
👤 *Name:* [Client Name]
📱 *Phone:* [Phone Number]

Please confirm. Thank you! ✨
```

STICKY BANNER (appears at top on first visit):
"💬 Questions? Chat with us on WhatsApp — We reply within minutes!"
[Chat Now button] [X to dismiss]
Store dismissal in sessionStorage. Dark champagne background.

UPDATE FloatingCTA to integrate WhatsApp button properly.

IMPORTANT: Test that wa.me links work on both desktop (opens WhatsApp Web) and mobile (opens WhatsApp app). The link format must be: https://wa.me/923XXXXXXXXX?text=... with NO spaces in the number.
```

---

<a name="step-10"></a>
## STEP 10 — Gallery & Visual Portfolio

### 🎯 Cursor Prompt:

```
Build a stunning, filterable image gallery for the Pakistani women's beauty salon that showcases all work categories — bridal, hair, skin, nails, mehndi, and more.

CREATE /components/sections/Gallery.tsx AND /app/gallery/page.tsx:

HOMEPAGE GALLERY (condensed version):
- Section title: "Our Work" with Playfair Display
- Subtitle: "Real looks, real clients, real results"
- Masonry grid layout: 3 columns desktop, 2 columns tablet, 2 columns mobile
- Show 9 featured images (is_featured = true from gallery_items)
- Each image card:
  - Rounded corners (rounded-2xl)
  - Hover: overlay appears with category badge + "View" icon
  - Loading: blur placeholder (blurDataURL)
  - Aspect ratio preserved (masonry, not fixed square)
- "View Full Gallery →" button at bottom

FULL GALLERY PAGE (/gallery):
FILTER BAR (sticky):
- Category filter pills: All | Bridal | Hair | Skin | Nails | Makeup | Mehndi
- Sort by: Latest | Most Popular
- View toggle: Grid | Masonry

MASONRY GRID (Responsive):
- 4 columns desktop, 3 tablet, 2 mobile
- Infinite scroll or "Load More" button (load 12 at a time)
- Fetch from gallery_items table filtered by salon_id and category
- Each item:
  - Next.js Image component with priority={index < 4} for first row
  - Category badge (bottom left of image)
  - Hover reveals: caption text

LIGHTBOX:
On image click, open a full-screen lightbox:
- Blur backdrop
- Image centered, max 90vw / 90vh
- Left/Right navigation arrows
- Swipe gestures on mobile (touch events)
- Caption below image
- Category badge
- Share to WhatsApp button: "I love this look from [Salon Name]! 💄"
- Close on: X button, backdrop click, Escape key
- Keyboard navigation (←/→ arrows)

INSTAGRAM REEL EMBED (homepage only, below gallery grid):
A section titled "Follow us on Instagram @[handle]"
- Show 6 recent posts using Instagram Basic Display API or oEmbed
- If API not configured, show static placeholder cards with Instagram icon
- Each card links to actual Instagram post
- "Follow on Instagram" button below

BEFORE/AFTER SLIDER (optional premium section):
3 before/after comparison sliders using react-compare-image:
- Skin brightening treatment
- Hair color transformation  
- Bridal makeup before/after
Add caution: Only use if client provides before/after photos.

Performance requirements:
- All images use next/image with proper sizes prop
- Lazy loading enabled for all below-fold images  
- WebP format preferred
- Image dimensions from Supabase storage URLs
```

---

<a name="step-11"></a>
## STEP 11 — Google Reviews & Social Proof

### 🎯 Cursor Prompt:

```
Implement a dynamic social proof system that pulls in Google Reviews and displays testimonials to build immediate trust with potential clients.

CREATE /components/sections/Reviews.tsx:

SECTION DESIGN:
- Background: deep champagne/terracotta gradient (different from other sections)
- Section heading: "What Our Clients Say" 
- Star rating summary card at top:
  [★★★★★] [4.9 out of 5]
  Based on 500+ Google Reviews
  [Google logo + "See all reviews" link]

REVIEW CARDS — Infinite Horizontal Scroll (Marquee):
Create two rows of review cards that auto-scroll horizontally in opposite directions (like a marquee/ticker). PAUSE on hover.

Each review card (glass morphism style):
- Client name (first name only for privacy): "Ayesha K."
- Stars (gold, 5 out of 5, filled)
- Review text (max 150 chars, truncated with "...read more")
- Service name badge: "Bridal Makeup" or "Hair Keratin"
- Timeframe: "2 weeks ago" or "Last month"
- Verified badge (small green checkmark)
- Profile avatar: colored circle with initial (NOT real photos — privacy)

MANUAL REVIEW CARDS (always shown, from Supabase):
Below the marquee, show 3 featured reviews in large cards:
- Full review text
- 5 stars
- Client name + city
- Photo (from gallery, if client consented)
- Service received

GOOGLE REVIEWS API INTEGRATION:
Create /app/api/reviews/route.ts:
- If GOOGLE_PLACES_API_KEY is configured: Fetch from Google Places API
  GET https://maps.googleapis.com/maps/api/place/details/json?place_id={PLACE_ID}&fields=reviews,rating,user_ratings_total&key={KEY}
- Parse and return cleaned review objects
- Cache response for 1 hour (Next.js fetch cache)
- Fallback: Return mock reviews from Supabase if API not configured

TRUST BADGES SECTION:
Below reviews, a row of trust indicators:
- [🏆] "5000+ Happy Clients"
- [📍] "Serving [City] Since [Year]"  
- [✓] "Verified Google Business"
- [💳] "Easy Payment Options"
- [🚗] "Free Parking Available"

These are small cards in a horizontal scroll on mobile.

VIDEO TESTIMONIAL PLACEHOLDER:
One large card showing a "Video Testimonial" — a play button over a salon image. When clicked, show a modal. (Actual video URL can be configured in salon.config.ts)

IMPORTANT: All 5-star reviews should show authentic-sounding Pakistani names: Fatima A., Zara M., Sana K., Hina R., Ayesha B., etc. The reviews should mention specific services like "bridal makeup", "keratin treatment", "threading", etc.
```

---

<a name="step-12"></a>
## STEP 12 — Meet the Artists / Team Section

### 🎯 Cursor Prompt:

```
Build a premium "Meet Our Artists" section that showcases the salon's makeup artists and stylists, building personal connection and trust with potential clients.

CREATE /components/sections/Team.tsx AND /app/team/page.tsx:

SECTION DESIGN:
- Section title: "Meet Our Artists"
- Subtitle: "Passionate experts dedicated to your beauty journey"

ARTIST CARDS (horizontal scroll on mobile, grid on desktop):
Card design (elegant, not corporate):
- Artist photo: circular crop, 120px on homepage / 200px on team page
  - Champagne-colored ring border around photo
  - Slight shadow below
- Name: bold, Playfair Display
- Title: e.g., "Senior Bridal Artist" (muted, smaller)
- Experience badge: "8 Years Experience" (champagne pill)
- Specializations: 3 tag chips: ["Bridal", "Airbrush", "HD Makeup"]
- Short bio: 2-3 lines (truncated on card, full on modal)
- Instagram link: small Instagram icon (if artist has own account)
- "Book with [Name]" button → links to booking page with artist pre-selected

HOVER STATE on card:
- Card lifts (translateY -4px)
- Artist photo gets a champagne glow ring
- Bio text appears (if hidden)
- Social icons appear with slide-up

ARTIST MODAL (on click):
Full profile in a modal/drawer:
- Large photo (400x400px)
- Full bio
- All specializations listed
- Past work photos (linked from gallery by artist_id in future)
- "Book with [Artist Name]" CTA (prominent)
- Years of experience + achievements
- Instagram profile link

BOOKING INTEGRATION:
When "Book with [Name]" is clicked, navigate to /booking?artist=[artist_id]. The booking form Step 2 should auto-select this artist.

OWNER/DIRECTOR SPOTLIGHT:
A special highlighted card or banner for the salon owner/lead artist:
- Larger card with a quote from them
- "A message from [Owner Name]:" 
- Quote in Cormorant Garamond italic
- Their signature (text-based, cursive font)

FETCH DATA from Supabase artists table filtered by salon_id.
Loading state: skeleton cards with shimmer animation.
Empty state: "Meet our team soon" placeholder.

TEAM PAGE (/team):
Full page version with:
- Larger cards (full width on mobile)
- Full bios visible
- Search/filter by specialization
- All artists listed (not just featured)
```

---

<a name="step-13"></a>
## STEP 13 — Dark Mode Implementation

### 🎯 Cursor Prompt:

```
Implement a beautiful, seamless dark mode for the Pakistani women's beauty salon website. Dark mode should feel dramatic and luxurious — like a premium evening aesthetic where makeup looks and vibrant hair colors POP against dark backgrounds.

UPDATE ALL COMPONENTS for dark mode support using Tailwind's dark: prefix.

DARK MODE COLOR SCHEME:
Background: #1a1208 (deep warm ink, not cold gray)
Surface cards: #2d2010 (slightly lighter warm brown)
Border: #3d2e18 / 30% opacity
Primary text: cream-100 (#fdf9ed)
Secondary text: cream-300 (#f6e9ac)
Accent gold: champagne-400 (#dea94e) — MORE vibrant in dark
Accent warm: terracotta-400 (#e57a55)
Success: emerald-400
Link color: champagne-300

SPECIFIC COMPONENT UPDATES:

Navbar (dark mode):
- Background: dark ink with 80% opacity + backdrop-blur
- Logo text: cream-100
- Links: cream-200, hover champagne-400
- "Book Now" button: champagne gradient stays same

Hero (dark mode):
- Video overlay opacity slightly increased
- Text stays cream/white — no change needed
- Stats bar: dark ink background, cream text, champagne numbers

Services section (dark mode):
- Section background: ink-800
- Category tabs: ink-700 inactive, champagne active
- Service cards: ink-700 background, cream text, champagne price
- Accordion: ink-800 header, ink-700 content area

Gallery (dark mode):
- Background: ink-900
- Image cards: keep same (images don't change)
- Category badges: darker versions

Reviews (dark mode):
- Background: gradient from ink-900 to ink-800
- Review cards: ink-700 with champagne border tint
- Star rating: champagne-400

DARK MODE TOGGLE BUTTON:
Position: In navbar (desktop) and in mobile drawer
Design:
- Animated toggle that transitions between ☀️ sun and 🌙 moon icons
- Background: pill shape, transforms from cream to ink
- Use Framer Motion for the icon switch animation
- Add aria-label for accessibility

SYSTEM PREFERENCE:
On first visit, check prefers-color-scheme media query. 
Store user preference in localStorage (key: "salon-theme").
Default to system preference if no stored preference.

TRANSITION:
- Add transition: background-color 0.3s ease, color 0.3s ease to :root
- All cards, backgrounds, text should smoothly transition between modes
- Images and gradients should NOT transition (looks bad)
- Add class="transition-colors duration-300" to body

DARK MODE SPECIFIC ENHANCEMENTS:
1. In dark mode, add a subtle gold particle effect to the hero (CSS only, 3-5 floating dots)
2. Service cards in dark mode: add a thin champagne gradient border on hover
3. Gallery in dark mode: images have slightly increased contrast via CSS filter
4. WhatsApp button: stays green in both modes (brand consistency)

VERIFY all text maintains WCAG AA contrast ratio in both modes.
Test by toggling and verifying each section looks intentional, not accidental.
```

---

<a name="step-14"></a>
## STEP 14 — Vercel Deployment & Multi-Client Demo System

### 🎯 Cursor Prompt:

```
Set up the complete Vercel deployment configuration that allows the same codebase to power multiple demo salon websites, each with different branding, just by changing environment variables.

CREATE vercel.json in project root:
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sin1"],
  "env": {
    "NEXT_PUBLIC_SALON_SLUG": "glamour-studio"
  }
}

CREATE /scripts/deploy-demo.sh:
A shell script that:
1. Takes a salon slug as argument: ./deploy-demo.sh rose-beauty
2. Creates a new Vercel project with the slug as prefix in the name
3. Sets NEXT_PUBLIC_SALON_SLUG env variable to the slug
4. Deploys to Vercel
5. Outputs the live URL: https://rose-beauty-salon.vercel.app

VERCEL ENVIRONMENT VARIABLES to document (create DEPLOYMENT.md):
Required for all deployments:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SALON_SLUG (changes per client)

Optional:
- NEXT_PUBLIC_WHATSAPP_NUMBER (overrides config)
- GOOGLE_PLACES_API_KEY (for real reviews)
- NEXT_PUBLIC_INSTAGRAM_TOKEN (for real feed)
- NEXT_PUBLIC_GA_MEASUREMENT_ID (Analytics)

DEMO URL SYSTEM — Without Separate Deployments:
Create a ?salon= query parameter system that works on a SINGLE deployment:

In /app/layout.tsx or middleware.ts:
Read ?salon= from URL on client side, store in localStorage/cookie.
This allows sharing demo links like:
https://pak-salon-demo.vercel.app?salon=glamour-studio
https://pak-salon-demo.vercel.app?salon=rose-beauty
https://pak-salon-demo.vercel.app?salon=golden-touch

Each shows completely different branding, colors, content.

CREATE /app/demo/page.tsx — Client Showcase Page:
A hidden page at /demo that shows all 3 demo clients as clickable cards.
Each card shows the salon name, city, and a preview link.
Add a "For Demo Purposes Only" banner.
This page is how you show clients what their site will look like.

NEXT.JS OPTIMIZATION:
Update next.config.js:
- Image domains: ['images.unsplash.com', 'via.placeholder.com', your-supabase-url]
- Enable image optimization for WebP
- Add security headers (X-Frame-Options, CSP)
- Bundle analyzer for optimization

CREATE robots.txt and sitemap.xml generation:
/app/sitemap.ts — dynamic sitemap with all pages
/app/robots.ts — disallow /demo, /api routes

CREATE /app/not-found.tsx (404 page):
Branded 404 with:
- Salon logo
- "Page not found" message
- Links back to home, services, booking
- Beauty-related illustration or image

PERFORMANCE CHECKLIST (add as comments in relevant files):
- [ ] Lighthouse score target: 90+ on mobile
- [ ] LCP under 2.5s (hero image/video optimization)
- [ ] CLS near 0 (reserve space for images with aspect-ratio)
- [ ] FID under 100ms (no blocking scripts)
- [ ] Bundle size: warn if > 250kb gzipped

CREATE a README.md with:
- Project overview
- Setup instructions
- How to add a new salon client
- Environment variable documentation
- Deployment guide
- How to update content via Supabase
```

---

<a name="step-15"></a>
## STEP 15 — AI Image Generation Prompts

> Use these prompts with **Midjourney v6**, **DALL-E 3**, **Adobe Firefly**, or **Stable Diffusion XL**. Generated images go into `/public/images/` and Supabase Storage.

---

### 🎬 Hero Background Video / Image

**Midjourney Prompt:**
```
cinematic slow-motion beauty salon interior, Pakistani woman with flawless makeup sitting in vanity chair, warm champagne gold lighting, luxury mirror with bulb lights, soft bokeh background, terracotta and gold color palette, high-end spa ambiance, 8k photorealistic, editorial beauty photography style, warm candlelight atmosphere --ar 16:9 --style raw --v 6
```

**DALL-E 3 Prompt:**
```
A stunning, photorealistic wide-angle shot of a high-end Pakistani women's beauty salon interior. Warm champagne and gold lighting fills the room. A beautifully dressed Pakistani woman sits at a luxury vanity mirror surrounded by Hollywood-style bulb lights. The decor features terracotta walls, gold accents, silk drapes in cream and rose gold. Bokeh background effect. Editorial beauty magazine quality. Cinematic 16:9 composition.
```

---

### 💄 Bridal Makeup / Barat Look

```
close-up portrait of a Pakistani bride with full bridal makeup, heavy glamour, smoky eyes with gold glitter, perfectly contoured face, deep red lips, intricate gold jewelry (maang tikka, jhumkas), wearing red and gold lehenga dupatta, flawless airbrushed skin, studio lighting, beauty editorial photography, shallow depth of field, champagne background, ultra-detailed, photorealistic --ar 3:4 --v 6
```

---

### 💇‍♀️ Hair Services

```
Pakistani woman at luxury hair salon, stylist blow-drying long silky black hair, warm golden salon interior, professional hairstylist wearing all-black uniform, focused composition on hair and hands, soft bokeh background with salon mirrors, warm champagne lighting, lifestyle photography style, editorial quality --ar 4:5 --v 6
```

```
split composition showing hair color transformation, before dark natural hair, after rich chocolate balayage highlights, Pakistani woman smiling in salon chair, luxury salon interior, warm lighting, before/after photography style --ar 3:2 --v 6
```

---

### 💆‍♀️ Skin & Facial Treatments

```
Pakistani woman receiving luxury facial treatment, white spa robe, cucumber slices on eyes, glowing flawless skin, serene expression, clean white and gold spa interior, soft ambient lighting, peace and relaxation atmosphere, beauty editorial, overhead/three-quarter angle --ar 4:5 --v 6
```

```
close-up of glowing flawless Pakistani woman's face after skin brightening facial, visible skin texture improvement, dewy healthy glow, natural makeup, warm side lighting, beauty photography, skin product advertisement style --ar 1:1 --v 6
```

---

### 💅 Nail Art

```
close-up macro photography of perfectly manicured Pakistani woman's hands, intricate nail art in champagne gold and terracotta ombre design with tiny floral details, fresh manicure, soft blurred background with rose petals, beauty editorial photography, ultra detailed, luxury nail salon aesthetic --ar 4:5 --v 6
```

```
overhead flat lay of woman's hands with bridal mehndi (henna) design and nail extensions, gold jewelry rings, red and gold traditional outfit fabric visible, white marble surface, beauty editorial, Pakistani bridal styling --ar 1:1 --v 6
```

---

### 🌿 Mehndi / Henna

```
close-up of two hands covered in intricate traditional Pakistani bridal mehndi, detailed floral and paisley henna patterns, gold bangles, red and gold fabric in background, warm lighting, beauty photography --ar 4:5 --v 6
```

```
Pakistani mehndi artist applying fresh henna on a woman's hand, intricate design in progress, cone henna applicator visible, warm golden lighting, selective focus on hands, shallow depth of field --ar 3:2 --v 6
```

---

### 👁️ Party / Event Makeup

```
Pakistani woman in formal party makeup, dramatic smoky eyes, highlighted cheekbones, glossy nude-rose lips, wearing formal shalwar kameez in teal and gold, elegant jewelry, confident smile, studio portrait, champagne background, beauty photography, magazine quality --ar 3:4 --v 6
```

---

### 🏠 Salon Interior Images

**Reception Area:**
```
luxurious Pakistani beauty salon reception area, warm champagne gold color scheme, cream marble floors, fresh pink and white flowers on reception desk, crystal chandelier, soft ambient lighting, clean modern design with traditional Pakistani motifs, welcoming and premium atmosphere --ar 16:9 --v 6
```

**Treatment Room:**
```
elegant beauty treatment room interior, white treatment bed with champagne satin covers, vanity mirror with bulb lights, small gold accents, potted green plants, product jars neatly arranged, warm soft lighting, spa ambiance, minimalist luxury --ar 16:9 --v 6
```

**Salon Station:**
```
luxury hair salon styling station, large mirror with vanity lights, professional hairstyling tools organized on marble shelf, comfortable velvet chair in champagne color, blurred client in background, warm golden lighting, upscale salon aesthetic --ar 4:5 --v 6
```

---

### 👩‍🎨 Artist / Team Photos

```
professional portrait of Pakistani female makeup artist in her 30s, wearing elegant black uniform, neutral background, warm studio lighting, confident smile, holding makeup brush, professional headshot style, beauty industry, editorial quality --ar 3:4 --v 6
```

*(Generate 3-4 variations with different skin tones, ages, and hairstyles for team diversity)*

---

### 📱 Instagram-Style Grid Content

**Before/After Skin:**
```
split-screen before and after skin transformation, same Pakistani woman, before: uneven skin tone with spots, after: glowing even bright complexion, same lighting and angle, clinical beauty photography, realistic not over-edited --ar 1:1 --v 6
```

**Hair Transformation:**
```
split diptych, Pakistani woman, left side: dull dry frizzy hair, right side: glossy straight shiny hair after keratin treatment, same white studio background, beauty transformation photography --ar 1:1 --v 6
```

---

### 🎨 Background & Texture Images

**Hero Background (abstract/texture):**
```
abstract luxury background, champagne gold silk fabric texture, soft light waves, warm terracotta tones, subtle bokeh, high-resolution, full-frame texture, suitable as website background, 8k quality --ar 16:9 --v 6
```

**Section Divider / Decorative:**
```
flat lay of beauty products, gold and rose gold makeup items, lipstick, mascara, eyeshadow palette, loose rose petals, on champagne marble surface, symmetrical composition, luxury beauty brand editorial --ar 16:9 --v 6
```

---

## 📊 Image Specifications for Web Use

| Usage | Dimensions | Format | Max Size |
|-------|-----------|--------|----------|
| Hero background | 1920×1080px | WebP | 300KB |
| Gallery items | 800×1000px | WebP | 150KB |
| Team photos | 600×600px | WebP | 100KB |
| Service cards | 400×300px | WebP | 80KB |
| Package thumbnails | 600×400px | WebP | 100KB |
| Instagram grid | 1080×1080px | WebP | 200KB |

> **Tool Tip:** After generating with AI, run images through [Squoosh](https://squoosh.app) or `next/image` to compress to WebP. Upload to Supabase Storage bucket `salon-images` organized in folders: `/hero`, `/gallery`, `/team`, `/services`.

---

## 🚀 Final Deployment Checklist

```
□ Supabase schema created and seeded
□ 3 salon configs in salon.config.ts  
□ All pages render correctly in light and dark mode
□ Mobile responsive at 375px, 390px, 430px widths
□ WhatsApp link tested (opens app on mobile, web on desktop)
□ Booking form submits to Supabase
□ Images loading with proper lazy loading
□ Lighthouse mobile score > 85
□ ?salon= parameter changes branding without page reload
□ Demo page at /demo showing all 3 clients
□ Vercel deployment successful
□ Custom domain configured (optional for demo: [salonname].vercel.app)
□ Environment variables set in Vercel dashboard
□ robots.txt disallows /demo and /api
```

---

## 🎨 Quick Color Reference for Developers

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `primary` | champagne-500 | champagne-400 | Buttons, accents |
| `accent` | terracotta-500 | terracotta-400 | Hover, highlights |
| `background` | cream-50 | ink-900 | Page background |
| `surface` | white | ink-800 | Cards |
| `border` | cream-200 | ink-700 | Dividers |
| `text-primary` | ink-900 | cream-100 | Headings |
| `text-muted` | ink-700 | cream-300 | Body text |

---

*Built with ❤️ for Pakistani women everywhere. This guide is designed for Cursor AI with Supabase MCP integration, optimized for Vercel deployment.*
