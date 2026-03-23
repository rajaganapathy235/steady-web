import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import chaiLogo from '@/assets/chaiclick-logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // Auth context stores user, role determines redirect
      const stored = localStorage.getItem('waas_user');
      const user = stored ? JSON.parse(stored) : null;
      navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <Link to="/" className="mb-8 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Globe className="h-5 w-5" />
        WaaS-Flow
      </Link>

      <Card className="w-full max-w-sm border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@waasflow.in" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
          <div className="mt-6 rounded-md bg-muted p-3">
            <p className="mb-1 text-xs font-medium text-muted-foreground">Demo Credentials</p>
            <p className="text-xs text-muted-foreground"><strong>Admin:</strong> admin@waasflow.in / admin123</p>
            <p className="text-xs text-muted-foreground"><strong>Client:</strong> sharma@client.com / client123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
