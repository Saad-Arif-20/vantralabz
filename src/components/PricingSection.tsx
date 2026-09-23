import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Tag } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

const PLANS = [
  {
    tier: 'STARTER',
    subtitle: 'For a single, focused service',
    variant: 'light' as const,
    features: [
      'Full service creative',
      'Async + Slack',
      'Monthly consulting call',
      'Updates every 2 days',
      'Simple, one-service scope',
      'Cancel anytime',
      'Scales with your needs',
      'Dedicated design hours',
    ],
  },
  {
    tier: 'FULL SCOPE',
    subtitle: 'For multi-service, ongoing partnerships',
    variant: 'red' as const,
    features: [
      'Fully managed project',
      'Access to entire team',
      'Creative strategy',
      'Updates every 2 days',
      'Weekly consultant call',
      'Cancel anytime',
      'Everything included',
    ],
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-vlz-offwhite px-4 py-16 sm:px-6 md:py-20">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full bg-vlz-black px-4 py-2 text-xs font-semibold text-white">
            <Tag size={14} className="text-vlz-red" />
            Our Pricing
          </div>
          <h2
            className="text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-expanded)' }}
          >
            Pricing Made
            <br />
            <span className="text-vlz-red">Simple</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="overflow-hidden rounded-3xl border border-black/10 bg-vlz-dark"
            >
              <div
                className={`p-6 sm:p-8 ${
                  plan.variant === 'red'
                    ? 'bg-gradient-to-br from-vlz-red via-[rgb(180,30,15)] to-vlz-dark text-white'
                    : 'bg-vlz-white text-vlz-black'
                }`}
              >
                <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-vlz-red" />
                  {plan.tier}
                </p>
                <p
                  className={`mb-6 text-sm ${plan.variant === 'red' ? 'text-white/70' : 'text-vlz-gray'}`}
                >
                  {plan.subtitle}
                </p>

                <div className="flex items-end justify-between gap-4">
                  <span
                    className="text-4xl font-bold sm:text-5xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Custom
                  </span>
                  <p
                    className={`text-right text-xs leading-relaxed ${
                      plan.variant === 'red' ? 'text-white/70' : 'text-vlz-gray'
                    }`}
                  >
                    Scoped to your project
                    <br />
                    book a call for a quote
                  </p>
                </div>

                <PrimaryButton href="#contact" className="mt-6 w-full justify-center">
                  START PROJECT
                </PrimaryButton>
              </div>

              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 p-6 sm:p-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vlz-green" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
