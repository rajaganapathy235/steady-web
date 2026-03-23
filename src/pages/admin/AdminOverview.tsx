import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/DashboardLayout';
import { mockMRR, mockPendingApprovals, mockLiveSites, mockClients } from '@/lib/mock-data';
import { StatusBadge } from '@/components/StatusBadge';
import { IndianRupee, AlertCircle, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Monthly Revenue', value: `₹${mockMRR.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-success' },
  { label: 'Pending Approvals', value: mockPendingApprovals, icon: AlertCircle, color: 'text-warning', badge: true },
  { label: 'Live Sites', value: mockLiveSites, icon: Globe, color: 'text-primary' },
  { label: 'Total Clients', value: mockClients.length, icon: Users, color: 'text-muted-foreground' },
];

export default function AdminOverview() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your ChaiClick business</p>
        </div>

        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(s => (
            <Card key={s.label} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <div className="relative">
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                  {s.badge && mockPendingApprovals > 0 && (
                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-destructive" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Clients */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Clients</CardTitle>
            <Link to="/admin/clients" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockClients.slice(0, 4).map(client => (
                <div key={client.id} className="flex items-center justify-between rounded-md border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">{client.business_name}</p>
                    <p className="text-xs text-muted-foreground">{client.domain}</p>
                  </div>
                  <StatusBadge status={client.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
