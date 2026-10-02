import type { ReactElement } from 'react';
import euFlag from '../assets/flag-eu.webp';
import caFlag from '../assets/flag-ca.webp';

type FlagCode = 'CA' | 'GB' | 'EU' | 'AU' | 'US';

function Star({ x, y, scale = 1, fill = '#FFCC00' }: { x: number; y: number; scale?: number; fill?: string }) {
  return (
    <path
      d="M0 -3 L0.7 -0.9 L2.9 -0.9 L1.1 0.4 L1.8 2.4 L0 1.1 L-1.8 2.4 L-1.1 0.4 L-2.9 -0.9 L-0.7 -0.9 Z"
      fill={fill}
      transform={`translate(${x} ${y}) scale(${scale})`}
    />
  );
}

const SOUTHERN_CROSS = [
  { x: 24, y: 4, scale: 0.9 },
  { x: 26.5, y: 8, scale: 0.9 },
  { x: 25.5, y: 13, scale: 0.9 },
  { x: 22, y: 15.5, scale: 0.7 },
  { x: 20.5, y: 10, scale: 0.5 },
];

function CanadaFlag() {
  return <img src={caFlag} alt="" className="h-full w-full object-cover" />;
}

function UKFlag() {
  return (
    <svg viewBox="0 0 30 20" className="h-full w-full">
      <rect width="30" height="20" fill="#00247D" />
      <line x1="0" y1="0" x2="30" y2="20" stroke="#FFFFFF" strokeWidth="4" />
      <line x1="30" y1="0" x2="0" y2="20" stroke="#FFFFFF" strokeWidth="4" />
      <line x1="0" y1="0" x2="30" y2="20" stroke="#CF142B" strokeWidth="1.6" />
      <line x1="30" y1="0" x2="0" y2="20" stroke="#CF142B" strokeWidth="1.6" />
      <rect x="12" width="6" height="20" fill="#FFFFFF" />
      <rect y="7" width="30" height="6" fill="#FFFFFF" />
      <rect x="13.3" width="3.4" height="20" fill="#CF142B" />
      <rect y="8.3" width="30" height="3.4" fill="#CF142B" />
    </svg>
  );
}

function EUFlag() {
  return <img src={euFlag} alt="" className="h-full w-full object-cover" />;
}

function AustraliaFlag() {
  return (
    <svg viewBox="0 0 30 20" className="h-full w-full">
      <rect width="30" height="20" fill="#00247D" />
      <g>
        <rect width="15" height="10" fill="#00247D" />
        <line x1="0" y1="0" x2="15" y2="10" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="15" y1="0" x2="0" y2="10" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="0" y1="0" x2="15" y2="10" stroke="#CF142B" strokeWidth="0.8" />
        <line x1="15" y1="0" x2="0" y2="10" stroke="#CF142B" strokeWidth="0.8" />
        <rect x="6" width="3" height="10" fill="#FFFFFF" />
        <rect y="3.5" width="15" height="3" fill="#FFFFFF" />
        <rect x="6.9" width="1.2" height="10" fill="#CF142B" />
        <rect y="4.4" width="15" height="1.2" fill="#CF142B" />
      </g>
      <Star x={6.5} y={15.5} scale={1.3} fill="#FFFFFF" />
      {SOUTHERN_CROSS.map((pos, i) => (
        <Star key={i} x={pos.x} y={pos.y} scale={pos.scale} fill="#FFFFFF" />
      ))}
    </svg>
  );
}

const US_STAR_POSITIONS = (() => {
  const cantonWidth = 12;
  const cantonHeight = 10.77;
  const rows = 4;
  const cols = 5;
  return Array.from({ length: rows * cols }, (_, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    return {
      x: (cantonWidth / (cols + 1)) * (c + 1),
      y: (cantonHeight / (rows + 1)) * (r + 1),
    };
  });
})();

function USFlag() {
  const stripeHeight = 20 / 13;
  return (
    <svg viewBox="0 0 30 20" className="h-full w-full">
      {Array.from({ length: 13 }, (_, i) => (
        <rect
          key={i}
          y={i * stripeHeight}
          width="30"
          height={stripeHeight}
          fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
        />
      ))}
      <rect width="12" height="10.77" fill="#3C3B6E" />
      {US_STAR_POSITIONS.map((pos, i) => (
        <Star key={i} x={pos.x} y={pos.y} scale={0.35} fill="#FFFFFF" />
      ))}
    </svg>
  );
}

const FLAGS: Record<FlagCode, () => ReactElement> = {
  CA: CanadaFlag,
  GB: UKFlag,
  EU: EUFlag,
  AU: AustraliaFlag,
  US: USFlag,
};

export default function FlagIcon({ code, className }: { code: FlagCode; className?: string }) {
  const FlagSvg = FLAGS[code];
  return (
    <span className={`inline-block overflow-hidden rounded-[3px] shadow-sm ${className ?? 'h-4 w-6'}`}>
      <FlagSvg />
    </span>
  );
}
