import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, Globe, Mail, X } from 'lucide-react';
import AmbientBackground from './AmbientBackground';
import RevealHeading from './RevealHeading';
import PrimaryButton from './PrimaryButton';

const SUBJECTS = [
  'Brand Strategy',
  'Web Design & Dev',
  'Content & Copy',
  'Long-Form Writing',
  'AI Chatbots & Workflow Automation',
  'General Inquiry',
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqpzvzlz';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: SUBJECTS[0],
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-black px-6 py-28 md:py-40">
      <AmbientBackground variant="bright" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-6xl"
      >
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-vlz-red">
            Contact
          </p>
          <RevealHeading
            as="h2"
            className="tracking-tight text-white text-4xl md:text-6xl"
            segments={[{ text: "Let's talk about your" }, { text: 'next move.', emphasis: true }]}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:col-span-3 md:p-10">
            {status === 'sent' ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <h3 className="mb-3 text-2xl text-white">Message sent.</h3>
                <p className="max-w-sm text-sm leading-relaxed text-white/60">
                  Thanks for reaching out — we'll get back to you within one
                  business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-white/50">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/50">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="john@company.com"
                      className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/50">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full appearance-none border-b border-white/15 bg-transparent px-0 py-3 pr-10 text-white focus:border-white/60 focus:outline-none"
                    >
                      {SUBJECTS.map((subject) => (
                        <option key={subject} value={subject} className="bg-black">
                          {subject}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/50">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your project..."
                    className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-400">
                    Something went wrong sending that — please try again, or
                    email us directly at hello@vantralabz.com.
                  </p>
                )}

                <PrimaryButton
                  type="submit"
                  disabled={status === 'sending'}
                  className="justify-center"
                >
                  {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                </PrimaryButton>
              </form>
            )}
          </div>

          <div className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent p-6 md:col-span-2 md:p-10">
            <span
              aria-hidden
              className="font-serif-display pointer-events-none absolute -right-4 -top-8 select-none text-9xl italic text-white/5"
            >
              &rsquo;
            </span>

            <div className="relative flex flex-col gap-8">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-vlz-red">
                  Email Us
                </p>
                <p className="text-lg text-white">hello@vantralabz.com</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-vlz-red">
                  Location
                </p>
                <p className="text-lg text-white">
                  Remote-first — working with clients worldwide
                </p>
              </div>
            </div>

            <div className="relative">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-vlz-red">
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Mail, label: 'Email' },
                  { icon: X, label: 'X (Twitter)' },
                  { icon: Globe, label: 'Website' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="rounded-full border border-white/10 bg-white/[0.03] p-3 text-white/80 transition-all hover:bg-vlz-red hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
