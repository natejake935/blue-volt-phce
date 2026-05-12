# Blue Volt Electrical — Setup

## Requirements
- Node.js 18+ (install from https://nodejs.org)
- npm (comes with Node.js)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:3000        → Homepage
# http://localhost:3000/schedule  → Booking flow
```

## Build for production
```bash
npm run build
npm start
```

## Project Structure

```
app/
  page.tsx              → Homepage
  layout.tsx            → Root layout + fonts
  globals.css           → Tailwind + custom classes
  schedule/
    page.tsx            → Schedule page (Suspense wrapper)
    ScheduleClient.tsx  → Booking flow state machine

components/
  Header.tsx            → Sticky nav header
  Footer.tsx            → Site footer
  Logo.tsx              → Logo with lightning bolt
  Button.tsx            → Reusable button
  BookingCard.tsx       → White card wrapper
  AvailabilityCard.tsx  → Time slot availability card
  ServiceCard.tsx       → Service icon card
  TeamCard.tsx          → Team member card
  TrustBadge.tsx        → Icon + label trust badge

  home/
    HeroSection.tsx     → Full hero with ZIP widget
    AreaAvailability.tsx→ Live availability strip
    HowItWorks.tsx      → 3-step process
    ServicesSection.tsx → Service grid
    TrustBand.tsx       → Navy trust + testimonials
    TeamSection.tsx     → 8-member team grid
    ServiceAreaSection.tsx → Map + ZIP coverage
    BottomCTA.tsx       → Final CTA bar
    MobileStickyBar.tsx → Mobile sticky bottom buttons

  booking/
    ProgressIndicator.tsx → Step 1-4 progress bar
    ZipStep.tsx           → Step 1: Enter ZIP
    WindowStep.tsx        → Step 2: Pick time window
    InfoStep.tsx          → Step 3: Customer details
    ReviewStep.tsx        → Step 4: Review & submit
    ConfirmationStep.tsx  → Success screen
```

## Backend Integration Points

Search for `// Backend hook:` comments in the code for:
- IP geolocation → ZIP detection (ZipStep.tsx)
- ZIP → zone/neighborhood mapping (WindowStep.tsx, ScheduleClient.tsx)
- Real-time technician availability (WindowStep.tsx)
- Appointment POST to CRM/webhook (ScheduleClient.tsx)
- SMS confirmation via Twilio (ScheduleClient.tsx)
- Dispatcher dashboard notification (ScheduleClient.tsx)

## Colors (from tailwind.config.ts)
- brand-blue: #0B63F6
- brand-navy: #061A33
- brand-yellow: #FFD21E
- brand-green: #16A34A
- brand-red: #DC2626
