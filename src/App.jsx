import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import LogoCarousel from './components/LogoCarousel';
import Features from './components/Features';
import EcosystemSlideshow from './components/EcosystemSlideshow';
import Roadmap from './components/Roadmap';
import Testimonials from './components/Testimonials';
import AutomationScale from './components/AutomationScale';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GradientDivider from './components/GradientDivider';

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <Navbar />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div id="hero"><Hero /></div>
        <GradientDivider height={2} />
        <LogoCarousel />
        <div id="features"><Features /></div>
        <div id="ecosystems"><EcosystemSlideshow /></div>
        <Roadmap />
        <div id="testimonials"><Testimonials /></div>
        <AutomationScale />
        <div id="contact"><Contact /></div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
