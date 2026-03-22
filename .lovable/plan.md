

# WaaS-Flow — Website-as-a-Service Management Platform

## Overview
A multi-tenant platform with three areas: public landing page, admin dashboard, and client dashboard. Built with React + Vite, styled with Shadcn UI, dark/light mode, and "Industrial Minimalism" aesthetic (Stripe Dashboard meets Linear). PocketBase integration via external API.

---

## 1. Design System & Layout
- Dark/light mode toggle with Inter/Geist fonts, high-contrast typography
- Subtle `border-slate-200` borders, micro-interactions (hover/focus states)
- Responsive sidebar layout for dashboards, full-width for landing page

## 2. Public Landing Page (`/`)
- **Hero:** "We Build, Host, and Manage Your Business Website for a Monthly Subscription" with CTA
- **Feature Grid:** Fast VPS Hosting, Free SSL, WhatsApp Integration, 24h Support (Lucide icons)
- **Pricing Section:** Two tiers (₹1,500 - ₹3,000/mo) with feature comparison
- **Footer** with contact/social links

## 3. Admin Dashboard (`/admin/*`) — Protected
- **Overview:** Stat cards (MRR, Pending Approvals with red dot, Total Live Sites)
- **Client Management Table:** Columns: Client Name, Domain, Status badge (Live/Suspended/DNS-Error), Due Date. Filterable/sortable.
- **Kill Switch:** Toggle per client with double-confirm modal → calls Dokploy API to STOP/START containers
- **Deployment Engine:** Form (Business Name, Domain, GitHub Repo URL, Dokploy App ID) → "Launch on VPS" button
- **Payment Approval Hub:** List of pending payments with uploaded UPI screenshots. Approve (increments due_date +30 days) / Reject actions.
- **Deliverables Manager:** Per-client form for Login URL, Username, Password
- **Update Requests Tab:** Tickets submitted by clients
- **Domain Watchdog:** Indicator showing if domain A-record is correctly pointed

## 4. Client Dashboard (`/dashboard/*`) — Protected
- **Status Header:** Large "Service: Active" (green) or "Service: Suspended" (red) badge
- **Suspension Overlay:** If `is_suspended`, show "Subscription Overdue" overlay blocking access
- **Credentials Vault:** Card with website login details + "Click to Copy" buttons
- **UPI Payment Portal:** QR code + UPI ID display, file upload for screenshot, payment history table (Month, Status, Amount)
- **Content Update Ticket:** Support form with text area + file upload
- **Lite Analytics:** Recharts chart showing Weekly Visitors and WhatsApp Clicks
- **100% mobile-responsive** for shop owners on phones

## 5. PocketBase Integration
- `pb.ts` helper module for PocketBase client initialization
- Auth context with login/logout for admin and client roles
- Mock data layer initially, ready to swap with live PocketBase calls
- Collections: clients, payments, tickets, deliverables, analytics

## 6. Routing & Auth
- React Router with protected route wrappers for `/admin/*` and `/dashboard/*`
- Role-based redirects (admin → admin dashboard, client → client dashboard)
- Login page at `/login`

