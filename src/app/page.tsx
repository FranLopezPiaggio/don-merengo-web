import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BookingSection from '@/components/BookingSection';
import ServicesCarousel from '@/components/ServicesCarousel';
import History from '@/components/History';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BookingSection />
      <ServicesCarousel />
      <History />
      <LocationSection />
      <Footer />
    </main>
  );
}
