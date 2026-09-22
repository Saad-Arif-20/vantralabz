import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Check, CircleDot, Sparkles } from 'lucide-react';

const STEPS = ['Receive', 'Qualify', 'Notify', 'Schedule'];

const MESSAGES = [
  { from: 'ai' as const, text: 'New lead just filled out the contact form.' },
  { from: 'system' as const, text: 'Qualifying and adding to CRM…' },
  { from: 'ai' as const, text: 'Done — follow-up email scheduled for 9am tomorrow.' },
];

export default function WorkflowMockup() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((step) => (step + 1) % STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="liquid-glass overflow-hidden rounded-3xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 text-xs text-white/40">AI Workflow Automation — live</span>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-5 md:gap-8 md:p-10">
        <div className="flex flex-col gap-3 md:col-span-3">
          {MESSAGES.map((message, index) => (
            <motion.div
              key={message.text}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.4 }}
              className={`flex items-start gap-2.5 ${
                message.from === 'system' ? 'flex-row-reverse text-right' : ''
              }`}
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                {message.from === 'ai' ? (
                  <Bot size={14} className="text-white/70" />
                ) : (
                  <Sparkles size={14} className="text-white/70" />
                )}
              </span>
              <span
                className={`liquid-glass rounded-2xl px-4 py-2.5 text-sm text-white/80 ${
                  message.from === 'system' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                }`}
              >
                {message.text}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-2 md:col-span-2">
          {STEPS.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                  index === activeStep ? 'bg-white text-black' : 'bg-white/10 text-white/40'
                }`}
              >
                {index === activeStep ? (
                  <CircleDot size={12} />
                ) : index < activeStep ? (
                  <Check size={12} />
                ) : (
                  <span className="text-[10px]">{index + 1}</span>
                )}
              </span>
              <span
                className={`text-sm transition-colors duration-500 ${
                  index === activeStep ? 'text-white' : 'text-white/40'
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
