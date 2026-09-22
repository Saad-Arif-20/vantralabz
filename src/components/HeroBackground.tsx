export default function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black_10%,transparent_75%)]" />

      <div
        className="ambient-blob ambient-blob-a left-1/2 top-[-15%] h-[75vw] w-[75vw] max-h-[820px] max-w-[820px] -translate-x-1/2"
        style={{ background: 'rgba(255,255,255,0.12)' }}
      />
      <div
        className="ambient-blob ambient-blob-b -left-1/4 top-1/4 h-[45vw] w-[45vw] max-h-[520px] max-w-[520px]"
        style={{ background: 'rgba(150,180,255,0.1)' }}
      />
      <div
        className="ambient-blob ambient-blob-c -right-1/4 top-1/3 h-[50vw] w-[50vw] max-h-[560px] max-w-[560px]"
        style={{ background: 'rgba(255,200,180,0.07)' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_35%,transparent_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.92)_100%)]" />
      <div className="grain-overlay absolute inset-0" />
    </div>
  );
}
