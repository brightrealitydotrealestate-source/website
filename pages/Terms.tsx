import React from 'react';
import SEO from '../components/SEO';

const Terms: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-cream text-gold-deep">
      <SEO
        title="Terms of Service"
        description="Terms of Service for Bright Reality. Read our terms regarding property listings, intellectual property, and liability."
        canonical="https://www.kushibusy.in/terms"
        type="article"
      />
      <div className="max-w-4xl mx-auto px-6 shadow-2xl bg-white/50 backdrop-blur-sm p-10 rounded-2xl border border-gold/20">
        <h1 className="text-4xl font-serif font-bold mb-4 text-gold-dark">Terms of Service</h1>
        {/* Glossy Gradient Separator */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-60 mb-8"></div>

        <div className="space-y-6 font-sans leading-relaxed text-sm md:text-base">
          <p className="italic text-gray-500">Effective Date: January 1, 2026</p>

          <section>
            <h2 className="text-xl font-bold mb-2 text-gold-dark">1. Acceptance of Terms</h2>
            <p>By accessing and using the Bright Reality website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-gold-dark">2. Real Estate Information</h2>
            <p>The property listings and information provided on this website are for general information purposes only. While we strive for accuracy, we make no representations or warranties of any kind about the completeness or accuracy of this information.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-gold-dark">3. Intellectual Property</h2>
            <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of Bright Reality or its content suppliers and protected by international copyright laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-gold-dark">4. Limitation of Liability</h2>
            <p>In no event shall Bright Reality be liable for any indirect, incidental, special, consequential or punitive damages arising out of or in connection with your use of the website.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;