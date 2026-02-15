import React from 'react';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-cream text-gold-deep">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Bright Reality. Learn how we collect, use, and protect your information."
        canonical="https://www.kushibusy.in/privacy"
        type="article"
      />
      <div className="max-w-4xl mx-auto px-6 shadow-2xl bg-white/50 backdrop-blur-sm p-10 rounded-2xl border border-gold/20">
        <h1 className="text-4xl font-serif font-bold mb-4 text-gold-dark">Privacy Policy</h1>
        {/* Glossy Gradient Separator */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-60 mb-8"></div>

        <div className="space-y-6 font-sans leading-relaxed text-sm md:text-base">
          <p className="italic text-gray-500">Last Updated: January 1, 2026</p>

          <section>
            <h2 className="text-xl font-bold mb-2 text-gold-dark">1. Information Collection</h2>
            <p>At Bright Reality, we collect information you provide directly to us, such as when you fill out our contact form, subscribe to our newsletter, or communicate with us. This includes your name, phone number, email address, and any other details you choose to provide.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-gold-dark">2. Use of Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, including responding to your inquiries regarding our real estate opportunities and enriching your experience with personalized suggestions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-gold-dark">3. Data Security</h2>
            <p>We implement top-tier security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, but we strive to use commercially acceptable means to protect your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 text-gold-dark">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us via the contact form on our website.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;