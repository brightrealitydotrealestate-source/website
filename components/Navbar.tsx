import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../constants';

const HOME_PATHS = new Set(['/', '/aboutus', '/services', '/contact', '/property-sales', '/documentation', '/registration']);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isOnHomePage = HOME_PATHS.has(location.pathname);

  // Scroll to a section by ID, with offset for the fixed navbar
  const scrollToSection = useCallback((sectionId: string, delay = 0) => {
    const doScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    };
    if (delay > 0) {
      setTimeout(doScroll, delay);
    } else {
      doScroll();
    }
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 animate-navbar-slide-down ${isScrolled
        ? 'bg-cream/95 backdrop-blur-lg shadow-xl py-2'
        : 'bg-white/90 backdrop-blur-sm py-3 md:py-4'
        }`}
    >
      {/* Glossy Gradient Border Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-60"></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center group"
            onClick={(e) => {
              if (isOnHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
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
              onClick={(e) => {
                if (isOnHomePage) {
                  e.preventDefault();
                  navigate('/aboutus');
                  scrollToSection('about-section', 50);
                }
              }}
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
              <div className="flex items-center gap-1">
                <Link
                  to="/services"
                  className="text-gold-deep hover:text-gold font-medium transition-colors duration-200 uppercase tracking-normal text-sm lg:text-base cursor-pointer"
                  onClick={(e) => {
                    setServicesOpen(false);
                    if (isOnHomePage) {
                      e.preventDefault();
                      navigate('/services');
                      scrollToSection('services-section', 50);
                    }
                  }}
                >
                  Services
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setServicesOpen(!servicesOpen);
                  }}
                  className="text-gold-deep hover:text-gold focus:outline-none p-1"
                  aria-label="Toggle Services Menu"
                >
                  <ChevronDown size={16} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-white border border-gold-light/20 rounded-lg shadow-2xl transform transition-all duration-300 origin-top-left overflow-hidden z-50 ${servicesOpen ? 'scale-100' : 'scale-95'
                  }`}
                style={{
                  visibility: servicesOpen ? 'visible' : 'hidden',
                  opacity: servicesOpen ? 1 : 0
                }}
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
            </div >

            <Link
              to="/contact"
              onClick={(e) => {
                if (isOnHomePage) {
                  e.preventDefault();
                  navigate('/contact');
                  scrollToSection('contact-section', 50);
                }
              }}
              className="px-6 md:px-7 lg:px-8 py-2 md:py-2.5 bg-gold hover:bg-gold-light text-white font-bold rounded-full shadow-lg hover:shadow-gold/50 transform hover:-translate-y-0.5 transition-all duration-300 text-sm lg:text-base tracking-normal"
            >
              CONTACT US
            </Link>
          </div >

          {/* Mobile Menu Button */}
          < div className="md:hidden flex items-center" >
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="text-gold-deep hover:text-gold transition-colors"
            >
              {mobileMenuOpen ? <X size={35} /> : <Menu size={35} />}
            </button>
          </div >
        </div >
      </div >

      {/* Mobile Menu Overlay - Glassmorphism Bubble Effect */}
      < div
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
        < div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
          }}
        />
        < div className="relative px-6 space-y-6 flex flex-col items-center" >
          <Link
            to="/"
            className="text-gold-deep text-lg font-medium hover:text-gold uppercase tracking-wider transition-colors"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (isOnHomePage) {
                e.preventDefault();
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            Home
          </Link>

          <Link
            to="/aboutus"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (isOnHomePage) {
                e.preventDefault();
                navigate('/aboutus');
                scrollToSection('about-section', 50);
              }
            }}
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
            {/* Split Button for Mobile: Text navigates, Arrow toggles */}
            <div className="flex items-center gap-3">
              <Link
                to="/services"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (isOnHomePage) {
                    e.preventDefault();
                    navigate('/services');
                    scrollToSection('services-section', 50);
                  }
                }}
                className="text-gold-deep text-lg font-medium hover:text-gold uppercase tracking-wider transition-colors"
              >
                Services
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileServicesOpen(!mobileServicesOpen);
                }}
                className="p-2 text-gold-deep hover:text-gold transition-colors"
                aria-label="Toggle Services Submenu"
              >
                {mobileServicesOpen
                  ? <ChevronUp size={20} className="transition-transform duration-200" />
                  : <ChevronDown size={20} className="transition-transform duration-200" />
                }
              </button>
            </div>

            {/* Submenu Items */}
            <div
              className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? 'opacity-100 mt-3' : 'opacity-0 mt-0'
                }`}
              style={{
                maxHeight: mobileServicesOpen ? '300px' : '0px'
              }}
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
          </div >

          <Link
            to="/contact"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (isOnHomePage) {
                e.preventDefault();
                navigate('/contact');
                scrollToSection('contact-section', 50);
              }
            }}
            className="w-full max-w-xs px-6 py-3 bg-gold hover:bg-gold-light text-white font-bold rounded-full shadow-lg hover:shadow-gold/40 transition-all text-center"
          >
            CONTACT US
          </Link>
        </div >
      </div >
    </nav >
  );
};

export default Navbar;