import { useMemo, useState } from 'react';
import { arenaInfo } from '../data/arenaData';
import { createReservation } from '../services/reservationService';

const today = new Date().toISOString().slice(0, 10);

export function useBooking() {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [customer, setCustomer] = useState({ nomeCliente: '', telefoneCliente: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(
    () =>
      selectedCourt &&
      selectedDate &&
      selectedTimes.length > 0 &&
      customer.nomeCliente.trim() &&
      customer.telefoneCliente.trim(),
    [customer, selectedCourt, selectedDate, selectedTimes],
  );

  function toggleTime(time) {
    setSelectedTimes((current) =>
      current.includes(time)
        ? current.filter((item) => item !== time)
        : [...current, time].sort(),
    );
  }

  function updateCustomer(field, value) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  async function submitBooking() {
    if (!canSubmit) return null;
    setIsSubmitting(true);

    const payload = {
      quadra: selectedCourt.name,
      tipoQuadra: selectedCourt.type,
      data: selectedDate,
      horarios: selectedTimes,
      status: 'reservado',
      nomeCliente: customer.nomeCliente.trim(),
      telefoneCliente: customer.telefoneCliente.trim(),
    };

    await createReservation(payload);

    const message = [
      'Ola, gostaria de reservar uma quadra na Arena Os Chapas.',
      '',
      `Quadra: ${payload.quadra} - ${payload.tipoQuadra}`,
      `Dia: ${payload.data}`,
      `Horarios: ${payload.horarios.join(', ')}`,
      `Nome: ${payload.nomeCliente}`,
      `Telefone: ${payload.telefoneCliente}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${arenaInfo.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitting(false);
    return payload;
  }

  return {
    selectedCourt,
    selectedDate,
    selectedTimes,
    customer,
    canSubmit,
    isSubmitting,
    setSelectedCourt,
    setSelectedDate,
    toggleTime,
    updateCustomer,
    submitBooking,
  };
}
