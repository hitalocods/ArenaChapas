import { useState } from 'react';
import { BookingFlow } from './components/BookingFlow';
import { CourtsSection } from './components/CourtsSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LocationSection } from './components/LocationSection';
import { ModalitiesSection } from './components/ModalitiesSection';
import { NavBar } from './components/NavBar';
import { RestobarSection } from './components/RestobarSection';
import { useBooking } from './hooks/useBooking';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [adminOpen, setAdminOpen] = useState(window.location.hash === '#admin');
  const booking = useBooking();

  function closeAdmin() {
    window.location.hash = '';
    setAdminOpen(false);
  }

  function selectCourt(court) {
    booking.setSelectedCourt(court);
    window.setTimeout(() => {
      document.getElementById('booking-day')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 120);
  }

  if (adminOpen) return <AdminPage onBack={closeAdmin} />;

  return (
    <>
      <NavBar />
      <Hero />
      <CourtsSection selectedCourt={booking.selectedCourt} onSelect={selectCourt} />
      <BookingFlow booking={booking} />
      <ModalitiesSection />
      <RestobarSection />
      <LocationSection />
      <Footer />
    </>
  );
}
