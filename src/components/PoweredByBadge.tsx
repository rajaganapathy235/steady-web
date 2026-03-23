export function PoweredByBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`text-[10px] font-medium text-chai-gold/80 tracking-wide ${className}`}>
      Powered by OneCupCode
    </span>
  );
}
