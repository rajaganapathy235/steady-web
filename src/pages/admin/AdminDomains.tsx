import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { mockClients, type Client } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/StatusBadge';
import { Save, Globe, Server, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDomains() {
  const [clients, setClients] = useState<Client[]>(mockClients);

  const updateClient = (id: string, field: keyof Client, value: string) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const save = (name: string) => {
    toast.success(`Domain config saved for ${name}`);
  };

  const copyInstructions = (client: Client) => {
    const text = `Domain Setup for ${client.business_name}\n\nPoint your domain "${client.domain}" to our server:\n\n1. Go to your domain registrar (GoDaddy, Hostinger, etc.)\n2. Find DNS Settings\n3. Add/Update A Record:\n   • Type: A\n   • Name: @ (root domain)\n   • Value: ${client.server_ip || 'Not set'}\n   • TTL: 3600\n4. Add A Record for www:\n   • Type: A\n   • Name: www\n   • Value: ${client.server_ip || 'Not set'}\n   • TTL: 3600\n\nDNS changes can take up to 48 hours to propagate.`;
    navigator.clipboard.writeText(text);
    toast.success('DNS instructions copied!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Domain Management</h1>
          <p className="text-sm text-muted-foreground">Configure server IPs and DNS settings for each client</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {clients.map(client => (
            <Card key={client.id} className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="h-4 w-4 text-chai-gold" />
                    {client.business_name}
                  </CardTitle>
                  <StatusBadge status={client.status} />
                </div>
                <p className="text-xs text-muted-foreground">{client.domain}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1.5">
                    <Server className="h-3 w-3" />
                    Server IP Address
                  </Label>
                  <Input
                    value={client.server_ip || ''}
                    onChange={e => updateClient(client.id, 'server_ip', e.target.value)}
                    placeholder="185.199.108.1"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Custom DNS Instructions (optional)</Label>
                  <Textarea
                    value={client.dns_instructions || ''}
                    onChange={e => updateClient(client.id, 'dns_instructions', e.target.value)}
                    placeholder="Any special DNS notes for this client..."
                    rows={2}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 gap-2" onClick={() => save(client.business_name)}>
                    <Save className="h-3.5 w-3.5" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => copyInstructions(client)}>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Instructions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
