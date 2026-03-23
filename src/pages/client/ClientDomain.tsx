import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockClients } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Copy, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function ClientDomain() {
  const { user } = useAuth();
  const client = mockClients.find(c => c.id === user?.client_id) || mockClients[0];
  const serverIp = client.server_ip || '185.158.133.1';
  const hasDnsIssue = client.status === 'dns-error';

  const copyValue = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied!`);
  };

  const steps = [
    { step: 1, title: 'Log in to your domain registrar', desc: 'Go to GoDaddy, Hostinger, Namecheap, or wherever you bought your domain.' },
    { step: 2, title: 'Open DNS Settings', desc: 'Find "DNS Management", "DNS Records", or "Name Server Settings".' },
    { step: 3, title: 'Add A Record for root domain', desc: `Type: A | Name: @ | Value: ${serverIp} | TTL: 3600` },
    { step: 4, title: 'Add A Record for www', desc: `Type: A | Name: www | Value: ${serverIp} | TTL: 3600` },
    { step: 5, title: 'Wait for propagation', desc: 'DNS changes can take up to 48 hours. Usually it takes 15-30 minutes.' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Domain Setup</h1>
          <p className="text-sm text-muted-foreground">Connect your domain to your website</p>
        </div>

        {/* Status Card */}
        <Card className={`border-2 ${hasDnsIssue ? 'border-warning' : 'border-success/50'}`}>
          <CardContent className="flex items-center gap-4 py-5">
            {hasDnsIssue ? (
              <AlertTriangle className="h-8 w-8 text-warning shrink-0" />
            ) : (
              <CheckCircle2 className="h-8 w-8 text-success shrink-0" />
            )}
            <div>
              <p className="font-semibold">
                {hasDnsIssue ? 'DNS Not Pointed' : 'Domain Connected'}
              </p>
              <p className="text-sm text-muted-foreground">
                {hasDnsIssue
                  ? `Your domain "${client.domain}" is not pointing to our server yet. Follow the steps below.`
                  : `Your domain "${client.domain}" is correctly pointing to our server.`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Domain & Server Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Your Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-chai-gold" />
                  <span className="font-mono text-sm font-medium">{client.domain}</span>
                </div>
                <Button size="sm" variant="ghost" onClick={() => copyValue('Domain', client.domain)}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Point To (Server IP)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-chai-gold">{serverIp}</span>
                <Button size="sm" variant="ghost" onClick={() => copyValue('Server IP', serverIp)}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Instructions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">How to Connect Your Domain</CardTitle>
            <CardDescription>Follow these simple steps to point your domain to our server</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {steps.map(s => (
              <div key={s.step} className="flex gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-chai-gold/10 text-xs font-bold text-chai-gold">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">{s.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Custom Instructions */}
        {client.dns_instructions && (
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Additional Notes from Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{client.dns_instructions}</p>
            </CardContent>
          </Card>
        )}

        {/* Help CTA */}
        <Card className="border-border bg-accent/30">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
            <div>
              <p className="font-medium text-sm">Need help connecting your domain?</p>
              <p className="text-xs text-muted-foreground">Our team can do it for you — just send us a message!</p>
            </div>
            <Button size="sm" className="gap-2" asChild>
              <a href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi! I need help connecting my domain "${client.domain}" to my website.`)}`} target="_blank" rel="noopener noreferrer">
                Get Help <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
