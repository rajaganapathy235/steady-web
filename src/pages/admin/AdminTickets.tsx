import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockTickets, type Ticket } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AdminTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const updateStatus = (id: string, status: Ticket['status']) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    toast.success('Ticket updated');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Update Requests</h1>
          <p className="text-sm text-muted-foreground">{tickets.filter(t => t.status !== 'resolved').length} open tickets</p>
        </div>

        <div className="space-y-3">
          {tickets.map(ticket => (
            <Card key={ticket.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{ticket.subject}</p>
                      <StatusBadge status={ticket.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">from {ticket.client_name} · {new Date(ticket.created).toLocaleDateString('en-IN')}</p>
                    <p className="text-sm text-muted-foreground mt-2">{ticket.description}</p>
                  </div>
                  <Select value={ticket.status} onValueChange={(v) => updateStatus(ticket.id, v as Ticket['status'])}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
