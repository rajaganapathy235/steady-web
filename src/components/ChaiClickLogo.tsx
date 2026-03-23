interface ChaiClickLogoProps {
  className?: string;
  size?: number;
}

export function ChaiClickLogo({ className = '', size = 24 }: ChaiClickLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cup body */}
      <rect x="10" y="18" width="22" height="20" rx="3" fill="currentColor" className="text-chai-gold" />
      {/* Cup handle */}
      <path d="M32 24 C38 24, 38 34, 32 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-chai-gold" />
      {/* Steam as code brackets { } */}
      <path d="M17 14 C15 12, 15 8, 17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-chai-gold/70" />
      <path d="M24 14 C24 12, 24 8, 24 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-chai-gold/70" />
      <path d="M31 14 C33 12, 33 8, 31 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-chai-gold/70" />
      {/* Left bracket { */}
      <text x="3" y="32" fontSize="18" fontWeight="bold" fill="currentColor" className="text-espresso dark:text-chai-gold/60">{'{'}</text>
      {/* Right bracket } */}
      <text x="36" y="32" fontSize="18" fontWeight="bold" fill="currentColor" className="text-espresso dark:text-chai-gold/60">{'}'}</text>
    </svg>
  );
}
