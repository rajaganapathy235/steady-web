import { useEffect, useState } from 'react';

interface Props {
  text: string;
  speed?: number;
  className?: string;
  onDone?: () => void;
}

export function TypewriterText({ text, speed = 40, className = '', onDone }: Props) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); onDone?.(); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onDone]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse text-chai-gold">|</span>
    </span>
  );
}
