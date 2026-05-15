import { motion } from 'framer-motion';
import { restobarItems } from '../data/arenaData';
import { Section } from './ui/Section';

export function RestobarSection() {
  return (
    <Section
      id="restobar"
      eyebrow="Restobar"
      title="Depois do jogo, a arena continua."
      subtitle="Drinks, musica e ambiente social para transformar a reserva em uma experiencia completa."
      className="bg-slate-950 text-white"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-sky-100">
          <img
            src="https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=80"
            alt="Drinks e ambiente social"
            className="h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/20 bg-white/14 p-4 backdrop-blur-xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-100">Caipirinha dobrada</p>
            <strong className="mt-1 block text-2xl">Todos os dias de funcionamento</strong>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {restobarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="resto-card"
              >
                <span>
                  <Icon size={22} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
