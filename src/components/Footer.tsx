import { Globe, Mail, X } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2 text-white/60">
          <Globe size={18} />
          <span className="text-sm">
            Vantralabz — ideas that grow brands.
          </span>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: Mail, label: 'Email' },
            { icon: X, label: 'X (Twitter)' },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="liquid-glass rounded-full p-3 text-white/70 transition-all hover:bg-white/5 hover:text-white"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Vantralabz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
