import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Sparkles, Trophy, Waves } from 'lucide-react';
import { quickInfos } from '../data/arenaData';
import { GlassCard } from './ui/GlassCard';

const quickIcons = [Clock, Waves, Sparkles, MapPin];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[92svh] overflow-hidden pt-24 sm:pt-28">
      <div className="absolute inset-0 -z-20">
        <img src="/hero-arena.png" alt="" className="h-full w-full object-cover opacity-50 blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/88 to-sky-100/72" />
      </div>
      <div className="hero-orbit left-[8%] top-[22%]" />
      <div className="hero-orbit right-[10%] top-[18%] h-24 w-24 opacity-50" />
      <div className="hero-particles" />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="pt-8"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/72 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-700 shadow-soft backdrop-blur">
            <Trophy size={15} />
            Arena premium em Teresina
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] text-slate-950 sm:text-6xl lg:text-7xl">
            RESERVE SUA QUADRA
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
            Viva a experiência da areia com conforto, esporte e resenha.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {quickInfos.map((info, index) => {
              const Icon = quickIcons[index];
              return (
                <GlassCard key={info} className="flex items-center gap-3 p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-medium text-slate-600">{info}</span>
                </GlassCard>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#quadras" className="hero-primary">
              Reservar Agora
              <ArrowRight size={19} />
            </a>
            <a href="#quadras" className="hero-secondary">
              Ver Quadras
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.12 }}
          className="relative"
        >
          <div className="premium-visual">
            <img src="/img/ArenaChapas.png" alt="Arena Os Chapas" className="mx-auto h-44 w-44 object-contain sm:h-56 sm:w-56" />
            <div className="mt-5 rounded-3xl bg-white/72 p-4 shadow-soft backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">Hoje</span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">18h - 23h</span>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {['18', '19', '20', '21', '22'].map((hour) => (
                  <div key={hour} className="rounded-2xl bg-white px-2 py-3 text-center shadow-inner-soft">
                    <strong className="block text-sm text-slate-950">{hour}:00</strong>
                    <span className="text-[10px] font-bold uppercase text-sky-600">Livre</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
