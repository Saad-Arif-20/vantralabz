import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function PrimaryButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}: PrimaryButtonProps) {
  const base =
    'group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-transform duration-200 active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100';

  const palette =
    variant === 'primary'
      ? 'bg-gradient-to-b from-vlz-red to-[rgb(214,47,26)] text-vlz-white shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_-2px_6px_rgba(0,0,0,0.25)_inset,0_8px_20px_-6px_rgba(249,69,45,0.55)]'
      : 'bg-vlz-black text-vlz-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_20px_-8px_rgba(0,0,0,0.6)]';

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-white/15">
        <span className="absolute transition-transform duration-300 ease-out group-hover:translate-x-3.5 group-hover:-translate-y-3.5">
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </span>
        <span className="absolute -translate-x-3.5 translate-y-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0">
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </span>
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${palette} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${palette} ${className}`}
    >
      {content}
    </button>
  );
}
