import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockClients, mockPayments } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { AlertTriangle, CreditCard, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientDashboard() {
  const { user } = useAuth();
  const client = mockClients.find(c => c.id === user?.client_id) || mockClients[0];
  const recentPayments = mockPayments.filter(p => p.client_id === client.id).slice(0, 3);

  return (
    <DashboardLayout>
      {/* Suspension Overlay */}
      {client.is_suspended && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <Card className="mx-4 max-w-md border-destructive">
            <CardContent className="py-10 text-center space-y-4">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
              <h2 className="text-xl font-bold text-destructive">Subscription Overdue</h2>
              <p className="text-sm text-muted-foreground">
                Your service has been suspended due to an overdue payment. Please submit your payment to restore access.
              </p>
              <Link to="/dashboard/payments" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <CreditCard className="h-4 w-4" />
                Make Payment
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="space-y-6">
        {/* Status Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{client.business_name}</h1>
            <p className="text-sm text-muted-foreground">{client.domain}</p>
          </div>
          <StatusBadge
            status={client.is_suspended ? 'suspended' : 'active'}
            className="text-sm px-4 py-1.5"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Service Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-lg font-bold ${client.is_suspended ? 'text-destructive' : 'text-success'}`}>
                {client.is_suspended ? 'Suspended' : 'Active'}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Due Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">{new Date(client.due_date).toLocaleDateString('en-IN')}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-success" />
                <p className="text-sm font-medium">{client.domain}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Payments */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Payments</CardTitle>
            <Link to="/dashboard/payments" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentPayments.length === 0 && <p className="text-sm text-muted-foreground">No payments yet</p>}
            {recentPayments.map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-md border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{p.month}</p>
                  <p className="text-xs text-muted-foreground">₹{p.amount.toLocaleString('en-IN')}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
