import { useEffect, useMemo, useState } from 'react';
import { arenaInfo } from '../data/arenaData';
import { createReservation, getScheduleSlots } from '../services/reservationService';

const today = new Date().toISOString().slice(0, 10);

export function useBooking() {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [slotStatuses, setSlotStatuses] = useState({});
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [customer, setCustomer] = useState({ nomeCliente: '', telefoneCliente: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!selectedCourt || !selectedDate) {
      Promise.resolve().then(() => setSlotStatuses({}));
      return undefined;
    }

    let active = true;

    async function loadSlots() {
      await Promise.resolve();
      if (!active) return;
      setIsLoadingSlots(true);
      const slots = await getScheduleSlots({ quadraId: selectedCourt.id, data: selectedDate });
      if (!active) return;
      setSlotStatuses(
        slots.reduce((acc, slot) => {
          acc[slot.horario] = slot.status;
          return acc;
        }, {}),
      );
      setIsLoadingSlots(false);
    }

    loadSlots();

    return () => {
      active = false;
    };
  }, [selectedCourt, selectedDate]);

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
    if (!selectedCourt || slotStatuses[time]) return;
    setSelectedTimes((current) =>
      current.includes(time)
        ? current.filter((item) => item !== time)
        : [...current, time].sort(),
    );
  }

  function selectCourt(court) {
    setSelectedCourt(court);
    setSelectedTimes([]);
  }

  function selectDate(date) {
    setSelectedDate(date);
    setSelectedTimes([]);
  }

  function updateCustomer(field, value) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  async function submitBooking() {
    if (!canSubmit) return null;
    setIsSubmitting(true);

    const payload = {
      quadra: selectedCourt.name,
      quadraId: selectedCourt.id,
      tipoQuadra: selectedCourt.type,
      data: selectedDate,
      horarios: selectedTimes,
      status: 'reservado',
      nomeCliente: customer.nomeCliente.trim(),
      telefoneCliente: customer.telefoneCliente.trim(),
    };

    await createReservation(payload);
    setSlotStatuses((current) => ({
      ...current,
      ...selectedTimes.reduce((acc, time) => {
        acc[time] = 'reservado';
        return acc;
      }, {}),
    }));
    setSelectedTimes([]);

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
    slotStatuses,
    isLoadingSlots,
    customer,
    canSubmit,
    isSubmitting,
    setSelectedCourt: selectCourt,
    setSelectedDate: selectDate,
    toggleTime,
    updateCustomer,
    submitBooking,
  };
}
