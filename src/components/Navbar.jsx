import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
  ];

  const checkIsActive = (path, isActive) => {
    if (isActive) return true;
    if (path === '/projects' && location.pathname.startsWith('/projects')) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-[81px] flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/assets/Logo_C.png" alt="Pixel Island" className="h-12 w-auto object-contain" />
          <div className="flex flex-col justify-center">
            <span className="font-sans font-bold text-2xl leading-none tracking-tight">Pixel</span>
            <span className="font-sans font-bold text-2xl leading-none tracking-tight">Island</span>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-gold ${
                  checkIsActive(link.path, isActive) ? 'text-white border-b-2 border-gold pb-1' : 'text-gray-400'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink to="/contact" className="btn-primary ml-4 text-sm px-5 py-2.5">
            Get Started
          </NavLink>
        </nav>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-[81px] left-0 w-full bg-black p-6 flex flex-col gap-6">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  checkIsActive(link.path, isActive) ? 'text-gold' : 'text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink to="/contact" onClick={() => setIsOpen(false)} className="btn-primary justify-center">
            Get Started
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
