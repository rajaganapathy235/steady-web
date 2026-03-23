import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import {
  Globe, Server, Shield, MessageCircle, Headphones, Zap, Check, ArrowRight,
  Star, Home, Layers, CreditCard, Phone, Download, Bell, BarChart3, Palette,
} from "lucide-react";
import { useState, useEffect } from "react";

/* ─── Features ─── */
const features = [
  { icon: Server, title: "Fast VPS Hosting", desc: "Dedicated VPS with blazing-fast load times and 99.9% uptime guarantee." },
  { icon: Shield, title: "Free SSL Certificate", desc: "Automatic HTTPS encryption on every site — zero config required." },
  { icon: MessageCircle, title: "WhatsApp Integration", desc: "Built-in WhatsApp chat so customers reach you in one tap." },
  { icon: Headphones, title: "24h Support", desc: "Our team handles updates, fixes, and every question you have." },
  { icon: BarChart3, title: "Lite Analytics", desc: "Track visitors & WhatsApp clicks with a simple dashboard." },
  { icon: Palette, title: "Custom Domain", desc: "Your own domain with DNS management and auto SSL." },
];

/* ─── Plans ─── */
const allFeatures = [
  "WhatsApp Chat Button",
  "Free SSL & VPS Hosting",
  "Lite Analytics Dashboard",
  "Custom Domain Setup",
  "24h Priority Support",
];

const plans = [
  {
    name: "Starter",
    type: "Single-Page Static Website",
    price: "560",
    daily: "20",
    anchor: "Less than the cost of a daily Chai & Vada ☕",
    highlight: "Perfect for portfolios and simple menus.",
    badge: null,
    extra: null,
    popular: false,
  },
  {
    name: "Growth",
    type: "Full Dynamic Webapp",
    price: "840",
    daily: "30",
    anchor: "Less than the cost of a Special Tea & Snack ☕🍪",
    highlight: null,
    badge: "Best Seller",
    extra: "Includes Private Admin Dashboard: Update your prices, photos, and services instantly from your phone.",
    popular: true,
  },
];

function whatsappLink(planName: string, price: string) {
  const msg = encodeURIComponent(
    `Hi! I want to start my business website on the ${planName} plan for ₹${price}. Please help me set it up!`
  );
  return `https://wa.me/919999999999?text=${msg}`;
}

/* ─── Bottom Nav ─── */
const navItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: Layers, label: "Features", href: "#features" },
  { icon: CreditCard, label: "Pricing", href: "#pricing" },
  { icon: Phone, label: "Contact", href: "#contact" },
];

/* ─── Notification Popup ─── */
function NotificationPopup({ onClose }: { onClose: () => void }) {
  const requestPermission = async () => {
    if ("Notification" in window) {
      await Notification.requestPermission();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-card border border-border p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Bell className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Get instant alerts for your business — renewal reminders, site updates, and support replies.
        </p>
        <div className="mt-5 flex gap-3">
          <Button onClick={onClose} variant="ghost" size="sm" className="flex-1">
            Not Now
          </Button>
          <Button onClick={requestPermission} size="sm" className="flex-1 gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            Allow
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function LandingPage() {
  const { canInstall, install } = usePWAInstall();
  const [showNotif, setShowNotif] = useState(false);
  const [activeNav, setActiveNav] = useState("#");

  // Show notification popup after 5 seconds
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      const t = setTimeout(() => setShowNotif(true), 5000);
      return () => clearTimeout(t);
    }
  }, []);

  // Track scroll position for bottom nav
  useEffect(() => {
    const onScroll = () => {
      const sections = ["#contact", "#pricing", "#features", "#"];
      for (const id of sections) {
        if (id === "#") { setActiveNav("#"); break; }
        const el = document.querySelector(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 md:pb-0">
      {showNotif && <NotificationPopup onClose={() => setShowNotif(false)} />}

      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-foreground">
            <Globe className="h-5 w-5 text-primary" />
            WaaS-Flow
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {canInstall && (
              <Button onClick={install} variant="outline" size="sm" className="gap-1.5 hidden sm:inline-flex">
                <Download className="h-3.5 w-3.5" />
                Install App
              </Button>
            )}
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Star className="h-3 w-3 text-warning" />
              Trusted by 50+ Indian businesses
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Your Business Website
              <span className="block text-muted-foreground">for ₹20/day</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground leading-relaxed">
              We build, host, and manage your website — so you can focus on running your business. No tech skills needed.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto gap-2">
                <a href="#pricing">
                  See Plans from ₹560
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              {canInstall && (
                <Button onClick={install} variant="outline" size="lg" className="w-full sm:w-auto gap-2 sm:hidden">
                  <Download className="h-4 w-4" />
                  Install App
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Everything Included</h2>
            <p className="mt-2 text-sm text-muted-foreground">No hidden fees. Every plan gets the full stack.</p>
          </div>
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="border-border bg-card transition-shadow hover:shadow-md">
                <CardHeader className="p-4 pb-2">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-semibold">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Simple 28-Day Pricing</h2>
            <p className="mt-2 text-sm text-muted-foreground">No contracts. No commitments. Pay every 28 days.</p>
          </div>
          <div className="mx-auto grid max-w-2xl gap-5 md:grid-cols-2">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col border-border ${
                  plan.popular ? "ring-2 ring-primary shadow-xl" : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground shadow-sm">{plan.badge}</Badge>
                  </div>
                )}
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{plan.type}</p>
                  <div className="mt-3">
                    <span className="text-4xl font-extrabold tracking-tight">₹{plan.price}</span>
                    <span className="text-sm text-muted-foreground"> / 28 days</span>
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-primary">
                    Only ₹{plan.daily}/day — {plan.anchor}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 p-5 pt-0">
                  {plan.highlight && (
                    <p className="mb-3 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground leading-relaxed">
                      {plan.highlight}
                    </p>
                  )}
                  {plan.extra && (
                    <p className="mb-3 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2 text-xs text-foreground font-medium leading-relaxed">
                      {plan.extra}
                    </p>
                  )}
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    All Growth Features
                  </p>
                  <ul className="space-y-2">
                    {allFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-3.5 w-3.5 shrink-0 text-success" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-5 pt-0">
                  <Button asChild className="w-full gap-2" variant={plan.popular ? "default" : "outline"}>
                    <a href={whatsappLink(plan.name, plan.price)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      Get Started
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact / Footer ─── */}
      <footer id="contact" className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <Globe className="h-4 w-4 text-primary" />
              WaaS-Flow
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} WaaS-Flow. All rights reserved.</p>
            <div className="flex gap-5 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href={whatsappLink("Growth", "840")} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Floating Bottom Nav (mobile) ─── */}
      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/90 backdrop-blur-md md:hidden">
        <div className="flex h-14 items-center justify-around">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                activeNav === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
