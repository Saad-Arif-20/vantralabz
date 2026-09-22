type AmbientBackgroundProps = {
  /** 'quiet' for supporting sections, 'bright' for hero-adjacent moments. */
  variant?: 'quiet' | 'bright';
  className?: string;
};

export default function AmbientBackground({
  variant = 'quiet',
  className = '',
}: AmbientBackgroundProps) {
  const strength = variant === 'bright' ? 1 : 0.6;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="ambient-blob ambient-blob-a -left-1/4 -top-1/3 h-[60vw] w-[60vw] max-h-[560px] max-w-[560px]"
        style={{ background: `rgba(255,255,255,${0.05 * strength})` }}
      />
      <div
        className="ambient-blob ambient-blob-b -right-1/4 top-1/4 h-[50vw] w-[50vw] max-h-[480px] max-w-[480px]"
        style={{ background: `rgba(180,200,255,${0.045 * strength})` }}
      />
      <div
        className="ambient-blob ambient-blob-c bottom-[-20%] left-1/3 h-[45vw] w-[45vw] max-h-[420px] max-w-[420px]"
        style={{ background: `rgba(255,255,255,${0.035 * strength})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
