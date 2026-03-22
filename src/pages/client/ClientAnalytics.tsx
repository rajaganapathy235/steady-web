import { DashboardLayout } from '@/components/DashboardLayout';
import { mockAnalytics } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

export default function ClientAnalytics() {
  const totalVisitors = mockAnalytics.reduce((a, b) => a + b.visitors, 0);
  const totalClicks = mockAnalytics.reduce((a, b) => a + b.whatsapp_clicks, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lite Analytics</h1>
          <p className="text-sm text-muted-foreground">Your website performance at a glance</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Visitors (6 weeks)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalVisitors.toLocaleString('en-IN')}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">WhatsApp Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalClicks.toLocaleString('en-IN')}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4" />
              Weekly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} name="Visitors" />
                  <Line type="monotone" dataKey="whatsapp_clicks" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} name="WhatsApp Clicks" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
