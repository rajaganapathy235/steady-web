import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ClientSupport() {
  const [form, setForm] = useState({ subject: '', description: '' });
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Support ticket submitted! We\'ll get back to you shortly.');
    setForm({ subject: '', description: '' });
    setFile(null);
    setSending(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Request Content Update</h1>
          <p className="text-sm text-muted-foreground">Submit a ticket for website changes</p>
        </div>

        <Card className="mx-auto max-w-lg border-border">
          <CardHeader>
            <CardTitle className="text-lg">New Support Ticket</CardTitle>
            <CardDescription>Describe what you'd like us to change on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Update product images" required />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Please describe what changes you need…"
                  rows={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Attachment (optional)</Label>
                <Input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
                {file && <p className="text-xs text-muted-foreground">{file.name}</p>}
              </div>
              <Button type="submit" className="w-full gap-2" disabled={sending}>
                <Send className="h-4 w-4" />
                {sending ? 'Submitting…' : 'Submit Ticket'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
