import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { mockClients, type Client } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDeliverables() {
  const [clients, setClients] = useState<Client[]>(mockClients);

  const updateClient = (id: string, field: keyof Client, value: string) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const save = (name: string) => {
    // TODO: Save to PocketBase
    toast.success(`Deliverables saved for ${name}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deliverables</h1>
          <p className="text-sm text-muted-foreground">Manage client login credentials</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {clients.map(client => (
            <Card key={client.id} className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{client.business_name}</CardTitle>
                <p className="text-xs text-muted-foreground">{client.domain}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Login URL</Label>
                  <Input value={client.login_url || ''} onChange={e => updateClient(client.id, 'login_url', e.target.value)} placeholder="https://domain.com/admin" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Username</Label>
                    <Input value={client.login_username || ''} onChange={e => updateClient(client.id, 'login_username', e.target.value)} placeholder="admin" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Password</Label>
                    <Input type="password" value={client.login_password || ''} onChange={e => updateClient(client.id, 'login_password', e.target.value)} placeholder="••••••" />
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full gap-2" onClick={() => save(client.business_name)}>
                  <Save className="h-3.5 w-3.5" />
                  Save
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
