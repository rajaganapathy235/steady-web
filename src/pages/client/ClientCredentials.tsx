import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockClients } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Eye, EyeOff, ExternalLink, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function ClientCredentials() {
  const { user } = useAuth();
  const client = mockClients.find(c => c.id === user?.client_id) || mockClients[0];
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied`);
    setTimeout(() => setCopied(null), 2000);
  };

  const CopyBtn = ({ text, label }: { text: string; label: string }) => (
    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => copy(text, label)}>
      {copied === label ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
    </Button>
  );

  if (!client.login_url) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight">Credentials</h1>
          <Card className="border-border">
            <CardContent className="py-12 text-center text-muted-foreground">
              <Lock className="mx-auto mb-4 h-8 w-8" />
              <p className="text-sm">Credentials haven't been set up yet. Contact support.</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Credentials Vault</h1>
          <p className="text-sm text-muted-foreground">Your website login details</p>
        </div>

        <Card className="mx-auto max-w-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5" />
              Website Access
            </CardTitle>
            <CardDescription>{client.domain}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Login URL</p>
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2">
                <a href={client.login_url} target="_blank" rel="noopener noreferrer" className="flex-1 text-sm text-primary hover:underline truncate">
                  {client.login_url}
                </a>
                <CopyBtn text={client.login_url} label="Login URL" />
                <a href={client.login_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Username</p>
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2">
                <span className="flex-1 text-sm font-mono">{client.login_username}</span>
                <CopyBtn text={client.login_username!} label="Username" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Password</p>
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2">
                <span className="flex-1 text-sm font-mono">{showPassword ? client.login_password : '••••••••••'}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </Button>
                <CopyBtn text={client.login_password!} label="Password" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
