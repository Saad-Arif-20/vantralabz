import { ArrowDown } from 'lucide-react';
import logoMark from '../assets/brand/logo-mark.webp';

export default function WordmarkDivider() {
  return (
    <div className="bg-vlz-offwhite">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-4 sm:px-6 lg:px-[72px]">
        <h2
          className="select-none text-center text-[11vw] font-bold uppercase leading-none tracking-tight text-vlz-black sm:text-[9.5vw] lg:text-[7.5rem]"
          style={{ fontFamily: 'var(--font-expanded)' }}
          aria-label="Vantralabz"
        >
          <span className="inline-flex items-center" aria-hidden="true">
            <img src={logoMark} alt="" className="inline-block h-[0.8em] w-auto" />
            ANTRALABZ
          </span>
        </h2>
      </div>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-black/10 px-4 py-4 text-xs font-semibold uppercase tracking-widest text-vlz-gray sm:px-6 lg:px-[72px]">
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
