import type { ReactElement } from 'react';

type FlagCode = 'CA' | 'GB' | 'EU' | 'AU';

function Star({ x, y, scale = 1, fill = '#FFCC00' }: { x: number; y: number; scale?: number; fill?: string }) {
  return (
    <path
      d="M0 -3 L0.7 -0.9 L2.9 -0.9 L1.1 0.4 L1.8 2.4 L0 1.1 L-1.8 2.4 L-1.1 0.4 L-2.9 -0.9 L-0.7 -0.9 Z"
      fill={fill}
      transform={`translate(${x} ${y}) scale(${scale})`}
    />
  );
}

const EU_STAR_POSITIONS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
  return { x: 15 + Math.cos(angle) * 6.2, y: 10 + Math.sin(angle) * 6.2 };
});

const SOUTHERN_CROSS = [
  { x: 24, y: 4, scale: 0.9 },
  { x: 26.5, y: 8, scale: 0.9 },
  { x: 25.5, y: 13, scale: 0.9 },
  { x: 22, y: 15.5, scale: 0.7 },
  { x: 20.5, y: 10, scale: 0.5 },
];

function CanadaFlag() {
  return (
    <svg viewBox="0 0 30 20" className="h-full w-full">
      <rect width="30" height="20" fill="#FF0000" />
      <rect x="7.5" width="15" height="20" fill="#FFFFFF" />
      <path
        d="M15 3 C18 3 18 7 21 8 C19 9 17 9 17 11 C19 12 20 14 22 16 C19 16 17 15 15.5 13.5 C15.5 15 15.5 17 15 18 C14.5 17 14.5 15 14.5 13.5 C13 15 11 16 8 16 C10 14 11 12 13 11 C13 9 11 9 9 8 C12 7 12 3 15 3 Z"
        fill="#FF0000"
      />
    </svg>
  );
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
  return (
    <svg viewBox="0 0 30 20" className="h-full w-full">
      <rect width="30" height="20" fill="#003399" />
      {EU_STAR_POSITIONS.map((pos, i) => (
        <Star key={i} x={pos.x} y={pos.y} scale={1} />
      ))}
    </svg>
  );
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

const FLAGS: Record<FlagCode, () => ReactElement> = {
  CA: CanadaFlag,
  GB: UKFlag,
  EU: EUFlag,
  AU: AustraliaFlag,
};

export default function FlagIcon({ code, className }: { code: FlagCode; className?: string }) {
  const FlagSvg = FLAGS[code];
  return (
    <span className={`inline-block overflow-hidden rounded-[3px] shadow-sm ${className ?? 'h-4 w-6'}`}>
      <FlagSvg />
    </span>
  );
}
