import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_INFO, SERVICES, SOCIAL_LINKS } from '../constants';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const location = useLocation();
  return (
    <footer className="bg-white text-gold-deep pb-8 relative">
      {/* Glossy Gradient Separator Line (Matched to Navbar Style) */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-60"></div>

      <div className="pt-10 md:pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Address Column */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-gold mb-4 md:mb-5">
              {COMPANY_INFO.name}
            </h3>
            <div className="flex items-start space-x-3 text-gold-dark">
              <MapPin className="mt-1 flex-shrink-0 text-gold" size={20} />
              <p className="font-sans leading-relaxed font-medium text-sm md:text-base">
                {COMPANY_INFO.address}
              </p>
            </div>
            <div className="flex items-center space-x-3 text-gold-dark">
              <Phone className="flex-shrink-0 text-gold" size={20} />
              <p className="font-sans font-medium text-sm md:text-base">
                {COMPANY_INFO.phone}
              </p>
            </div>
            <div className="flex items-center space-x-3 text-gold-dark">
              <Mail className="flex-shrink-0 text-gold" size={20} />
              <p className="font-sans font-medium text-sm md:text-base break-all">
                {COMPANY_INFO.email}
              </p>
            </div>
            <p className="text-sm text-gold-dust mt-4 italic font-medium">
              "{COMPANY_INFO.tagline}"
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-base md:text-lg font-bold text-gold uppercase tracking-normal mb-4 md:mb-5">
              Our Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    onClick={(e) => {
                      if (location.pathname === '/') {
                        e.preventDefault();
                        const targetId = `service-${service.id}`;

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
                    to={`/#service-${service.id}`}
                    className="text-gold-deep/80 hover:text-gold hover:pl-2 transition-all duration-300 font-medium block"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h4 className="text-base md:text-lg font-bold text-gold uppercase tracking-normal mb-4 md:mb-5">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all duration-300 shadow-md group ${social.platform === 'WhatsApp'
                      ? 'bg-[#25D366] text-white hover:bg-[#128C7E]'
                      : 'bg-peach/30 text-gold-dark hover:bg-gold hover:text-white'
                      }`}
                    aria-label={social.platform}
                  >
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center text-sm text-gold-dark font-medium">
          <p className="mb-4 md:mb-0">
            © {COMPANY_INFO.copyrightYear} {COMPANY_INFO.name}. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;