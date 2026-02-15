import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import AvailablePlotsScroller from '../components/AvailablePlotsScroller';
import CustomerReviewsScroller from '../components/CustomerReviewsScroller';
import ServiceHighlights from '../components/ServiceHighlights';
import HeroHighlight from '../components/HeroHighlight';
import FAQSection from '../components/FAQSection';
import { Send, Map as MapIcon, MapPin } from 'lucide-react';
import { COMPANY_INFO, ABOUT_US_IMAGE, SERVICES } from '../constants';
import ConfirmationPopup from '../components/ConfirmationPopup';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    whatsapp: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'loading'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Phone formatting logic
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters except +
    let cleaned = value.replace(/[^\d+]/g, '');

    // Ensure + is only at the start
    if (cleaned.includes('+')) {
      cleaned = '+' + cleaned.replace(/\+/g, '');
    }

    // Auto-formatting based on country code
    if (cleaned.startsWith('+91')) {
      // Format: +91 XXXXX XXXXX
      const match = cleaned.match(/^(\+91)(\d{0,5})(\d{0,5})$/);
      if (match) {
        return [match[1], match[2], match[3]].filter(Boolean).join(' ');
      }
    } else if (cleaned.startsWith('+1')) {
      // Format: +1 XXX XXX XXXX
      const match = cleaned.match(/^(\+1)(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ');
      }
    }

    return cleaned;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Restrict mobile and whatsapp to numbers and +, and apply formatting
    if (name === 'mobile' || name === 'whatsapp') {
      // Allow + only at the beginning, otherwise nums only
      if (!/^[+]?[0-9\s]*$/.test(value)) {
        return;
      }

      const formattedValue = formatPhoneNumber(value);
      setFormState(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }

    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading state immediately
    setToastMessage("Sending...");
    setToastType('loading');
    setShowConfirmation(true);

    // URL is now loaded from environment variables for security
    // See .env.local for the actual URL configuration
    const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

    try {
      // Strict Email Validation Regex ("Fact Check")
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        throw new Error("Please enter a valid email address.");
      }

      // Basic validation (WhatsApp is optional now)
      if (!formState.name || !formState.mobile || !formState.message) {
        throw new Error("Please fill in all required fields.");
      }

      // If the URL is still the placeholder, we'll simulate a success for testing UI
      if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
        console.warn("Google Apps Script URL not set. Simulating success.");
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

        setToastMessage("Thanks For Showing Interest, Will Call You Shortly");
        setToastType('success');
        // Keep confirmation shown
        setFormState({ name: '', whatsapp: '', mobile: '', email: '', message: '' });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Important for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          // Prepend ' to phone numbers to force Google Sheets to treat them as text
          // This prevents the #ERROR! caused by values starting with +
          mobile: formState.mobile ? `'${formState.mobile}` : '',
          whatsapp: formState.whatsapp ? `'${formState.whatsapp}` : '',
        }),
      });

      // With no-cors, we can't check response.ok or response.json()
      // We assume success if no network error occurred
      // Update to success state ONLY after fetch completes
      setToastMessage("Thanks For Showing Interest, Will Call You Shortly");
      setToastType('success');
      // Keep confirmation shown
      setFormState({ name: '', whatsapp: '', mobile: '', email: '', message: '' });

    } catch (error: any) {
      console.error("Error submitting form:", error);
      setToastMessage(error.message || "Something Went Wrong Try again later");
      setToastType('error');
      // Keep confirmation shown
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Maps location query
  const mapLocationQuery = COMPANY_INFO.mapAddress;

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
      <section id="about-section" className="py-10 md:py-14 bg-white relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-peach/10 -skew-x-12 transform translate-x-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Image (4:5 Ratio) */}
            <div className="w-full md:w-5/12 relative group">

              <div className="aspect-square overflow-hidden rounded-full shadow-2xl relative z-10 border-4 border-gold/20">
                <img
                  src={ABOUT_US_IMAGE}
                  alt="About Bright Reality"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-7/12">
              <h4 className="text-gold font-bold tracking-widest uppercase mb-2 text-xs md:text-sm">Hello, dear friends</h4>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep mb-4 md:mb-5 leading-tight">
                Bright Realty is located in Vadapalani <span className="text-gold-dark">  An Exceptional Real Estate Company</span>
              </h2>
              <p className="text-base md:text-lg text-gold-deep/80 leading-relaxed mb-4 md:mb-5 font-sans">
                At Bright Reality, we provide services for you anywhere around Chennai. Whether you are looking for a land plot, a villa, a flat, an individual house, or even a resale house—whatever you need, you can get in touch with Us.
              </p>
              <p className="text-base md:text-lg text-gold-deep/80 leading-relaxed mb-5 md:mb-6 font-sans">
                So, if you have any doubts regarding buying a house or a plot, or specific doubts regarding the Patta (land deed) or EC (Encumbrance Certificate), if you contact Us, We will resolve your doubts.
              </p>
              <p className="text-base md:text-lg text-gold-deep/80 leading-relaxed mb-5 md:mb-6 font-sans">
                Bright Reality, is a company with good experience. It is being run by experienced professionals. We have successfully completed over one lakh (100,000) registrations. So, Our company has earned a reputation for being an auspicious ('Kairasi') company.
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-1 w-12 md:w-16 bg-gold"></div>
                <span className="font-serif italic text-gold-dark text-lg md:text-xl">The Future is Bright.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section id="contact-section" className="py-10 md:py-14 bg-peach/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep mb-2 md:mb-3">Get In Touch</h2>
            <p className="text-sm md:text-base text-gold-dark max-w-2xl mx-auto font-medium">Begin your journey to enrichment today. Visit our office or drop us a message.</p>
          </div>

          <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl border border-gold/10">

            {/* Map Side (Left) */}
            <div className="w-full md:w-1/2 h-[500px] md:h-auto relative order-2 md:order-1">
              <a
                href={COMPANY_INFO.googleMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative group"
              >
                <iframe
                  src={COMPANY_INFO.mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.2) sepia(0.1)' }}
                  allowFullScreen={true}
                  loading="lazy"
                  className="w-full h-full"
                ></iframe>

                {/* Map Overlay Text */}
                <div className="absolute inset-0 bg-gold-deep/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-gold text-white px-6 py-3 rounded-full font-bold flex items-center shadow-xl transform group-hover:scale-110 transition-transform">
                    <MapIcon className="mr-2" size={20} /> Open Navigation
                  </div>
                </div>
              </a>
            </div>

            {/* Form Side (Right) */}
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-white order-1 md:order-2">
              <div className="mb-8">
                <h3 className="text-2xl font-serif text-gold mb-4">Send Us a Message</h3>
                {/* Glossy Gradient Separator */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-60"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div className="group">
                  <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* WhatsApp */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                      WhatsApp <span className="text-xs text-gold-dust lowercase font-normal">(w/ Code) - Optional</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formState.whatsapp}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                      placeholder="+91 9000010000"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formState.mobile}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                      placeholder="+91 9000010000"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Message */}
                <div className="group">
                  <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                    Message <span className="text-xs text-gold-dust lowercase font-normal">(Max 500 words)</span>
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={500}
                    className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none"
                    placeholder="How can we enrich you?"
                    required
                  ></textarea>
                  <p className="text-xs text-right text-gold-dark/60 mt-1">{formState.message.length}/500</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-gold/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center uppercase tracking-widest"
                >
                  <Send className="mr-2" size={20} /> Send Message
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      <ConfirmationPopup
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        message={toastMessage}
        type={toastType}
      />

    </div >
  );
};

export default Home;