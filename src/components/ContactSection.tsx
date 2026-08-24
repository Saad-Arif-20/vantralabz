import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Globe, Mail, X } from 'lucide-react';

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
    <section id="contact" className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-sm uppercase tracking-widest text-white/40">
            Contact
          </p>
          <h2 className="tracking-tight text-white text-4xl md:text-6xl">
            Let's talk about your{' '}
            <span className="font-serif-display italic text-white/60">
              next move.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
          <div className="liquid-glass rounded-3xl p-6 md:col-span-3 md:p-10">
            {status === 'sent' ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <h3 className="mb-3 text-2xl text-white">Message sent.</h3>
                <p className="max-w-sm text-sm leading-relaxed text-white/50">
                  Thanks for reaching out — we'll get back to you within one
                  business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-white/60">
                      Full Name
                    </label>
                    <div className="liquid-glass rounded-xl">
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/60">
                      Email Address
                    </label>
                    <div className="liquid-glass rounded-xl">
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="john@company.com"
                        className="w-full bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Subject
                  </label>
                  <div className="liquid-glass relative rounded-xl">
                    <select
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full appearance-none bg-transparent px-4 py-3 pr-10 text-white focus:outline-none"
                    >
                      {SUBJECTS.map((subject) => (
                        <option key={subject} value={subject} className="bg-black">
                          {subject}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Message
                  </label>
                  <div className="liquid-glass rounded-xl">
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us about your project..."
                      className="w-full resize-none bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-400">
                    Something went wrong sending that — please try again, or
                    email us directly at hello@vantralabz.com.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          <div className="liquid-glass flex flex-col gap-8 rounded-3xl p-6 md:col-span-2 md:p-10">
            <div>
              <p className="mb-2 text-xs uppercase tracking-widest text-white/40">
                Email Us
              </p>
              <p className="text-lg text-white">hello@vantralabz.com</p>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div>
              <p className="mb-2 text-xs uppercase tracking-widest text-white/40">
                Location
              </p>
              <p className="text-lg text-white">
                Remote-first — working with clients worldwide
              </p>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white/40">
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
                    className="liquid-glass rounded-full p-3 text-white/70 transition-all hover:bg-white/5 hover:text-white"
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
