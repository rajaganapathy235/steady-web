import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Rocket } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDeploy() {
  const [form, setForm] = useState({ business_name: '', domain: '', github_repo: '', dokploy_app_id: '' });
  const [deploying, setDeploying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeploying(true);
    // TODO: Call Dokploy API
    await new Promise(r => setTimeout(r, 2000));
    toast.success(`${form.business_name} deployment initiated!`);
    setForm({ business_name: '', domain: '', github_repo: '', dokploy_app_id: '' });
    setDeploying(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deployment Engine</h1>
          <p className="text-sm text-muted-foreground">Launch a new client site on VPS</p>
        </div>

        <Card className="mx-auto max-w-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Rocket className="h-5 w-5" />
              New Deployment
            </CardTitle>
            <CardDescription>Fill in the details to deploy a new client website</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input value={form.business_name} onChange={e => setForm(f => ({ ...f, business_name: e.target.value }))} placeholder="Sharma Electronics" required />
              </div>
              <div className="space-y-2">
                <Label>Domain</Label>
                <Input value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} placeholder="sharmaelectronics.in" required />
              </div>
              <div className="space-y-2">
                <Label>GitHub Repo URL</Label>
                <Input value={form.github_repo} onChange={e => setForm(f => ({ ...f, github_repo: e.target.value }))} placeholder="https://github.com/waas/project" required />
              </div>
              <div className="space-y-2">
                <Label>Dokploy App ID</Label>
                <Input value={form.dokploy_app_id} onChange={e => setForm(f => ({ ...f, dokploy_app_id: e.target.value }))} placeholder="dk_app_xxx" required />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={deploying}>
                <Rocket className="h-4 w-4" />
                {deploying ? 'Deploying…' : 'Launch on VPS'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
