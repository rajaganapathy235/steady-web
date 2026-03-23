import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Server, Shield, MessageCircle, Headphones, Zap, Check, ArrowRight, Star,
} from 'lucide-react';
import chaiLogo from '@/assets/chaiclick-logo.png';

const BrandLogo = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
  <span className="flex items-center gap-2">
    <img src={chaiLogo} alt="ChaiClick" className={size === 'md' ? 'h-7 w-7' : 'h-5 w-5'} />
    <span className="font-semibold tracking-tight">ChaiClick</span>
  </span>
);

const features = [
  { icon: Server, title: 'Fast VPS Hosting', desc: 'Your site runs on a dedicated VPS with blazing-fast load times and 99.9% uptime.' },
  { icon: Shield, title: 'Free SSL Certificate', desc: 'Every site gets automatic HTTPS encryption — no extra cost, no manual setup.' },
  { icon: MessageCircle, title: 'WhatsApp Integration', desc: 'Built-in WhatsApp chat button so your customers can reach you instantly.' },
  { icon: Headphones, title: '24h Support', desc: 'Our team is always available to handle updates, fixes, and any questions you have.' },
  { icon: Zap, title: 'Lightning Deploys', desc: 'Changes go live within hours. We handle the entire deployment pipeline for you.' },
  { icon: Shield, title: 'Custom Domain', desc: 'Connect your own domain with DNS management and automatic SSL provisioning.' },
];

const allFeatures = [
  'WhatsApp Chat Button',
  'Free SSL & VPS Hosting',
  'Lite Analytics Dashboard',
  'Custom Domain Setup',
  '24h Priority Support',
];

const plans = [
  {
    name: 'Starter',
    type: 'Single-Page Static Website',
    price: '560',
    daily: '20',
    anchor: 'Less than the cost of a daily Chai & Vada ☕',
    highlight: 'Perfect for portfolios and simple menus.',
    badge: null,
    extra: null,
    popular: false,
  },
  {
    name: 'Growth',
    type: 'Full Dynamic Webapp',
    price: '840',
    daily: '30',
    anchor: 'Less than the cost of a Special Tea & Snack ☕🍪',
    highlight: null,
    badge: 'Best Seller',
    extra: 'Includes Private Admin Dashboard: Update your prices, photos, and services instantly from your phone.',
    popular: true,
  },
];

function whatsappLink(planName: string, price: string) {
  const msg = encodeURIComponent(
    `Hi! I want to start my business website on the ${planName} plan for ₹${price}. Please help me set it up!`
  );
  return `https://wa.me/919999999999?text=${msg}`;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Star className="h-3 w-3 text-primary" />
              Trusted by 50+ Indian businesses
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              Your Business Website for the Price of a Chai.
              <span className="block text-muted-foreground">One Cup of Chai. One World-Class Website.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Just ₹20/day. Stop worrying about hosting, updates, and security. We handle everything so you can focus on running your business.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Powered by <strong>OneCupCode</strong></p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <a href="#pricing">
                  Start for ₹560/28 days
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#pricing">View Plans</a>
              </Button>
            </div>
          </div>
        </div>
        {/* Gradient blob */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Everything You Need, Nothing You Don't</h2>
            <p className="mt-2 text-muted-foreground">A complete website solution — from hosting to support.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(f => (
              <Card key={f.title} className="group border-border bg-card transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Simple 28-Day Pricing</h2>
            <p className="mt-2 text-muted-foreground">No contracts. No commitments. Pay every 28 days.</p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {plans.map(plan => (
              <Card key={plan.name} className={`relative flex flex-col border-border ${plan.popular ? 'ring-2 ring-primary shadow-lg' : ''}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground shadow-sm">{plan.badge}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.type}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold">₹{plan.price}</span>
                    <span className="text-muted-foreground"> / 28 days</span>
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-primary">
                    Only ₹{plan.daily}/day — {plan.anchor}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
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
                  <ul className="space-y-2.5">
                    {allFeatures.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 shrink-0 text-success" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 space-y-2">
                  <Button asChild className="w-full gap-2" variant={plan.popular ? 'default' : 'outline'}>
                    <a href={whatsappLink(plan.name, plan.price)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      Get Started
                    </a>
                  </Button>
                  <p className="text-[10px] text-center text-muted-foreground">
                    Expertly brewed by <strong>OneCupCode</strong> | © 2026 ChaiClick
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <img src={chaiLogo} alt="ChaiClick" className="h-4 w-4" />
            ChaiClick
            <span className="ml-1 text-[10px] font-normal text-muted-foreground">Powered by OneCupCode</span>
          </div>
          <p>Expertly brewed by OneCupCode | © {new Date().getFullYear()} ChaiClick</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
