export function PoweredByBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`text-[9px] font-normal tracking-widest uppercase text-muted-foreground/60 ${className}`}>
      by OneCupCode
    </span>
  );
}
