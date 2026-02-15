import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-cream/95 backdrop-blur-lg shadow-xl py-2'
        : 'bg-white/90 backdrop-blur-sm py-3 md:py-4'
        }`}
    >
      {/* Glossy Gradient Border Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-60"></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <img
              src="/assets/images/logo.svg"
              alt={COMPANY_INFO.name}
              className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
            <Link
              to="/aboutus"
              className="text-gold-deep hover:text-gold font-medium transition-colors duration-200 uppercase tracking-normal text-sm lg:text-base"
            >
              About Us
            </Link>

            <Link
              to="/gallery"
              className="text-gold-deep hover:text-gold font-medium transition-colors duration-200 uppercase tracking-normal text-sm lg:text-base"
            >
              Gallery
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                to="/services"
                className="flex items-center text-gold-deep hover:text-gold font-medium transition-colors duration-200 uppercase tracking-normal text-sm lg:text-base"
                onClick={(e) => {
                  setServicesOpen(false);
                }}
              >
                Services <ChevronDown size={16} className="ml-1" />
              </Link>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-white border border-gold-light/20 rounded-lg shadow-2xl transform transition-all duration-300 origin-top-left overflow-hidden ${servicesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                  }`}
              >
                <div className="py-2">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      to={`/${service.slug}`}
                      onClick={() => {
                        setServicesOpen(false);
                      }}
                      className="block w-full text-left px-6 py-3 text-xs md:text-sm text-gold-dark hover:bg-peach/20 hover:text-gold-deep transition-colors border-l-4 border-transparent hover:border-gold"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="px-6 md:px-7 lg:px-8 py-2 md:py-2.5 bg-gold hover:bg-gold-light text-white font-bold rounded-full shadow-lg hover:shadow-gold/50 transform hover:-translate-y-0.5 transition-all duration-300 text-sm lg:text-base tracking-normal"
            >
              CONTACT US
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="text-gold-deep hover:text-gold transition-colors"
            >
              {mobileMenuOpen ? <X size={35} /> : <Menu size={35} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Glassmorphism Bubble Effect */}
      <div
        className={`md:hidden absolute top-full left-0 w-full backdrop-blur-2xl border-b border-white/20 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.90)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 2px 8px rgba(0, 0, 0, 0.05),
            inset 0 1px 2px rgba(255, 255, 255, 0.3),
            inset 0 -2px 4px rgba(0, 0, 0, 0.05)
          `
        }}
      >
        {/* Glossy shine overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
          }}
        />
        <div className="relative px-6 space-y-6 flex flex-col items-center">
          <Link
            to="/"
            className="text-gold-deep text-lg font-medium hover:text-gold uppercase tracking-wider transition-colors"
            onClick={() => { setMobileMenuOpen(false); }}
          >
            Home
          </Link>

          <Link
            to="/aboutus"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gold-deep text-lg font-medium hover:text-gold uppercase tracking-wider transition-colors"
          >
            About Us
          </Link>

          <Link
            to="/gallery"
            className="text-gold-deep text-lg font-medium hover:text-gold uppercase tracking-wider transition-colors"
            onClick={() => { setMobileMenuOpen(false); }}
          >
            Gallery
          </Link>

          {/* Services Collapsible Dropdown */}
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center gap-2 text-gold-deep text-lg font-medium hover:text-gold uppercase tracking-wider transition-colors"
            >
              Services
              {mobileServicesOpen
                ? <ChevronUp size={20} className="transition-transform duration-200" />
                : <ChevronDown size={20} className="transition-transform duration-200" />
              }
            </button>

            {/* Submenu Items */}
            <div
              className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
                }`}
            >
              {SERVICES.map((service) => (
                <Link
                  key={service.id}
                  to={`/${service.slug}`}
                  className="block w-full py-3 text-center text-gold-deep/80 hover:text-gold font-medium transition-colors"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full max-w-xs px-6 py-3 bg-gold hover:bg-gold-light text-white font-bold rounded-full shadow-lg hover:shadow-gold/40 transition-all text-center"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;