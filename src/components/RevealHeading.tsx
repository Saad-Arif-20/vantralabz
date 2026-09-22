import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

export type RevealSegment = {
  text: string;
  emphasis?: boolean;
};

type RevealHeadingProps = {
  segments: RevealSegment[];
  as?: ElementType;
  className?: string;
  emphasisClassName?: string;
  /** 'mount' animates immediately (above-the-fold); 'inView' waits for scroll. */
  trigger?: 'mount' | 'inView';
  children?: ReactNode;
};

const wordVariants = {
  hidden: { opacity: 0, y: '0.6em', filter: 'blur(6px)' },
  visible: { opacity: 1, y: '0em', filter: 'blur(0px)' },
};

export default function RevealHeading({
  segments,
  as: Tag = 'h2',
  className = '',
  emphasisClassName = 'font-serif-display italic text-white/70',
  trigger = 'inView',
  children,
}: RevealHeadingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const animate = trigger === 'mount' ? true : inView;

  let wordIndex = 0;

  return (
    <Tag ref={ref} className={className}>
      {segments.map((segment, segmentIdx) => {
        const words = segment.text.split(' ').filter(Boolean);
        return (
          <span
            key={segmentIdx}
            className={segment.emphasis ? emphasisClassName : undefined}
          >
            {words.map((word, i) => {
              const currentIndex = wordIndex++;
              return (
                <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    className="inline-block"
                    variants={wordVariants}
                    initial="hidden"
                    animate={animate ? 'visible' : 'hidden'}
                    transition={{
                      duration: 0.6,
                      delay: currentIndex * 0.05,
                      ease: [0.2, 0.65, 0.3, 0.9],
                    }}
                  >
                    {word}
                    {i < words.length - 1 ? ' ' : ''}
                  </motion.span>
                </span>
              );
            })}
            {segmentIdx < segments.length - 1 ? ' ' : ''}
          </span>
        );
      })}
      {children}
    </Tag>
  );
}
