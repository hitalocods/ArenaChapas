import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { courts } from '../data/arenaData';
import { Section } from './ui/Section';

export function CourtsSection({ selectedCourt, onSelect }) {
  return (
    <Section
      id="quadras"
      eyebrow="1. Arena"
      title="Escolha sua quadra"
    >
      <div className="court-grid">
        {courts.map((court, index) => {
          const active = selectedCourt?.id === court.id;
          return (
            <motion.button
              key={court.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(court)}
              className={`court-card group text-left ${active ? 'court-card-active' : ''}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.3rem]">
                <img src={court.image} alt={court.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.08]" />
                <div className={`absolute inset-0 bg-gradient-to-t ${court.accent} opacity-45`} />
                <span className="court-badge absolute left-3 top-3 rounded-full bg-white/86 px-3 py-1 text-xs font-bold text-sky-800 shadow-soft backdrop-blur">
                  {court.badge}
                </span>
                {active && (
                  <span className="court-check absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-200">
                    <Check size={18} />
                  </span>
                )}
              </div>
              <div className="court-body p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="court-title text-xl font-black text-slate-950">{court.name}</h3>
                    <p className="court-type mt-1 text-sm font-semibold text-slate-500">{court.type}</p>
                  </div>
                  <span className="court-arrow mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-700 transition group-hover:bg-sky-500 group-hover:text-white">
                    <ChevronRight size={18} />
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </Section>
  );
}
