import { motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, Clock3, Send, UserRound } from 'lucide-react';
import { statusLabels, statusStyles, timeSlots } from '../data/arenaData';
import { Section } from './ui/Section';

const demoStatus = {
  '19:00': 'reservado',
  '22:00': 'confirmado',
};

export function BookingFlow({ booking }) {
  const {
    selectedCourt,
    selectedDate,
    selectedTimes,
    customer,
    canSubmit,
    isSubmitting,
    setSelectedDate,
    toggleTime,
    updateCustomer,
    submitBooking,
  } = booking;

  return (
    <Section
      id="reserva"
      eyebrow="2. Dia"
      title="Agora escolha o dia e os horarios"
      className="bg-gradient-to-b from-white to-sky-50/60"
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="booking-summary">
          <div className="step-chip">Ordem da reserva</div>
          <h3 className="mt-4 text-2xl font-black text-slate-950">
            {selectedCourt ? selectedCourt.name : 'Selecione uma quadra acima'}
          </h3>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            {selectedCourt ? selectedCourt.type : 'A agenda libera apos a escolha da quadra.'}
          </p>

          <div className="mt-6 space-y-3">
            <FlowLine active={Boolean(selectedCourt)} label="1. Arena" />
            <FlowLine active={Boolean(selectedDate)} label="2. Dia" />
            <FlowLine active={selectedTimes.length > 0} label={`3. Horario (${selectedTimes.length})`} />
            <FlowLine active={Boolean(customer.nomeCliente && customer.telefoneCliente)} label="Dados do cliente" />
          </div>

          <div className="mt-6 rounded-3xl bg-white p-4 shadow-inner-soft">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Status dos horarios</p>
            <div className="mt-3 grid gap-2">
              <Legend color="bg-sky-200" label="Disponivel" />
              <Legend color="bg-amber-200" label="Aguardando confirmacao" />
              <Legend color="bg-slate-300" label="Confirmado/indisponivel" />
            </div>
          </div>
        </div>

        <div className="booking-panel">
          <div className="grid gap-4 sm:grid-cols-2">
            <label id="booking-day" className="field-card">
              <span>
                <CalendarDays size={18} />
                2. Dia
              </span>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(event) => setSelectedDate(event.target.value)}
              />
            </label>
            <div className="field-card">
              <span>
                <Clock3 size={18} />
                3. Horario
              </span>
              <strong className="text-sm text-slate-950">
                {selectedTimes.length ? selectedTimes.join(', ') : 'Nenhum horario selecionado'}
              </strong>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {timeSlots.map((time) => {
              const status = demoStatus[time] || 'disponivel';
              const selected = selectedTimes.includes(time);
              const disabled = status === 'confirmado' || !selectedCourt;
              return (
                <motion.button
                  key={time}
                  whileHover={!disabled ? { y: -4 } : undefined}
                  whileTap={!disabled ? { scale: 0.94 } : undefined}
                  disabled={disabled}
                  onClick={() => toggleTime(time)}
                  className={`time-card ${statusStyles[status]} ${selected ? 'time-card-selected' : ''}`}
                >
                  <strong>{time}</strong>
                  <span>{selected ? 'Selecionado' : statusLabels[status]}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-white p-4 shadow-inner-soft">
            <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-slate-500">
              <UserRound size={17} />
              4. Preencher dados
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="input"
                placeholder="Nome"
                value={customer.nomeCliente}
                onChange={(event) => updateCustomer('nomeCliente', event.target.value)}
              />
              <input
                className="input"
                placeholder="WhatsApp"
                value={customer.telefoneCliente}
                onChange={(event) => updateCustomer('telefoneCliente', event.target.value)}
              />
            </div>
            <button className="reserve-button mt-4" disabled={!canSubmit || isSubmitting} onClick={submitBooking}>
              <Send size={18} />
              {isSubmitting ? 'Enviando...' : 'Reservar Horarios'}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FlowLine({ active, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`flex h-8 w-8 items-center justify-center rounded-full ${active ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
        <CheckCircle2 size={17} />
      </span>
      <span className={`text-sm font-bold ${active ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      {label}
    </div>
  );
}
