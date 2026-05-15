import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ArrowLeft, BarChart3, Calendar, Check, Clock3, Lock, LogOut, Plus, RotateCcw, Search, Trash2, Unlock, User } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { courts, statusLabels, timeSlots } from '../data/arenaData';
import { auth, isFirebaseConfigured } from '../services/firebase';
import {
  deleteReservation,
  getReservations,
  updateReservationStatus,
  updateReservationTimes,
} from '../services/reservationService';

export function AdminPage({ onBack }) {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [filters, setFilters] = useState({ quadra: '', data: '', status: '' });
  const [report, setReport] = useState({
    quadra: '',
    period: 'dia',
    date: new Date().toISOString().slice(0, 10),
    month: new Date().toISOString().slice(0, 7),
  });
  const [reservations, setReservations] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const logged = user || !isFirebaseConfigured;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const isAuthorizedAdmin = !isFirebaseConfigured || user?.email === adminEmail;

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    if (!logged || !isAuthorizedAdmin) return undefined;

    let active = true;

    async function fetchReservations() {
      await Promise.resolve();
      if (!active) return;
      setLoading(true);
      const [items, reportItems] = await Promise.all([getReservations(filters), getReservations({})]);
      if (!active) return;
      setReservations(items);
      setAllReservations(reportItems);
      setLoading(false);
    }

    fetchReservations();

    return () => {
      active = false;
    };
  }, [logged, isAuthorizedAdmin, filters]);

  async function handleLogin(event) {
    event.preventDefault();
    if (!auth) return;
    await signInWithEmailAndPassword(auth, login.email, login.password);
  }

  async function changeStatus(id, status) {
    await updateReservationStatus(id, status);
    setReservations((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
    setAllReservations((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  async function toggleTime(reservation, time) {
    const horarios = reservation.horarios.includes(time)
      ? reservation.horarios.filter((item) => item !== time)
      : [...reservation.horarios, time].sort();
    await updateReservationTimes(reservation.id, horarios);
    setReservations((current) =>
      current.map((item) => (item.id === reservation.id ? { ...item, horarios } : item)),
    );
    setAllReservations((current) =>
      current.map((item) => (item.id === reservation.id ? { ...item, horarios } : item)),
    );
  }

  async function removeReservation(id) {
    await deleteReservation(id);
    setReservations((current) => current.filter((item) => item.id !== id));
    setAllReservations((current) => current.filter((item) => item.id !== id));
  }

  const stats = useMemo(
    () => ({
      total: reservations.length,
      reservado: reservations.filter((item) => item.status === 'reservado').length,
      confirmado: reservations.filter((item) => item.status === 'confirmado').length,
    }),
    [reservations],
  );

  const reportReservations = useMemo(() => {
    return allReservations.filter((item) => {
      const courtMatch = !report.quadra || item.quadra === report.quadra;
      const periodMatch =
        report.period === 'total' ||
        (report.period === 'dia' && item.data === report.date) ||
        (report.period === 'mes' && item.data?.startsWith(report.month));

      return courtMatch && periodMatch;
    });
  }, [allReservations, report]);

  const reportStats = useMemo(() => {
    const confirmed = reportReservations.filter((item) => item.status === 'confirmado');
    const pending = reportReservations.filter((item) => item.status === 'reservado');
    const totalTimes = reportReservations.reduce((sum, item) => sum + (item.horarios?.length || 0), 0);

    return {
      reservations: reportReservations.length,
      times: totalTimes,
      confirmed: confirmed.length,
      pending: pending.length,
    };
  }, [reportReservations]);

  const courtReport = useMemo(() => {
    return courts.map((court) => {
      const items = reportReservations.filter((item) => item.quadra === court.name);
      return {
        name: court.name,
        reservations: items.length,
        times: items.reduce((sum, item) => sum + (item.horarios?.length || 0), 0),
      };
    });
  }, [reportReservations]);

  if (!logged) {
    return (
      <main className="admin-shell">
        <button className="secondary-pill mb-6" onClick={onBack}>
          <ArrowLeft size={16} />
          Voltar
        </button>
        <form onSubmit={handleLogin} className="admin-login">
          <img src="/img/ArenaChapas.png" alt="Arena Os Chapas" className="mx-auto h-24 w-24 object-contain" />
          <h1>Painel Administrativo</h1>
          <p>Entre com uma conta autorizada no Firebase Authentication.</p>
          <input className="input" type="email" placeholder="E-mail" value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} />
          <input className="input" type="password" placeholder="Senha" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} />
          <button className="reserve-button">
            <Lock size={18} />
            Entrar
          </button>
        </form>
      </main>
    );
  }

  if (!isAuthorizedAdmin) {
    return (
      <main className="admin-shell">
        <button className="secondary-pill mb-6" onClick={onBack}>
          <ArrowLeft size={16} />
          Voltar
        </button>
        <div className="admin-login">
          <img src="/img/ArenaChapas.png" alt="Arena Os Chapas" className="mx-auto h-24 w-24 object-contain" />
          <h1>Acesso restrito</h1>
          <p>Este e-mail nao esta autorizado como administrador da Arena Os Chapas.</p>
          <button className="reserve-button" onClick={() => signOut(auth)}>
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <div className="admin-topbar">
        <div className="admin-brand">
          <button className="admin-icon-action" onClick={onBack} aria-label="Voltar para o site">
            <ArrowLeft size={18} />
          </button>
          <img src="/img/ArenaChapas.png" alt="Arena Os Chapas" />
          <div>
            <p className="eyebrow mb-1">Admin</p>
            <h1>Painel Arena Os Chapas</h1>
          </div>
        </div>
        {auth && (
          <button className="admin-logout" onClick={() => signOut(auth)}>
            <LogOut size={16} />
            Sair
          </button>
        )}
      </div>

      {!isFirebaseConfigured && (
        <div className="demo-warning">
          Firebase ainda nao configurado. O painel esta em modo demonstracao; preencha `.env` com as credenciais para persistir reservas.
        </div>
      )}

      <section className="admin-card">
        <div className="admin-section-heading">
          <div>
            <p className="eyebrow mb-1">Hoje</p>
            <h2>Resumo das reservas</h2>
          </div>
        </div>
        <div className="admin-stats">
        <Stat label="Reservas" value={stats.total} icon={Calendar} />
        <Stat label="Aguardando" value={stats.reservado} icon={Search} />
        <Stat label="Confirmadas" value={stats.confirmado} icon={Check} />
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-report-head">
          <div>
            <p className="eyebrow mb-1">Relatorio</p>
            <h2>Agendamentos por quadra</h2>
          </div>
          <div className="admin-report-controls">
            <select value={report.quadra} onChange={(event) => setReport({ ...report, quadra: event.target.value })}>
              <option value="">Todas as quadras</option>
              {courts.map((court) => (
                <option key={court.id} value={court.name}>
                  {court.name}
                </option>
              ))}
            </select>
            <select value={report.period} onChange={(event) => setReport({ ...report, period: event.target.value })}>
              <option value="dia">Por dia</option>
              <option value="mes">Por mes</option>
              <option value="total">Total</option>
            </select>
            {report.period === 'dia' && (
              <input type="date" value={report.date} onChange={(event) => setReport({ ...report, date: event.target.value })} />
            )}
            {report.period === 'mes' && (
              <input type="month" value={report.month} onChange={(event) => setReport({ ...report, month: event.target.value })} />
            )}
          </div>
        </div>

        <div className="admin-report-stats">
          <Stat label="Agendamentos" value={reportStats.reservations} icon={BarChart3} />
          <Stat label="Horarios" value={reportStats.times} icon={Clock3} />
          <Stat label="Confirmados" value={reportStats.confirmed} icon={Check} />
          <Stat label="Aguardando" value={reportStats.pending} icon={Search} />
        </div>

        <div className="court-report-grid">
          {courtReport.map((court) => (
            <div key={court.name} className="court-report-card">
              <strong>{court.name}</strong>
              <span>{court.reservations} agendamento(s)</span>
              <small>{court.times} horario(s)</small>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-section-heading">
          <div>
            <p className="eyebrow mb-1">Reservas</p>
            <h2>Controle de agendamentos</h2>
          </div>
          <div className="admin-filters">
            <select value={filters.quadra} onChange={(event) => setFilters({ ...filters, quadra: event.target.value })}>
              <option value="">Todas as quadras</option>
              {courts.map((court) => (
                <option key={court.id} value={court.name}>
                  {court.name}
                </option>
              ))}
            </select>
            <input type="date" value={filters.data} onChange={(event) => setFilters({ ...filters, data: event.target.value })} />
            <select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
              <option value="">Todos os status</option>
              <option value="disponivel">Disponivel</option>
              <option value="reservado">Aguardando</option>
              <option value="confirmado">Confirmado</option>
            </select>
            <button className="admin-clear" onClick={() => setFilters({ quadra: '', data: '', status: '' })}>
              <RotateCcw size={16} />
              Limpar
            </button>
          </div>
        </div>

        <div className="admin-list">
          {loading && <div className="admin-empty">Carregando reservas...</div>}
          {!loading && reservations.length === 0 && <div className="admin-empty">Nenhuma reserva encontrada.</div>}
          {reservations.map((reservation) => (
            <article key={reservation.id} className="reservation-card">
              <div className="reservation-main">
                <div>
                  <span className={`status-dot status-${reservation.status}`}>{statusLabels[reservation.status] || reservation.status}</span>
                  <h2>{reservation.quadra}</h2>
                  <p>{reservation.data}</p>
                </div>
                <div className="client-block">
                  <User size={18} />
                  <span>{reservation.nomeCliente}</span>
                  <strong>{reservation.telefoneCliente}</strong>
                </div>
              </div>

              <div className="admin-time-grid">
                {timeSlots.map((time) => {
                  const active = reservation.horarios.includes(time);
                  return (
                    <button key={time} className={active ? 'admin-time active' : 'admin-time'} onClick={() => toggleTime(reservation, time)}>
                      {active ? <Unlock size={14} /> : <Plus size={14} />}
                      {time}
                    </button>
                  );
                })}
              </div>

              <div className="reservation-actions">
                <button onClick={() => changeStatus(reservation.id, 'reservado')}>Aguardando</button>
                <button onClick={() => changeStatus(reservation.id, 'confirmado')}>Confirmar</button>
                <button onClick={() => changeStatus(reservation.id, 'disponivel')}>Liberar</button>
                <button className="danger" onClick={() => removeReservation(reservation.id)}>
                  <Trash2 size={15} />
                  Remover
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="stat-card">
      <span>
        <Icon size={20} />
      </span>
      <div>
        <strong>{value}</strong>
        <p>{label}</p>
      </div>
    </div>
  );
}
