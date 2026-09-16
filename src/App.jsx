import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import WhyChooseSection from "./components/WhyChooseSection";
import StatsSection from "./components/StatsSection";
import MenuSection from "./components/MenuSection";
import TestimonialsSection from "./components/TestimonialsSection";
import EventsSection from "./components/EventsSection";
import ChefsSection from "./components/ChefsSection";
import BookingSection from "./components/BookingSection";
import GallerySection from "./components/GallerySection";
import Footer from "./components/Footer";

// ============================================================
// App — Assemblage final (Phase 7)
// Ordre maquette : Navbar / Hero / About / WhyChoose / Stats /
// Menu / Testimonials / Events / Chefs / Booking / Gallery / Footer.
// Toutes les sections sont enveloppées dans <main> (sauf Navbar/Footer).
// ============================================================
export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-white">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <StatsSection />
        <MenuSection />
        <TestimonialsSection />
        <EventsSection />
        <ChefsSection />
        <BookingSection />
        <GallerySection />
      </main>

      <Footer />
    </div>
  );
}
