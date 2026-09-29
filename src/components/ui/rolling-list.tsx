import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface RollingListItem {
  id: number;
  title: string;
  category: string;
  icon: ReactNode;
}

function RollingListRow({
  item,
  isActive,
  rowRef,
}: {
  item: RollingListItem;
  isActive: boolean;
  rowRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={rowRef}
      className="group relative w-full cursor-pointer border-b border-black/10 py-6 first:border-t"
    >
      {/* Rolling text */}
      <div className="relative h-[52px] overflow-hidden md:h-16">
        <div
          className={cn(
            'transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2',
            isActive && '-translate-y-1/2',
          )}
        >
          {/* State 1: Normal */}
          <div className="flex h-[52px] items-center md:h-16">
            <h2
              className="whitespace-nowrap text-2xl font-bold uppercase tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
              style={{ fontFamily: 'var(--font-expanded)' }}
            >
              {item.title}
            </h2>
          </div>

          {/* State 2: Hover/Active (italic + brand red) */}
          <div className="flex h-[52px] items-center md:h-16">
            <h2
              className="whitespace-nowrap text-2xl font-bold italic uppercase tracking-tight text-vlz-red sm:text-5xl md:text-6xl"
              style={{ fontFamily: 'var(--font-expanded)' }}
            >
              {item.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Category label */}
      <span
        className={cn(
          'absolute right-0 top-7 hidden text-xs font-semibold uppercase tracking-widest text-vlz-lightgray transition-opacity duration-300 group-hover:opacity-0 md:top-6 md:block',
          isActive && 'opacity-0',
        )}
      >
        {item.category}
      </span>

      {/* Icon card reveal */}
      <div
        className={cn(
          'pointer-events-none absolute right-0 top-1/2 z-20 hidden h-28 w-28 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl md:block',
          'transition-all duration-500 ease-out',
          'translate-x-4 rotate-3 scale-95 opacity-0',
          'group-hover:translate-x-0 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100',
          isActive && 'translate-x-0 rotate-0 scale-100 opacity-100',
        )}
      >
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-vlz-dark to-vlz-black">
          {item.icon}
        </div>
      </div>
    </div>
  );
}

export function RollingList({ items }: { items: RollingListItem[] }) {
  const [supportsHover, setSupportsHover] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);
  const rowsRef = useRef(new Map<number, HTMLDivElement>());

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setSupportsHover(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (supportsHover) return;

    const idByEl = new Map<Element, number>();
    rowsRef.current.forEach((el, id) => idByEl.set(el, id));

    const observer = new IntersectionObserver(
      (entries) => {
        let best: { id: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = idByEl.get(entry.target);
          if (id === undefined) continue;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { id, ratio: entry.intersectionRatio };
          }
        }
        if (best) setActiveId(best.id);
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    rowsRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [supportsHover, items]);

  return (
    <div className="flex w-full flex-col">
      {items.map((item) => (
        <RollingListRow
          key={item.id}
          item={item}
          isActive={!supportsHover && activeId === item.id}
          rowRef={(el) => {
            if (el) rowsRef.current.set(item.id, el);
            else rowsRef.current.delete(item.id);
          }}
        />
      ))}
    </div>
  );
}
