import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TeamMemberCardProps {
  position: 'left' | 'right';
  role: string;
  firstName: string;
  lastName?: string;
  imageUrl: string;
  facePosition?: string;
  description: string;
  onConnect?: () => void;
  className?: string;
}

/**
 * Editorial-style team member card: overlapping portrait + large display
 * name, alternating left/right from sm up (stacks plainly on mobile where
 * there isn't room for the overlap), adapted to the site's red/black/white
 * brand instead of the original zinc/dark-mode palette.
 */
export default function TeamMemberCard({
  position,
  role,
  firstName,
  lastName,
  imageUrl,
  facePosition,
  description,
  onConnect,
  className,
}: TeamMemberCardProps) {
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;
  const isRight = position === 'right';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative flex flex-col justify-center', className)}
    >
      <motion.p
        initial={{ opacity: 0, x: isRight ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          'mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-vlz-gray',
          isRight && 'sm:text-right',
        )}
      >
        {role}
      </motion.p>

      <div className={cn('flex flex-col sm:flex-row sm:items-center', isRight && 'sm:flex-row-reverse')}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="group relative z-10 mx-auto h-64 w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl shadow-xl sm:mx-0 sm:h-72 sm:w-56 md:h-80 md:w-64"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent"
          />
          <img
            src={imageUrl}
            alt={fullName}
            style={{ objectPosition: facePosition ?? '50% 20%' }}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isRight ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative z-20 -mt-10 w-[90%] mx-auto flex flex-col gap-6 rounded-2xl border border-black/10 bg-vlz-white p-6 shadow-lg',
            'sm:mx-0 sm:mt-0 sm:w-auto sm:flex-1 sm:gap-10 sm:p-8',
            isRight ? 'sm:-mr-10 sm:items-end sm:text-right' : 'sm:-ml-10 sm:items-start',
          )}
        >
          <p
            className="text-4xl font-bold leading-[1.05] tracking-tight text-vlz-black sm:text-5xl"
            style={{ fontFamily: 'var(--font-expanded)' }}
          >
            {firstName}
            {lastName && (
              <>
                <br />
                <span className="text-vlz-red">{lastName}</span>
              </>
            )}
          </p>

          <div className={cn('flex w-full items-center gap-5 sm:gap-6', isRight && 'sm:flex-row-reverse')}>
            <motion.button
              type="button"
              onClick={onConnect}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Book a call about working with ${fullName}`}
              className="group/btn flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-black/15 transition-colors duration-300 hover:border-vlz-black hover:bg-vlz-black sm:h-16 sm:w-16"
            >
              <ArrowRight
                size={18}
                className={cn(
                  'text-vlz-black transition-all duration-300 group-hover/btn:-rotate-45 group-hover/btn:text-white',
                  isRight && 'sm:rotate-180 sm:group-hover/btn:rotate-[225deg]',
                )}
              />
            </motion.button>

            <p className="flex-1 text-sm leading-relaxed text-vlz-gray sm:text-base">{description}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
