import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Globe, Server, Shield, MessageCircle, Headphones, Zap, Check, ArrowRight, Star } from
'lucide-react';

const features = [
{ icon: Server, title: 'Fast VPS Hosting', desc: 'Your site runs on a dedicated VPS with blazing-fast load times and 99.9% uptime.' },
{ icon: Shield, title: 'Free SSL Certificate', desc: 'Every site gets automatic HTTPS encryption — no extra cost, no manual setup.' },
{ icon: MessageCircle, title: 'WhatsApp Integration', desc: 'Built-in WhatsApp chat button so your customers can reach you instantly.' },
{ icon: Headphones, title: '24h Support', desc: 'Our team is always available to handle updates, fixes, and any questions you have.' },
{ icon: Zap, title: 'Lightning Deploys', desc: 'Changes go live within hours. We handle the entire deployment pipeline for you.' },
{ icon: Globe, title: 'Custom Domain', desc: 'Connect your own domain with DNS management and automatic SSL provisioning.' }];


const plans = [
{
  name: 'Starter',
  price: '1,500',
  desc: 'Perfect for small shops & local businesses',
  features: ['Single-page website', 'WhatsApp button', 'Free SSL & hosting', 'Monthly content update', '24h support'],
  popular: false
},
{
  name: 'Growth',
  price: '3,000',
  desc: 'For businesses that need more power',
  features: ['Multi-page website', 'WhatsApp + contact form', 'Free SSL & hosting', 'Weekly content updates', 'Priority 24h support', 'Lite analytics dashboard', 'Custom domain setup'],
  popular: true
}];


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <Globe className="h-5 w-5" />
            WaaS-Flow
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
              <Star className="h-3 w-3 text-warning" />
              Trusted by 50+ Indian businesses
            </div>
            <h1 className="text-4xl tracking-tight md:text-6xl lg:text-7xl font-extrabold">

              <span className="block text-muted-foreground">for a Monthly Subscription</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Stop worrying about hosting, updates, and security. We handle everything so you can focus on running your business.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/login">
                  Start for ₹1,500/mo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#pricing">View Plans</a>
              </Button>
            </div>
          </div>
        </div>
        {/* Gradient blob */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Everything You Need, Nothing You Don't</h2>
            <p className="mt-2 text-muted-foreground">A complete website solution — from hosting to support.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) =>
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
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Simple, Transparent Pricing</h2>
            <p className="mt-2 text-muted-foreground">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {plans.map((plan) =>
            <Card key={plan.name} className={`relative flex flex-col border-border ${plan.popular ? 'ring-2 ring-primary shadow-lg' : ''}`}>
                {plan.popular &&
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
              }
                <CardHeader>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.desc}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold">₹{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2.5">
                    {plan.features.map((f) =>
                  <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 shrink-0 text-success" />
                        {f}
                      </li>
                  )}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    <Link to="/login">Get Started</Link>
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Globe className="h-4 w-4" />
            WaaS-Flow
          </div>
          <p>© {new Date().getFullYear()} WaaS-Flow. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>);

}