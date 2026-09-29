import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface RollingListItem {
  id: number;
  title: string;
  category: string;
  icon: ReactNode;
}

function RollingListRow({ item }: { item: RollingListItem }) {
  return (
    <div className="group relative w-full cursor-pointer border-b border-black/10 py-6 first:border-t">
      {/* Rolling text */}
      <div className="relative h-[52px] overflow-hidden md:h-16">
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
          {/* State 1: Normal */}
          <div className="flex h-[52px] items-center md:h-16">
            <h2
              className="whitespace-nowrap text-2xl font-bold uppercase tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
              style={{ fontFamily: 'var(--font-expanded)' }}
            >
              {item.title}
            </h2>
          </div>

          {/* State 2: Hover (italic + brand red) */}
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
      <span className="absolute right-0 top-7 hidden text-xs font-semibold uppercase tracking-widest text-vlz-lightgray transition-opacity duration-300 group-hover:opacity-0 md:top-6 md:block">
        {item.category}
      </span>

      {/* Icon card reveal */}
      <div
        className={cn(
          'pointer-events-none absolute right-0 top-1/2 z-20 hidden h-28 w-28 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl md:block',
          'transition-all duration-500 ease-out',
          'translate-x-4 rotate-3 scale-95 opacity-0',
          'group-hover:translate-x-0 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100',
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
  return (
    <div className="flex w-full flex-col">
      {items.map((item) => (
        <RollingListRow key={item.id} item={item} />
      ))}
    </div>
  );
}
