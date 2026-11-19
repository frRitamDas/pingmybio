import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
      </main>
      <Footer />
    </div>
  );
}
