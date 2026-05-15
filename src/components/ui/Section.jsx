import { motion } from 'framer-motion';

export function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`section-shell ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        {(eyebrow || title || subtitle) && (
          <div className="mb-8 max-w-2xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
