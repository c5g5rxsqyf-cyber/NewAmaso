import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import LogoCarousel from './components/LogoCarousel';
import Features from './components/Features';
import Roadmap from './components/Roadmap';
import Testimonials from './components/Testimonials';
import AutomationScale from './components/AutomationScale';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <Navbar />
      <div id="hero"><Hero /></div>
      <LogoCarousel />
      <div id="features"><Features /></div>
      <Roadmap />
      <div id="testimonials"><Testimonials /></div>
      <AutomationScale />
      <div id="contact"><Contact /></div>
      <Footer />
    </div>
  );
}

export default App;
