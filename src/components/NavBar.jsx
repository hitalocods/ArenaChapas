import { CalendarDays, Camera, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { arenaInfo } from '../data/arenaData';

const links = [
  { label: 'Quadras', href: '#quadras' },
  { label: 'Agenda', href: '#quadras' },
  { label: 'Modalidades', href: '#modalidades' },
  { label: 'Localizacao', href: '#localizacao' },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-[1.35rem] border border-white/70 bg-white/78 px-3 py-2 shadow-soft backdrop-blur-xl sm:px-4">
        <a href="#top" className="flex items-center gap-2">
          <img src="/img/ArenaChapas.png" alt="Arena Os Chapas" className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <strong className="block text-sm text-slate-950">{arenaInfo.name}</strong>
            <span className="text-xs text-slate-500">Beach • Volei • Funcional</span>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <a className="icon-button" href="https://www.instagram.com/arenachapas" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Camera size={18} />
          </a>
          <a href="#quadras" className="primary-pill">
            <CalendarDays size={17} />
            Reservar
          </a>
        </div>

        <button className="icon-button sm:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-[1.3rem] border border-white/70 bg-white/92 p-3 shadow-soft backdrop-blur-xl sm:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="mobile-link" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="mt-2 grid gap-2">
            <a href="#quadras" className="primary-pill justify-center" onClick={() => setOpen(false)}>
              Reservar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
