import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from '../components/Carousel';
import AvailablePlotsScroller from '../components/AvailablePlotsScroller';
import { Send, Map as MapIcon } from 'lucide-react';
import { COMPANY_INFO, ABOUT_US_IMAGE } from '../constants';

const Home: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    whatsapp: '',
    mobile: '',
    email: '',
    message: ''
  });

  const location = useLocation();

  // Scroll to section and highlight if hash exists
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);

      if (element) {
        // Delay slighty to ensure layout is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });

          if (id.startsWith('service-')) {
            element.classList.add('service-highlight');
            setTimeout(() => {
              element.classList.remove('service-highlight');
            }, 3000);
          }
        }, 300);
      }
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form Submitted:', formState);
    alert('Thank you for enriching yourself with Bright Reality. We will contact you shortly.');
    setFormState({ name: '', whatsapp: '', mobile: '', email: '', message: '' });
  };

  // Google Maps location query
  const mapLocationQuery = COMPANY_INFO.mapAddress;

  return (
    <div className="w-full bg-cream pt-[76px] md:pt-[122px]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-4">
        <Carousel />
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

              <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-2xl relative z-10">
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

      {/* Services Section */}
      <section id="services-section" className="py-10 md:py-14 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep mb-3 md:mb-4">Our Services</h2>
            <p className="text-sm md:text-base text-gold-dark max-w-2xl mx-auto font-medium">Comprehensive real estate solutions tailored for your success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Property Sales */}
            <div id="service-1" className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gold/10 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-peach/20 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300 text-gold-deep">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-gold-deep mb-3">Property Sales</h3>
              <p className="text-sm md:text-base text-gold-deep/70 mb-4">Buying and selling of premium properties including:</p>
              <ul className="text-sm text-gold-dark space-y-2 list-disc list-inside">
                <li>Empty Land & Plots</li>
                <li>Luxury Villas</li>
                <li>Apartments & Flats</li>
                <li>Individual Houses</li>
                <li>Resale Properties</li>
              </ul>
            </div>

            {/* Service 2: Documentation */}
            <div id="service-2" className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gold/10 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-peach/20 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300 text-gold-deep">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-gold-deep mb-3">Documentation</h3>
              <p className="text-sm md:text-base text-gold-deep/70 mb-4">Expert consultation and clarification for legal documents:</p>
              <ul className="text-sm text-gold-dark space-y-2 list-disc list-inside">
                <li>Patta (Land Revenue Records)</li>
                <li>EC (Encumbrance Certificates)</li>
                <li>Title Deed Verification</li>
                <li>Legal Clearance</li>
              </ul>
            </div>

            {/* Service 3: Registration */}
            <div id="service-3" className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gold/10 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-peach/20 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300 text-gold-deep">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-gold-deep mb-3">Registration</h3>
              <p className="text-sm md:text-base text-gold-deep/70 mb-4">Seamless property registration process handling.</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-gold">100,000+</span>
                <span className="text-xs text-gold-dark uppercase font-semibold">Registrations<br />Completed</span>
              </div>
              <p className="text-sm text-gold-dark italic">
                "Our reputation as an auspicious ('Kairasi') company speaks for itself."
              </p>
            </div>
          </div>
        </div>
      </section>

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
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapLocationQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative group"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178510024328!2d55.27218771500384!3d25.19720188389619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1646205260840!5m2!1sen!2sae"
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
                      WhatsApp <span className="text-xs text-gold-dust lowercase font-normal">(w/ Code)</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formState.whatsapp}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                      placeholder="+91 9000010000"
                      required
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
    </div>
  );
};

export default Home;