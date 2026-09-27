import createGlobe, { type COBEOptions } from 'cobe';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [85 / 255, 85 / 255, 85 / 255],
  markerColor: [249 / 255, 69 / 255, 45 / 255],
  glowColor: [232 / 255, 232 / 255, 232 / 255],
  markers: [
    { location: [43.6532, -79.3832], size: 0.08 },
    { location: [51.5074, -0.1278], size: 0.08 },
    { location: [52.52, 13.405], size: 0.08 },
    { location: [-33.8688, 151.2093], size: 0.08 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      pointerInteractionMovement.current = clientX - pointerInteracting.current;
    }
  };

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener('resize', onResize);
    onResize();

    // cobe 2.x has no internal animation loop or onRender callback (unlike
    // the older API some recipes still assume) — createGlobe returns
    // { update, destroy } and the caller must drive rotation every frame by
    // calling update() themselves.
    let globe: ReturnType<typeof createGlobe> | null = null;
    let renderFrame: number;

    // React StrictMode mounts this effect twice in dev, synchronously before
    // any paint. Deferring the actual createGlobe() call to the next
    // animation frame lets the discarded first mount get cancelled before it
    // ever creates a WebGL context, so only one real instance is created.
    const setupFrame = requestAnimationFrame(() => {
      globe = createGlobe(canvasRef.current!, {
        ...config,
        width: width * 2,
        height: width * 2,
      });

      const render = () => {
        if (pointerInteracting.current === null) phi += 0.005;
        globe?.update({
          phi: phi + pointerInteractionMovement.current / 200,
          width: width * 2,
          height: width * 2,
        });
        renderFrame = requestAnimationFrame(render);
      };
      renderFrame = requestAnimationFrame(render);

      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = '1';
      });
    });

    return () => {
      cancelAnimationFrame(setupFrame);
      cancelAnimationFrame(renderFrame);
      globe?.destroy();
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        'absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]',
        className,
      )}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
