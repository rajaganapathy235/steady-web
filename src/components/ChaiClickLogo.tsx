interface ChaiClickLogoProps {
  className?: string;
  size?: number;
}

export function ChaiClickLogo({ className = '', size = 24 }: ChaiClickLogoProps) {
  const gold = '#D4AF37';
  const espresso = '#3C2A21';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ChaiClick logo"
    >
      {/* Cup body */}
      <rect x="8" y="16" width="20" height="16" rx="2.5" fill={gold} />
      {/* Liquid surface */}
      <rect x="10" y="18" width="16" height="3" rx="1" fill={espresso} opacity="0.35" />
      {/* Cup handle */}
      <path
        d="M28 20c4 0 5.5 3.5 5.5 6s-1.5 6-5.5 6"
        stroke={gold}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left bracket { as steam */}
      <path
        d="M14 13c-1.5-1-1.5-3 0-4c-1.5-1-1.5-3 0-4"
        stroke={gold}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Right bracket } as steam */}
      <path
        d="M22 13c1.5-1 1.5-3 0-4c1.5-1 1.5-3 0-4"
        stroke={gold}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Center dot steam */}
      <circle cx="18" cy="11" r="1" fill={gold} opacity="0.5" />
      <circle cx="18" cy="7" r="0.8" fill={gold} opacity="0.35" />
      {/* Saucer */}
      <ellipse cx="18" cy="33" rx="14" ry="2" fill={gold} opacity="0.2" />
    </svg>
  );
}
