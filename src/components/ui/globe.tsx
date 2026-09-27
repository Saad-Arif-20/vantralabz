import createGlobe, { type COBEOptions } from 'cobe';
import { useEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface GlobeMarker {
  id: string;
  location: [number, number];
  size: number;
}

const DEFAULT_MARKERS: GlobeMarker[] = [
  { id: 'ca', location: [43.6532, -79.3832], size: 0.035 },
  { id: 'gb', location: [51.5074, -0.1278], size: 0.035 },
  { id: 'eu', location: [52.52, 13.405], size: 0.035 },
  { id: 'au', location: [-33.8688, 151.2093], size: 0.035 },
];

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [1, 1, 1],
  markerColor: [249 / 255, 69 / 255, 45 / 255],
  glowColor: [1, 1, 1],
  markers: DEFAULT_MARKERS,
};

const GLOBE_RADIUS = 0.8;
const MARKER_ELEVATION = 0.05;

// Reimplementation of cobe's own lat/long -> screen-space projection math
// (verified against its compiled source) so marker overlay elements (e.g.
// flag icons) can be positioned in plain DOM/CSS, kept in perfect sync with
// the canvas's rotation. cobe has a built-in mechanism for this (marker
// `id`s + CSS Anchor Positioning), but that API has no Firefox/Safari
// support at all, which would mean broken or invisible overlays for a large
// share of real visitors — not an acceptable tradeoff for a production site.
function latLongToVector([lat, long]: [number, number]): [number, number, number] {
  const latRad = (lat * Math.PI) / 180;
  const longRad = (long * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(latRad);
  return [-cosLat * Math.cos(longRad), Math.sin(latRad), cosLat * Math.sin(longRad)];
}

function projectMarker(
  location: [number, number],
  phi: number,
  theta: number,
): { x: number; y: number; visible: boolean } {
  const [vx, vy, vz] = latLongToVector(location);
  const radius = GLOBE_RADIUS + MARKER_ELEVATION;
  const [x0, y0, z0] = [vx * radius, vy * radius, vz * radius];

  const cosTheta = Math.cos(theta);
  const cosPhi = Math.cos(phi);
  const sinTheta = Math.sin(theta);
  const sinPhi = Math.sin(phi);

  const c = cosPhi * x0 + sinPhi * z0;
  const s = sinPhi * sinTheta * x0 + cosTheta * y0 - cosPhi * sinTheta * z0;

  const facingCamera = -sinPhi * cosTheta * x0 + sinTheta * y0 + cosPhi * cosTheta * z0;
  const visible = facingCamera >= 0 || c * c + s * s >= 0.64;

  return { x: (c + 1) / 2, y: (-s + 1) / 2, visible };
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
  markers = DEFAULT_MARKERS,
  renderMarkerOverlay,
}: {
  className?: string;
  config?: COBEOptions;
  markers?: GlobeMarker[];
  renderMarkerOverlay?: (marker: GlobeMarker) => ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
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
    let isVisible = false;

    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener('resize', onResize);
    onResize();

    // The render loop below runs every frame indefinitely once started, so
    // without this it keeps redrawing (and costing CPU/GPU) for the entire
    // session even while this section is scrolled far out of view. Only
    // actually update/draw while the canvas is on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    if (canvasRef.current) observer.observe(canvasRef.current);

    // cobe 2.x has no internal animation loop or onRender callback (unlike
    // the older API some recipes still assume) — createGlobe returns
    // { update, destroy } and the caller must drive rotation every frame by
    // calling update() themselves.
    let globe: ReturnType<typeof createGlobe> | null = null;
    let renderFrame: number;
    const theta = config.theta ?? 0.3;

    const updateOverlayPositions = (currentPhi: number) => {
      markers.forEach((marker, i) => {
        const el = overlayRefs.current[i];
        if (!el) return;
        const { x, y, visible } = projectMarker(marker.location, currentPhi, theta);
        el.style.left = `${x * 100}%`;
        el.style.top = `${y * 100}%`;
        el.style.opacity = visible ? '1' : '0';
      });
    };

    // React StrictMode mounts this effect twice in dev, synchronously before
    // any paint. Deferring the actual createGlobe() call to the next
    // animation frame lets the discarded first mount get cancelled before it
    // ever creates a WebGL context, so only one real instance is created.
    const setupFrame = requestAnimationFrame(() => {
      // createGlobe already multiplies width/height by devicePixelRatio
      // internally, so passing the raw CSS pixel width here (not doubled) is
      // correct — doubling it ourselves on top of that produced a canvas 4x
      // the intended linear resolution (16x the fragment-shaded pixels),
      // which got genuinely expensive once this globe grew to span most of
      // the section's width.
      // `markers` is the single source of truth for marker positions: it
      // always overrides config.markers here, so the WebGL dots and the
      // overlay projection below can never drift out of sync with each
      // other.
      globe = createGlobe(canvasRef.current!, {
        ...config,
        markers,
        width,
        height: width,
      });

      // The rotation is slow and ambient, so an update every other frame
      // (~30fps) looks identical to the eye while halving the GPU work during
      // exactly the moments (mid-scroll) frame budget is tightest.
      let skipFrame = false;
      const render = () => {
        skipFrame = !skipFrame;
        if (isVisible && skipFrame) {
          if (pointerInteracting.current === null) phi += 0.005;
          const effectivePhi = phi + pointerInteractionMovement.current / 200;
          globe?.update({
            phi: effectivePhi,
            width,
            height: width,
          });
          updateOverlayPositions(effectivePhi);
        }
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
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn('absolute inset-0 h-full w-full', className)}>
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
      {renderMarkerOverlay &&
        markers.map((marker, i) => (
          <div
            key={marker.id}
            ref={(el) => {
              overlayRefs.current[i] = el;
            }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{ opacity: 0 }}
          >
            {renderMarkerOverlay(marker)}
          </div>
        ))}
    </div>
  );
}
