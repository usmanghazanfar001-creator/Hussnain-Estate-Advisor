import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocietyReel from "./components/SocietyReel";
import Properties from "./components/Properties";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";

export default function App() {
  return (
    <div className="font-body">
      <Navbar />
      <Hero />
      <SocietyReel />
      <Properties />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
