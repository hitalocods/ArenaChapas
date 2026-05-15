import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

const collectionName = 'reservas';
const clientsCollectionName = 'clientes';

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
}

export async function updateReservationTimes(id, horarios) {
  if (!isFirebaseConfigured || id.startsWith('demo')) return;
  await updateDoc(doc(db, collectionName, id), { horarios });
}

export async function deleteReservation(id) {
  if (!isFirebaseConfigured || id.startsWith('demo')) return;
  await deleteDoc(doc(db, collectionName, id));
}
