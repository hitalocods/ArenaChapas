import { Camera, MessageCircle, MapPin } from 'lucide-react';
import { arenaInfo } from '../data/arenaData';

export function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="flex items-center gap-3">
          <img src="/img/ArenaChapas.png" alt="Arena Os Chapas" className="h-14 w-14 object-contain" />
          <div>
            <strong className="text-lg text-slate-950">Arena Os Chapas</strong>
            <p className="text-sm text-slate-500">© Arena Os Chapas — Todos os direitos reservados.</p>
          </div>
        </div>
        <div className="grid gap-2 text-sm font-semibold text-slate-600">
          <a href="https://www.instagram.com/arenachapas" target="_blank" rel="noreferrer" className="footer-link">
            <Camera size={16} />
            {arenaInfo.instagram}
          </a>
          <a href={`https://wa.me/${arenaInfo.whatsapp}`} target="_blank" rel="noreferrer" className="footer-link">
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <span className="footer-link">
            <MapPin size={16} />
            {arenaInfo.displayAddress}
          </span>
          <span className="text-slate-400">{arenaInfo.hours}</span>
        </div>
      </div>
    </footer>
  );
}
