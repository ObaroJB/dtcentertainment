# DTC Entertainment — Ticketing Site

Next.js (App Router, JavaScript) + Framer Motion + Paystack + Firebase.

## 1. Install dependencies

```bash
npm install framer-motion react-icons qrcode firebase-admin resend
```

## 2. Drop these files into your project

Everything here maps 1:1 onto your existing project structure:

```
app/
  layout.js              → fonts + global metadata
  page.js                → assembles the home page
  globals.css            → design tokens + base styles
  order/success/page.js  → where Paystack redirects after payment
  scan/page.js            → door check-in scanner
  admin/page.js            → admin dashboard
  api/
    create-order/route.js    → creates a Pending order, gets Paystack checkout URL
    verify-payment/route.js  → verifies payment, generates ticket + QR, emails it
    checkin/route.js          → scans/checks in a ticket at the door
    admin/stats/route.js      → dashboard data

components/
  Navbar.js
  Hero.js
  Tickets.js
  TicketModal.js
  Team.js
  Footer.js

lib/
  firebaseAdmin.js   → Firestore connection
  paystack.js        → initialize + verify transactions
  ticket.js          → sequential ticket IDs + QR generation
  email.js           → sends the ticket email via Resend

jsconfig.json         → enables the "@/..." import alias used throughout
.env.local.example    → copy to .env.local and fill in your real keys
```

## 3. Set up your services

- **Firebase**: create a project, enable Firestore, then Project Settings →
  Service Accounts → Generate new private key. Put those three values in
  `.env.local`.
- **Paystack**: grab your secret key from the dashboard. Use `sk_test_...`
  while building, `sk_live_...` when you go live.
- **Resend**: create an API key and verify a sending domain — otherwise your
  ticket emails will land in spam or fail to send.
- **Admin key**: pick any long random string for `ADMIN_DASHBOARD_KEY` — this
  gates `/admin`.

## 4. Add your own assets

Drop these into `/public`:
- `images/event-flyer.jpg` — the ticket card flyer
- `images/hero-still.jpg`, `videos/reel-1.mp4`, `videos/reel-2.mp4` — the 3 hero slides
- `images/team-1.jpg` … `team-4.jpg` — team headshots (square photos crop nicely into the circles)

Then update the `EVENT` object in `components/Tickets.js` and `EVENT_INFO` in
`app/api/verify-payment/route.js` with your real event details — keep both in
sync since one drives the UI and the other drives the email.

## 5. How the payment flow actually works

1. Visitor fills the form in `TicketModal.js` → hits **Pay & Get Ticket**.
2. `POST /api/create-order` validates everything server-side, writes a
   `Pending` order to Firestore, and asks Paystack for a checkout URL.
3. Visitor pays on Paystack's hosted page.
4. Paystack redirects to `/order/success?reference=...`.
5. That page calls `GET /api/verify-payment`, which **re-verifies the payment
   directly with Paystack's servers** (never trusts the redirect alone),
   marks the order `Paid`, generates a sequential ticket ID + random QR
   token, and emails the ticket.
6. At the door, staff use `/scan` to check tickets in — it looks up the QR
   token, confirms payment, and blocks reuse of an already-scanned ticket.
7. `/admin` shows tickets sold, revenue, and check-ins, and can export a CSV.

## 6. Before going live

- Switch `PAYSTACK_SECRET_KEY` to your live key.
- Set `NEXT_PUBLIC_SITE_URL` to your real domain.
- Lock down Firestore security rules (the routes above use the Admin SDK, which
  bypasses client rules — but make sure no client-side code ever reads/writes
  `orders` or `tickets` directly).
- Swap the in-memory rate limiter in `create-order/route.js` for a real one
  (e.g. Upstash Redis) if you expect a high-traffic on-sale moment.
