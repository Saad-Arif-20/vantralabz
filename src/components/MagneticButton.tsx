import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
};

const PULL_RADIUS = 60;
const PULL_STRENGTH = 0.35;

const glowClass =
  'pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/magnetic:opacity-100 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.18),_transparent_70%)]';
const contentClass = 'relative inline-flex items-center justify-center gap-2';

export default function MagneticButton({
  children,
  onClick,
  href,
  className = '',
  type = 'button',
  disabled,
  ...rest
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(Math.min(relX * PULL_STRENGTH, PULL_RADIUS), -PULL_RADIUS));
    y.set(Math.max(Math.min(relY * PULL_STRENGTH, PULL_RADIUS), -PULL_RADIUS));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sharedClassName = `liquid-glass group/magnetic relative isolate cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_30px_-6px_rgba(255,255,255,0.35)] ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.96 }}
        className={sharedClassName}
        {...rest}
      >
        <span className={glowClass} />
        <span className={contentClass}>{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={sharedClassName}
      {...rest}
    >
      <span className={glowClass} />
      <span className={contentClass}>{children}</span>
    </motion.button>
  );
}
