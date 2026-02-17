import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import AvailablePlotsScroller from '../components/AvailablePlotsScroller';
import CustomerReviewsScroller from '../components/CustomerReviewsScroller';
import ServiceHighlights from '../components/ServiceHighlights';
import HeroHighlight from '../components/HeroHighlight';
import FAQSection from '../components/FAQSection';
import { Send, Map as MapIcon, MapPin } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../constants';
import AboutUsSection from '../components/AboutUsSection';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const location = useLocation();
  const { serviceSlug } = useParams<{ serviceSlug: string }>();

  // Schema Markup for LocalBusiness
  const localBusinessSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": COMPANY_INFO.name,
    "image": "https://www.kushibusy.in/assets/images/logo.svg",
    "@id": "https://www.kushibusy.in",
    "url": "https://www.kushibusy.in",
    "telephone": COMPANY_INFO.phone,
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No.62/2, 2nd Floor, South Sivan Koil Street, Vadapalani",
      "addressLocality": "Chennai",
      "postalCode": "600026",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0471321,
      "longitude": 80.2125164
    },
    "areaServed": [
      "Chennai",
      "Kancheepuram",
      "Chengalpattu",
      "Sriperumbudhur",
      "Tiruvallur",
      "Poonamllee",
      "Tambaram",
      "Pallavaram"
    ],
    "sameAs": [
      "https://www.instagram.com/kushibusy/",
      "https://www.youtube.com/@KUSHIBUSY",
      "https://facebook.com"
    ]
  });

  // Scroll Handler: Automatically scrolls to the section matching the URL path
  useEffect(() => {
    const path = location.pathname;

    // Define mapping from path to section ID
    const pathToSection: { [key: string]: string } = {
      '/aboutus': 'about-section',
      '/contact': 'contact-section',
      '/services': 'services-section',
      '/property-sales': 'service-1', // Mapping specific service slugs to their card IDs
      '/documentation': 'service-2',
      '/registration': 'service-3'
    };

    const sectionId = pathToSection[path];

    // If we're on a service page based on dynamic slug
    if (!sectionId && serviceSlug) {
      // Find the service by slug to get its ID if we had dynamic IDs, 
      // but for now we map known slugs manually above or default to top of services
      if (['property-sales', 'documentation', 'registration'].includes(serviceSlug)) {
        // Logic handled by the map above if exact match, or fallback here
      }
    }

    if (sectionId) {
      // Small timeout to ensure DOM is ready (especially when coming from another page)
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Calculate position with offset for fixed navbar (approx 100px)
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          // Trigger Highlight Animation ONLY for service tiles
          if (['service-1', 'service-2', 'service-3'].includes(sectionId)) {
            // 1. Remove from all first to reset
            ['service-1', 'service-2', 'service-3'].forEach(id => {
              document.getElementById(id)?.classList.remove('service-highlight');
            });

            // 2. Add to current target after a small delay to ensure scroll starts
            setTimeout(() => {
              element.classList.add('service-highlight');

              // 3. Remove after animation (3s)
              setTimeout(() => {
                element.classList.remove('service-highlight');
              }, 3000);
            }, 500);
          }
        }
      }, 100);
    } else if (path === '/' && !location.hash) {
      // Scroll to top if just visiting home
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, serviceSlug]);



  return (
    <div className="w-full bg-cream pt-[80px] md:pt-[105px]">
      <SEO
        title="Bright Reality | Available Plots in Avadi, Chennai"
        description="Looking for plots in Avadi or Chennai? Bright Reality offers premium land plots, villas, and registration services. Contact us today!"
        canonical={`https://www.kushibusy.in${location.pathname === '/' ? '' : location.pathname}`}
        schema={localBusinessSchema}
      />
      {/* Hero Highlight Section */}
      <HeroHighlight />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-0">
        <Carousel />
      </div>

      {/* Available Top Plots Badge - Floating Glossy Circle */}
      <div className="flex justify-center pt-4 pb-2 md:pt-5 md:pb-2.5 bg-cream">
        <div
          className="animate-float inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-gold-deep font-semibold text-sm md:text-base tracking-wide border border-gold/20 backdrop-blur-md cursor-default select-none"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: `
              0 4px 20px rgba(217, 177, 4, 0.15),
              0 2px 8px rgba(0, 0, 0, 0.06)
            `
          }}
        >
          <MapPin size={18} className="text-gold" />
          Available Top Plots
          <MapPin size={18} className="text-gold" />
        </div>
      </div>

      {/* Available Plots Scroller */}
      <AvailablePlotsScroller />

      {/* About Us Section */}
      <AboutUsSection />

      {/* Service Highlights Section */}
      <ServiceHighlights />

      {/* Services Section */}
      <section id="services-section" className="py-10 md:py-14 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep mb-3 md:mb-4">Our Services</h2>
            <p className="text-sm md:text-base text-gold-dark max-w-2xl mx-auto font-medium">Comprehensive real estate solutions tailored for your success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Property Sales */}
            <div id="service-1" className="bg-gradient-to-br from-white to-cream p-6 md:p-8 rounded-xl shadow-xl border border-gold/30 hover:shadow-2xl hover:shadow-gold/20 hover:border-gold hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
              {/* Decorative Background Icon */}
              <div className="absolute -bottom-10 -right-10 text-gold/5 group-hover:text-gold/10 transition-colors duration-500 transform rotate-12 scale-150 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>

              <div className="icon-circle w-12 h-12 md:w-14 md:h-14 bg-peach/20 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-300 text-gold-deep group-hover:scale-110 group-hover:rotate-3 shadow-md relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-gold-deep mb-3 group-hover:text-gold transition-colors duration-300">Property Sales</h3>
              <p className="text-sm md:text-base text-gold-deep/70 mb-4 group-hover:text-gold-deep transition-colors duration-300">Buying and selling of premium properties including:</p>
              <ul className="text-sm text-gold-dark space-y-2">
                <li className="hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  <span>Empty Land & Plots</span>
                </li>
                <li className="hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  <span>Luxury Villas</span>
                </li>
                <li className="hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  <span>Apartments & Flats</span>
                </li>
                <li className="hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  <span>Individual Houses</span>
                </li>
                <li className="hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  <span>Resale Properties</span>
                </li>
              </ul>
            </div>

            {/* Service 2: Documentation */}
            <div id="service-2" className="bg-gradient-to-br from-white to-cream p-6 md:p-8 rounded-xl shadow-xl border border-gold/30 hover:shadow-2xl hover:shadow-gold/20 hover:border-gold hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
              {/* Decorative Background Icon */}
              <div className="absolute -bottom-10 -right-10 text-gold/5 group-hover:text-gold/10 transition-colors duration-500 transform rotate-12 scale-150 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>

              <div className="icon-circle w-12 h-12 md:w-14 md:h-14 bg-peach/20 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-300 text-gold-deep group-hover:scale-110 group-hover:rotate-3 shadow-md relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-gold-deep mb-3 group-hover:text-gold transition-colors duration-300">Documentation</h3>
              <p className="text-sm md:text-base text-gold-deep/70 mb-4 group-hover:text-gold-deep transition-colors duration-300">Expert consultation and clarification for legal documents:</p>
              <ul className="text-sm text-gold-dark space-y-2">
                <li className="hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  <span>Patta (Land Revenue Records)</span>
                </li>
                <li className="hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  <span>EC (Encumbrance Certificates)</span>
                </li>
                <li className="hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  <span>Title Deed Verification</span>
                </li>
                <li className="hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  <span>Legal Clearance</span>
                </li>
              </ul>
            </div>

            {/* Service 3: Registration */}
            <div id="service-3" className="bg-gradient-to-br from-white to-cream p-6 md:p-8 rounded-xl shadow-xl border border-gold/30 hover:shadow-2xl hover:shadow-gold/20 hover:border-gold hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
              {/* Decorative Background Icon */}
              <div className="absolute -bottom-10 -right-10 text-gold/5 group-hover:text-gold/10 transition-colors duration-500 transform rotate-12 scale-150 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              </div>

              <div className="icon-circle w-12 h-12 md:w-14 md:h-14 bg-peach/20 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-300 text-gold-deep group-hover:scale-110 group-hover:rotate-3 shadow-md relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-gold-deep mb-3 group-hover:text-gold transition-colors duration-300">Registration</h3>
              <p className="text-sm md:text-base text-gold-deep/70 mb-4 group-hover:text-gold-deep transition-colors duration-300">Seamless property registration process handling.</p>
              <div className="flex items-center space-x-2 mb-4 group-hover:scale-105 transition-transform duration-300">
                <span className="text-2xl font-bold text-gold">100,000+</span>
                <span className="text-xs text-gold-dark uppercase font-semibold">Registrations<br />Completed</span>
              </div>
              <p className="text-sm text-gold-dark italic group-hover:text-gold transition-colors duration-300">
                "Our reputation as an auspicious ('Kairasi') company speaks for itself."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reviews Badge - Floating Glossy Circle */}
      <div className="flex justify-center pt-4 pb-2 md:pt-5 md:pb-2.5 bg-cream">
        <div
          className="animate-float inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-gold-deep font-semibold text-sm md:text-base tracking-wide border border-gold/20 backdrop-blur-md cursor-default select-none"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: `
              0 4px 20px rgba(217, 177, 4, 0.15),
              0 2px 8px rgba(0, 0, 0, 0.06)
            `
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#D9B104" stroke="#D9B104" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Verified Reviews
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#D9B104" stroke="#D9B104" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </div>

      {/* Customer Reviews Scroller */}
      <CustomerReviewsScroller />

      {/* Contact Section */}
      <ContactSection />

    </div >
  );
};

export default Home;