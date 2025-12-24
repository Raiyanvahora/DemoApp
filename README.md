# Sharma Grocery - Membership App

A premium mobile-first grocery store membership web app built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Home Page**: Store info, membership status card, quick actions
- **Products Page**: Browse products by category, add to cart
- **Membership Page**: Join/renew membership with demo payment
- **Profile Page**: View membership status, edit name
- **Cart Bar**: Sticky cart with WhatsApp order integration
- **PWA Support**: Install on phone, works offline

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- localStorage for persistence
- PWA with Service Worker

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Navigate to the project
cd grocery-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

```bash
npm run build
# Deploy the .next folder to any Node.js hosting
```

## PWA Installation

1. Open the app in Chrome/Safari on mobile
2. Tap "Add to Home Screen"
3. The app will work like a native app

## Customization

### Store Details

Edit `src/data/config.ts`:

```typescript
export const config = {
  storeName: "Your Store Name",
  storePhone: "91XXXXXXXXXX", // WhatsApp number
  membershipPrice: 200,
  deliveryRadius: "5-10 km",
};
```

### Products

Edit `src/data/products.ts` to add/modify products.

### App Icons

Replace `public/icon.svg` with your logo, then generate PNG icons:
- icon-192.png (192x192)
- icon-512.png (512x512)

## Project Structure

```
grocery-app/
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service worker
│   └── icon.svg           # App icon
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   ├── products/      # Products page
│   │   ├── membership/    # Membership page
│   │   └── profile/       # Profile page
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── BottomNav.tsx
│   │   ├── MembershipCard.tsx
│   │   ├── ProductCard.tsx
│   │   └── CartBar.tsx
│   ├── data/
│   │   ├── config.ts      # Store configuration
│   │   └── products.ts    # Product data
│   ├── lib/
│   │   ├── store.tsx      # State management
│   │   └── whatsapp.ts    # WhatsApp integration
│   └── hooks/
└── package.json
```

## License

MIT
