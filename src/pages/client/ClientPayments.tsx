import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockPayments } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, QrCode, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const UPI_ID = 'chaiclick@upi';

export default function ClientPayments() {
  const { user } = useAuth();
  const clientPayments = mockPayments.filter(p => p.client_id === (user?.client_id || '1'));
  const [file, setFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success('UPI ID copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpload = () => {
    if (!file) return;
    toast.success('Payment screenshot submitted for review');
    setFile(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-sm text-muted-foreground">Pay via UPI and upload your screenshot</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* UPI Section */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Pay via UPI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-lg border border-border bg-muted">
                <QrCode className="h-24 w-24 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">UPI ID</p>
                <div className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-1.5">
                  <code className="text-sm font-mono">{UPI_ID}</code>
                  <button onClick={copyUPI}>
                    {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Section */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Upload Screenshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Payment Screenshot</Label>
                <div className="flex items-center gap-3">
                  <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
                </div>
                {file && <p className="text-xs text-muted-foreground">{file.name}</p>}
              </div>
              <Button className="w-full gap-2" disabled={!file} onClick={handleUpload}>
                <Upload className="h-4 w-4" />
                Submit Payment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* History Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientPayments.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.month}</TableCell>
                    <TableCell>₹{p.amount.toLocaleString('en-IN')}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
