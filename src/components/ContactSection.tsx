import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, MessageSquareText } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqpzvzlz';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-vlz-offwhite px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto mb-10 flex max-w-6xl flex-col items-center text-center md:mb-14">
        <div className="mb-6 flex items-center gap-2 rounded-full bg-vlz-black px-4 py-2 text-xs font-semibold text-white">
          <Globe size={14} className="text-vlz-red" />
          Ready When You Are
        </div>
        <h2
          className="text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-expanded)' }}
        >
          Let&rsquo;s Talk <span className="text-vlz-red">It</span>
          <br />
          <span className="text-vlz-red">Over</span>
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-vlz-black p-4 sm:p-8"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-4">
          <div className="rounded-3xl bg-vlz-white p-6 sm:p-8">
            {status === 'sent' ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <h3 className="mb-3 text-2xl font-semibold text-vlz-black">Message sent.</h3>
                <p className="max-w-sm text-sm leading-relaxed text-vlz-gray">
                  Thanks for reaching out — we&rsquo;ll get back to you within one business
                  day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-vlz-black">
                    <span className="h-1.5 w-1.5 rounded-full bg-vlz-red" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full rounded-xl bg-vlz-offwhite px-4 py-3.5 text-sm text-vlz-black placeholder:text-vlz-lightgray focus:outline-none focus:ring-2 focus:ring-vlz-red/30"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-vlz-black">
                    <span className="h-1.5 w-1.5 rounded-full bg-vlz-red" />
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter the email"
                    className="w-full rounded-xl bg-vlz-offwhite px-4 py-3.5 text-sm text-vlz-black placeholder:text-vlz-lightgray focus:outline-none focus:ring-2 focus:ring-vlz-red/30"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-vlz-black">
                    <span className="h-1.5 w-1.5 rounded-full bg-vlz-red" />
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl bg-vlz-offwhite px-4 py-3.5 text-sm text-vlz-black placeholder:text-vlz-lightgray focus:outline-none focus:ring-2 focus:ring-vlz-red/30"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-vlz-black">
                    <span className="h-1.5 w-1.5 rounded-full bg-vlz-red" />
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    className="w-full resize-none rounded-xl bg-vlz-offwhite px-4 py-3.5 text-sm text-vlz-black placeholder:text-vlz-lightgray focus:outline-none focus:ring-2 focus:ring-vlz-red/30"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-vlz-red">
                    Something went wrong sending that — please try again, or email us
                    directly at hello@vantralabz.com.
                  </p>
                )}

                <PrimaryButton type="submit" disabled={status === 'sending'} className="w-fit">
                  {status === 'sending' ? 'SENDING...' : 'SEND REQUEST'}
                </PrimaryButton>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-between gap-10 p-4 sm:p-6">
            <div className="w-fit rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-vlz-lightgray">
              Contact Form
            </div>

            <h3
              className="text-4xl font-bold leading-[1.05] text-vlz-white sm:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Fill the
              <br />
              form
            </h3>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/5 text-white">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-vlz-lightgray">
                    E-mail Address
                  </p>
                  <p className="text-sm font-medium text-white sm:text-base">
                    hello@vantralabz.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/5 text-white">
                  <MessageSquareText size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-vlz-lightgray">
                    Where We Work
                  </p>
                  <p className="text-sm font-medium text-white sm:text-base">
                    Remote-first — clients worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
