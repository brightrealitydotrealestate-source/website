import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact-section');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const contactSection = document.getElementById('contact-section');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.getElementById('about-section');
        aboutSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const aboutSection = document.getElementById('about-section');
      aboutSection?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setServicesOpen(false);
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const servicesSection = document.getElementById('services-section');
        servicesSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const servicesSection = document.getElementById('services-section');
      servicesSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <Link to="/" className="flex flex-col items-start group">
            <h1 className="text-2xl md:text-2xl lg:text-3xl font-serif font-bold text-gold-deep tracking-wide group-hover:text-gold transition-colors">
              {COMPANY_INFO.name.toUpperCase()}
            </h1>
            <span className="text-[10px] md:text-[11px] text-gold-dark tracking-widest font-sans">
              REAL ESTATE
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
            <button
              onClick={handleAboutClick}
              className="text-gold-deep hover:text-gold font-medium transition-colors duration-200 uppercase tracking-normal text-sm lg:text-base"
            >
              About Us
            </button>

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
              <button
                onClick={handleServicesClick}
                className="flex items-center text-gold-deep hover:text-gold font-medium transition-colors duration-200 uppercase tracking-normal text-sm lg:text-base"
              >
                Services <ChevronDown size={16} className="ml-1" />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-white border border-gold-light/20 rounded-lg shadow-2xl transform transition-all duration-300 origin-top-left overflow-hidden ${servicesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                  }`}
              >
                <div className="py-2">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      onClick={(e) => {
                        e.preventDefault();
                        setServicesOpen(false);
                        setMobileMenuOpen(false);
                        const targetId = `service-${service.id}`;

                        if (location.pathname !== '/') {
                          navigate(`/#${targetId}`);
                        } else {
                          // Manually handle scroll and highlight if already on page
                          const element = document.getElementById(targetId);
                          if (element) {
                            const headerOffset = 100;
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth"
                            });

                            // Force restart animation
                            element.classList.remove('service-highlight');
                            void element.offsetWidth; // Trigger reflow
                            element.classList.add('service-highlight');

                            setTimeout(() => {
                              element.classList.remove('service-highlight');
                            }, 3000);
                          }
                        }
                      }}
                      className="block w-full text-left px-6 py-3 text-xs md:text-sm text-gold-dark hover:bg-peach/20 hover:text-gold-deep transition-colors border-l-4 border-transparent hover:border-gold"
                    >
                      {service.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleContactClick}
              className="px-6 md:px-7 lg:px-8 py-2 md:py-2.5 bg-gold hover:bg-gold-light text-white font-bold rounded-full shadow-lg hover:shadow-gold/50 transform hover:-translate-y-0.5 transition-all duration-300 text-sm lg:text-base tracking-normal"
            >
              CONTACT US
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gold-deep hover:text-gold transition-colors"
            >
              {mobileMenuOpen ? <X size={35} /> : <Menu size={35} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-cream border-b border-gold/10 shadow-2xl transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
      >
        <div className="px-6 space-y-6 flex flex-col items-center">
          <button
            onClick={handleAboutClick}
            className="text-gold-deep text-lg font-medium hover:text-gold uppercase tracking-wider"
          >
            About Us
          </button>

          <Link
            to="/gallery"
            className="text-gold-deep text-lg font-medium hover:text-gold uppercase tracking-wider"
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
          </Link>
          <div className="w-full text-center">
            <p className="text-gold-dark text-xs mb-4 font-bold uppercase tracking-widest border-b border-gold-light/20 pb-2 mx-12">Services</p>
            {SERVICES.map((service) => (
              <button
                key={service.id}
                className="block w-full py-3 text-center text-gold-deep/80 hover:text-gold font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const targetId = `service-${service.id}`;

                  if (location.pathname !== '/') {
                    navigate(`/#${targetId}`);
                  } else {
                    const element = document.getElementById(targetId);
                    if (element) {
                      const headerOffset = 100;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                      });

                      element.classList.remove('service-highlight');
                      void element.offsetWidth;
                      element.classList.add('service-highlight');

                      setTimeout(() => element.classList.remove('service-highlight'), 3000);
                    }
                  }
                }}
              >
                {service.title}
              </button>
            ))}
          </div>
          <button
            onClick={handleContactClick}
            className="w-full max-w-xs px-6 py-3 bg-gold text-white font-bold rounded-full shadow-md"
          >
            CONTACT US
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;