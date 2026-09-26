import { ArrowDown } from 'lucide-react';

export default function WordmarkDivider() {
  return (
    <div className="bg-vlz-offwhite">
      <div className="mx-auto max-w-[1360px] px-4 pb-10 pt-4 sm:px-6">
        <h2
          className="select-none text-center text-[16vw] font-bold uppercase leading-none tracking-tight text-vlz-black sm:text-[12vw] lg:text-[7.5rem]"
          style={{ fontFamily: 'var(--font-expanded)' }}
        >
          Vantralabz
        </h2>
      </div>
      <div className="mx-auto flex max-w-[1360px] items-center justify-between border-t border-black/10 px-4 py-4 text-xs font-semibold uppercase tracking-widest text-vlz-gray sm:px-6">
        <span>
          EST <span className="text-vlz-lightgray">2019</span>
        </span>
        <span className="flex items-center gap-2">
          SCROLL DOWN
          <ArrowDown size={14} />
        </span>
        <span className="hidden sm:inline">LIVE IN DETAILS</span>
      </div>
    </div>
  );
}
