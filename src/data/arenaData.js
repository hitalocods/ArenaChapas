import {
  Dumbbell,
  GlassWater,
  MapPin,
  Music2,
  Sparkles,
  Trophy,
  Users,
  Waves,
} from 'lucide-react';

export const arenaInfo = {
  name: 'Arena Os Chapas',
  instagram: '@arenachapas',
  address: 'Rua Visconde do Parnaiba, 2690 - Teresina',
  displayAddress: 'Rua Visconde do Parnaiba, 2690 - Teresina',
  hours: 'Quarta a Domingo - 18h as 23h',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '5586999999999',
};

export const courts = [
  {
    id: 'quadra-01',
    name: 'Quadra 01',
    type: 'Beach Tennis Premium',
    badge: 'Mais reservada',
    image:
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-sky-100 to-white',
  },
  {
    id: 'quadra-02',
    name: 'Quadra 02',
    type: 'Volei de Areia',
    badge: 'Jogo em grupo',
    image:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-blue-50 to-slate-50',
  },
  {
    id: 'quadra-03',
    name: 'Quadra 03',
    type: 'Arena Funcional',
    badge: 'Treino completo',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-cyan-50 to-white',
  },
];

export const modalities = [
  {
    title: 'Beach Tennis',
    text: 'Quadras de areia com estrutura premium para partidas leves, tecnicas e competitivas.',
    icon: Waves,
  },
  {
    title: 'Volei',
    text: 'Espaco ideal para resenha, torneios e jogos em grupo com atmosfera de arena.',
    icon: Trophy,
  },
  {
    title: 'Funcional',
    text: 'Treinos na areia para resistencia, mobilidade e condicionamento em alto nivel.',
    icon: Dumbbell,
  },
];

export const restobarItems = [
  {
    title: 'Drinks',
    text: 'Caipirinha dobrada todos os dias e carta leve para o pos-jogo.',
    icon: GlassWater,
  },
  {
    title: 'Musica',
    text: 'Ambiente descontraido com trilha perfeita para estender a noite.',
    icon: Music2,
  },
  {
    title: 'Resenha',
    text: 'Mesas, encontros e energia social para jogar, brindar e ficar.',
    icon: Users,
  },
  {
    title: 'Experiencia',
    text: 'Arena esportiva com conforto, atendimento e clima premium.',
    icon: Sparkles,
  },
];

export const quickInfos = [
  'Funcionamos de Quarta a Domingo - 18h as 23h',
  'Volei, Beach Tennis e Funcional',
  'Caipirinha dobrada todos os dias',
  'Rua Visconde do Parnaiba, 2690 - Teresina',
];

export const timeSlots = ['18:00', '19:00', '20:00', '21:00', '22:00'];

export const statusLabels = {
  disponivel: 'Disponivel',
  reservado: 'Aguardando',
  confirmado: 'Confirmado',
};

export const statusStyles = {
  disponivel: 'bg-sky-100 text-sky-800 border-sky-200 shadow-sky-100',
  reservado: 'bg-amber-100 text-amber-800 border-amber-200 shadow-amber-100',
  confirmado: 'bg-slate-200 text-slate-600 border-slate-300 shadow-slate-100',
};

export const adminStats = [
  { label: 'Reservas hoje', value: '12' },
  { label: 'Confirmadas', value: '08' },
  { label: 'Aguardando', value: '04' },
];

export const mapIcon = MapPin;
