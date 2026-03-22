import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockClients, type Client } from '@/lib/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Search, AlertTriangle, Globe } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [search, setSearch] = useState('');
  const [killTarget, setKillTarget] = useState<Client | null>(null);
  const [confirmText, setConfirmText] = useState('');

  const filtered = clients.filter(c =>
    c.business_name.toLowerCase().includes(search.toLowerCase()) ||
    c.domain.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (client: Client) => {
    if (client.status === 'live') {
      setKillTarget(client);
      setConfirmText('');
    } else {
      // Start container
      setClients(prev => prev.map(c => c.id === client.id ? { ...c, status: 'live' as const, is_suspended: false } : c));
      toast.success(`${client.business_name} container started`);
    }
  };

  const confirmKill = () => {
    if (!killTarget || confirmText !== killTarget.domain) return;
    setClients(prev => prev.map(c => c.id === killTarget.id ? { ...c, status: 'suspended' as const, is_suspended: true } : c));
    toast.success(`${killTarget.business_name} container stopped`);
    setKillTarget(null);
  };

  // Simple DNS check indicator (mock)
  const DnsIndicator = ({ domain }: { domain: string }) => {
    const ok = !domain.includes('mumbai'); // mock: mumbai domain has dns issue
    return (
      <div className="flex items-center gap-1.5" title={ok ? 'DNS OK' : 'DNS not pointed'}>
        <Globe className={`h-3.5 w-3.5 ${ok ? 'text-success' : 'text-warning'}`} />
        <span className="text-xs text-muted-foreground">{ok ? 'OK' : 'Check'}</span>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
            <p className="text-sm text-muted-foreground">{clients.length} total clients</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search clients…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>

        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>DNS</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Kill Switch</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(client => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.business_name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{client.domain}</TableCell>
                  <TableCell><DnsIndicator domain={client.domain} /></TableCell>
                  <TableCell><StatusBadge status={client.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(client.due_date).toLocaleDateString('en-IN')}</TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={client.status === 'live'}
                      onCheckedChange={() => handleToggle(client)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Kill Switch Confirmation */}
      <Dialog open={!!killTarget} onOpenChange={() => setKillTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Stop Container
            </DialogTitle>
            <DialogDescription>
              This will immediately stop <strong>{killTarget?.business_name}</strong>'s website. Their site will go offline.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Type <strong className="text-foreground">{killTarget?.domain}</strong> to confirm:
            </p>
            <Input
              value={confirmText}
              onChange={e => setConfirmText(e.target.value)}
              placeholder={killTarget?.domain}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setKillTarget(null)}>Cancel</Button>
            <Button variant="destructive" disabled={confirmText !== killTarget?.domain} onClick={confirmKill}>
              Stop Container
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
