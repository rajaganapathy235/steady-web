import { cn } from '@/lib/utils';

type Status = 'live' | 'suspended' | 'dns-error' | 'active' | 'pending' | 'approved' | 'rejected' | 'open' | 'in-progress' | 'resolved';

const styles: Record<Status, string> = {
  live: 'bg-success/10 text-success border-success/20',
  active: 'bg-success/10 text-success border-success/20',
  approved: 'bg-success/10 text-success border-success/20',
  resolved: 'bg-success/10 text-success border-success/20',
  suspended: 'bg-destructive/10 text-destructive border-destructive/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  'dns-error': 'bg-warning/10 text-warning border-warning/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  open: 'bg-primary/10 text-primary border-primary/20',
  'in-progress': 'bg-primary/10 text-primary border-primary/20',
};

const labels: Record<Status, string> = {
  live: 'Live',
  active: 'Active',
  approved: 'Approved',
  resolved: 'Resolved',
  suspended: 'Suspended',
  rejected: 'Rejected',
  'dns-error': 'DNS Error',
  pending: 'Pending',
  open: 'Open',
  'in-progress': 'In Progress',
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase', styles[status], className)}>
      <span className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', {
        'bg-success': ['live', 'active', 'approved', 'resolved'].includes(status),
        'bg-destructive': ['suspended', 'rejected'].includes(status),
        'bg-warning': ['dns-error', 'pending'].includes(status),
        'bg-primary': ['open', 'in-progress'].includes(status),
      })} />
      {labels[status]}
    </span>
  );
}
