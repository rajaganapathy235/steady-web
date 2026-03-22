import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockPayments, type Payment } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, X, Image } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [viewScreenshot, setViewScreenshot] = useState<string | null>(null);

  const pending = payments.filter(p => p.status === 'pending');
  const history = payments.filter(p => p.status !== 'pending');

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: action } : p));
    toast.success(`Payment ${action}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payment Approvals</h1>
          <p className="text-sm text-muted-foreground">{pending.length} pending review</p>
        </div>

        {/* Pending */}
        <div className="space-y-3">
          {pending.length === 0 && (
            <Card className="border-border"><CardContent className="py-8 text-center text-sm text-muted-foreground">No pending payments 🎉</CardContent></Card>
          )}
          {pending.map(p => (
            <Card key={p.id} className="border-border">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <p className="font-medium">{p.client_name}</p>
                  <p className="text-sm text-muted-foreground">{p.month} · ₹{p.amount.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex items-center gap-2">
                  {p.screenshot_url && (
                    <Button variant="outline" size="sm" onClick={() => setViewScreenshot(p.screenshot_url!)}>
                      <Image className="mr-1 h-3.5 w-3.5" />
                      Screenshot
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleAction(p.id, 'rejected')}>
                    <X className="mr-1 h-3.5 w-3.5" />
                    Reject
                  </Button>
                  <Button size="sm" onClick={() => handleAction(p.id, 'approved')}>
                    <Check className="mr-1 h-3.5 w-3.5" />
                    Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* History */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Payment History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {history.map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-md border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{p.client_name}</p>
                  <p className="text-xs text-muted-foreground">{p.month} · ₹{p.amount.toLocaleString('en-IN')}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!viewScreenshot} onOpenChange={() => setViewScreenshot(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Payment Screenshot</DialogTitle></DialogHeader>
          <div className="flex items-center justify-center rounded-md border border-border bg-muted p-8">
            <img src={viewScreenshot || ''} alt="Payment screenshot" className="max-h-64 rounded" />
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
