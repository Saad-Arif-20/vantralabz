import logoMark from '../assets/brand/logo-mark.png';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Studio', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Blog', href: '#faq' },
];

const SOCIAL_LINKS = ['Twitter', 'Dribbble', 'Instagram', 'Facebook'];

function FooterColumn({ label, links }: { label: string; links: string[] }) {
  return (
    <div>
      <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-vlz-gray">
        <span className="h-1.5 w-1.5 rounded-full bg-vlz-red" />
        {label}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-2xl font-semibold tracking-tight text-vlz-black transition-colors hover:text-vlz-red md:text-3xl"
              style={{ fontFamily: 'var(--font-expanded)' }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-vlz-offwhite px-4 pb-8 pt-16 sm:px-6 md:pt-24 lg:px-[72px]">
      <div className="mx-auto max-w-[1296px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          <div>
            <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-vlz-red via-[rgb(120,20,10)] to-vlz-black">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 2px, transparent 2px, transparent 22px)',
                }}
                aria-hidden
              />
              <img src={logoMark} alt="Vantralabz" className="relative w-2/5 max-w-[180px]" />
            </div>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-vlz-gray">
                <span className="h-1.5 w-1.5 rounded-full bg-vlz-red" />
                Stay connected
              </span>
              <a
                href="mailto:hello@vantralabz.com"
                className="text-lg font-semibold text-vlz-black hover:text-vlz-red"
              >
                hello@vantralabz.com
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <FooterColumn label="Navigation" links={NAV_LINKS.map((l) => l.label)} />
            <FooterColumn label="Social Media" links={SOCIAL_LINKS} />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-xs text-vlz-gray sm:flex-row md:mt-24">
          <p>© {new Date().getFullYear()} Vantralabz. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-vlz-black">
              Terms of Use
            </a>
            <a href="/privacy.html" className="hover:text-vlz-black">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      <h2
        className="mt-10 select-none text-center text-[15vw] font-bold uppercase leading-none tracking-tight text-vlz-black sm:text-[11vw] lg:text-[8.5vw] xl:text-[7.5rem]"
        style={{ fontFamily: 'var(--font-expanded)' }}
      >
        Vantralabz
      </h2>
    </footer>
  );
}
