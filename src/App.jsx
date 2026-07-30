import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import BeachfrontResort from './pages/BeachfrontResort';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Landing from './pages/Landing';

// Routes that render their own full-bleed chrome and must not get the site
// Navbar/Footer or the fixed-header top offset.
const BARE_ROUTES = ['/'];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const bare = BARE_ROUTES.includes(pathname);

  const routes = (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Navigate to="/" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/beachfront-resort" element={<BeachfrontResort />} />
      <Route path="/projects/1" element={<BeachfrontResort />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );

  if (bare) {
    return <div className="min-h-screen bg-black text-white">{routes}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-grow pt-[81px]">{routes}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
