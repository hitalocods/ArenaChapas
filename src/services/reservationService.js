import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

const collectionName = 'reservas';
const clientsCollectionName = 'clientes';
const scheduleCollectionName = 'agenda';

export const fallbackReservations = [
  {
    id: 'demo-1',
    quadra: 'Quadra 01',
    data: new Date().toISOString().slice(0, 10),
    horarios: ['18:00', '19:00'],
    status: 'reservado',
    nomeCliente: 'Cliente Demo',
    telefoneCliente: '(86) 99999-9999',
  },
  {
    id: 'demo-2',
    quadra: 'Quadra 02',
    data: new Date().toISOString().slice(0, 10),
    horarios: ['21:00'],
    status: 'confirmado',
    nomeCliente: 'Reserva Confirmada',
    telefoneCliente: '(86) 98888-8888',
  },
];

export async function createReservation(payload) {
  if (!isFirebaseConfigured) {
    return { id: `local-${Date.now()}`, ...payload };
  }

  const docRef = await addDoc(collection(db, collectionName), {
    ...payload,
    createdAt: new Date().toISOString(),
  });

  await addDoc(collection(db, clientsCollectionName), {
    nomeCliente: payload.nomeCliente,
    telefoneCliente: payload.telefoneCliente,
    ultimaReservaEm: new Date().toISOString(),
    origem: 'site',
  });

  await Promise.all(payload.horarios.map((horario) => saveScheduleSlot({
    quadraId: payload.quadraId,
    quadra: payload.quadra,
    data: payload.data,
    horario,
    status: payload.status,
    reservaId: docRef.id,
  })));

  return { id: docRef.id, ...payload };
}

export async function getReservations(filters = {}) {
  if (!isFirebaseConfigured) {
    return fallbackReservations.filter((item) => {
      const courtMatch = !filters.quadra || item.quadra === filters.quadra;
      const dateMatch = !filters.data || item.data === filters.data;
      const statusMatch = !filters.status || item.status === filters.status;
      return courtMatch && dateMatch && statusMatch;
    });
  }

  const clauses = [];
  if (filters.quadra) clauses.push(where('quadra', '==', filters.quadra));
  if (filters.data) clauses.push(where('data', '==', filters.data));
  if (filters.status) clauses.push(where('status', '==', filters.status));
  const snapshot = await getDocs(query(collection(db, collectionName), ...clauses));
  return snapshot.docs
    .map((item) => ({ id: item.id, ...item.data() }))
    .sort((a, b) => String(b.data).localeCompare(String(a.data)));
}

export async function updateReservationStatus(id, status) {
  if (!isFirebaseConfigured || id.startsWith('demo')) return;
  await updateDoc(doc(db, collectionName, id), { status });
  const slots = await getDocs(query(collection(db, scheduleCollectionName), where('reservaId', '==', id)));
  await Promise.all(slots.docs.map((slot) => updateDoc(doc(db, scheduleCollectionName, slot.id), { status })));
}

export async function updateReservationTimes(id, reservation, horarios) {
  if (!isFirebaseConfigured || id.startsWith('demo')) return;
  await updateDoc(doc(db, collectionName, id), { horarios });
  const slots = await getDocs(query(collection(db, scheduleCollectionName), where('reservaId', '==', id)));
  await Promise.all(slots.docs.map((slot) => deleteDoc(doc(db, scheduleCollectionName, slot.id))));
  await Promise.all(horarios.map((horario) => saveScheduleSlot({
    quadraId: reservation.quadraId || courtNameToId(reservation.quadra),
    quadra: reservation.quadra,
    data: reservation.data,
    horario,
    status: reservation.status,
    reservaId: id,
  })));
}

export async function deleteReservation(id) {
  if (!isFirebaseConfigured || id.startsWith('demo')) return;
  await deleteDoc(doc(db, collectionName, id));
  const slots = await getDocs(query(collection(db, scheduleCollectionName), where('reservaId', '==', id)));
  await Promise.all(slots.docs.map((slot) => deleteDoc(doc(db, scheduleCollectionName, slot.id))));
}

export async function getScheduleSlots({ quadraId, data }) {
  if (!quadraId || !data) return [];

  if (!isFirebaseConfigured) {
    return fallbackReservations
      .filter((item) => courtNameToId(item.quadra) === quadraId && item.data === data)
      .flatMap((item) =>
        item.horarios.map((horario) => ({
          quadraId,
          quadra: item.quadra,
          data: item.data,
          horario,
          status: item.status,
          reservaId: item.id,
        })),
      );
  }

  const snapshot = await getDocs(
    query(
      collection(db, scheduleCollectionName),
      where('quadraId', '==', quadraId),
      where('data', '==', data),
    ),
  );

  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

function saveScheduleSlot(slot) {
  const slotId = `${slot.quadraId}_${slot.data}_${slot.horario.replace(':', '')}`;
  return setDoc(doc(db, scheduleCollectionName, slotId), {
    ...slot,
    updatedAt: new Date().toISOString(),
  });
}

function courtNameToId(name) {
  const match = String(name || '').match(/\d+/);
  return match ? `quadra-${match[0].padStart(2, '0')}` : '';
}
