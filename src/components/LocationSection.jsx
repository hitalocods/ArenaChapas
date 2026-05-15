import { MapPin, Navigation } from 'lucide-react';
import { arenaInfo } from '../data/arenaData';
import { Section } from './ui/Section';

export function LocationSection() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(arenaInfo.displayAddress)}`;

  return (
    <Section
      id="localizacao"
      eyebrow="Localizacao"
      title="Chegue facil na Arena Os Chapas."
      subtitle={arenaInfo.displayAddress}
      className="bg-gradient-to-b from-sky-50/70 to-white"
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-sky-100 bg-white p-5 shadow-soft">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
            <MapPin size={24} />
          </span>
          <h3 className="mt-5 text-2xl font-black text-slate-950">Rua Visconde do Parnaiba, 2690</h3>
          <p className="mt-2 text-slate-500">Teresina. Funcionamos de quarta a domingo, das 18h as 23h.</p>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="primary-pill mt-6 inline-flex">
            <Navigation size={17} />
            Como Chegar
          </a>
        </div>

        <div className="map-card">
          <iframe
            title="Mapa Arena Os Chapas"
            src={`https://www.google.com/maps?q=${encodeURIComponent(arenaInfo.displayAddress)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Section>
  );
}
