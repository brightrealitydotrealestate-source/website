import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_INFO, SERVICES, SOCIAL_LINKS } from '../constants';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const location = useLocation();
  return (
    <footer id="footer" className="bg-white text-gold-deep pb-8 relative">
      {/* Glossy Gradient Separator Line (Matched to Navbar Style) */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-60"></div>

      <div className="pt-10 md:pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Address Column */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-gold mb-4 md:mb-5">
              {COMPANY_INFO.name}
            </h3>
            <div className="flex items-start space-x-3 text-gold-deep/90">
              <MapPin className="mt-1 flex-shrink-0 text-gold" size={20} />
              <p className="font-sans leading-relaxed font-medium text-sm md:text-base">
                {COMPANY_INFO.address}
              </p>
            </div>
            <div className="flex items-center space-x-3 text-gold-deep/90">
              <Phone className="flex-shrink-0 text-gold" size={20} />
              <a href={`tel:${COMPANY_INFO.phone}`} className="font-sans font-medium text-sm md:text-base hover:text-gold transition-colors">
                {COMPANY_INFO.phone}
              </a>
            </div>
            <div className="flex items-center space-x-3 text-gold-deep/90">
              <Mail className="flex-shrink-0 text-gold" size={20} />
              <a href={`mailto:${COMPANY_INFO.email}`} className="font-sans font-medium text-sm md:text-base break-all hover:text-gold transition-colors">
                {COMPANY_INFO.email}
              </a>
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
                    to={`/${service.slug}`}
                    className="text-gold-deep/90 hover:text-gold hover:pl-2 transition-all duration-300 font-medium block"
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
            <div className="flex space-x-4 flex-wrap gap-y-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full transition-all duration-300 shadow-md group bg-peach/30 text-gold-dark hover:bg-gold hover:text-white"
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
        <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center text-sm text-gold-dark font-medium gap-4 md:gap-0">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p>
              © {COMPANY_INFO.copyrightYear} {COMPANY_INFO.name}. All Rights Reserved.
            </p>
            <p className="hidden md:block">|</p>
            <a href="https://xendral.in" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              Designed & Developed By Xendral
            </a>
          </div>
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