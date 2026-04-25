import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AboutUsSection from '../components/AboutUsSection';
import DetailedReviews from '../components/DetailedReviews';
import SEO from '../components/SEO';

const AboutUs: React.FC = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    // Small delay ensures CSS transitions always fire from the initial state
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') as 'company' | 'founder' | null;

  return (
    <div className={`w-full bg-cream pt-[80px] md:pt-[105px] transition-opacity duration-500 ${
      mounted ? 'opacity-100' : 'opacity-0'
    }`}>
      <SEO
        title="About Us – Bright Reality | Chennai's Trusted Real Estate Experts"
        description="Learn about Bright Reality – Chennai's premier real estate consultancy led by founder Mr. Nazeer Ahamed S. 100,000+ plot registrations. Serving buyers across Vadapalani, Avadi, Tambaram & all Chennai suburbs. DTCP & CMDA approved properties only."
        keywords="about bright reality, mr nazeer ahamed, kushi busy founder, real estate experts chennai, trusted property consultants, who is bright reality, bright reality company history, 100000 registrations chennai, RERA registered real estate chennai, buy plot from bright reality"
        canonical="https://www.kushibusy.in/aboutus"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "name": "Nazeer Ahamed S.",
              "jobTitle": "Founder & Director",
              "worksFor": { "@type": "Organization", "name": "Bright Reality" },
              "description": "Founder of Bright Reality and the Kushi Busy YouTube channel. Expert in Chennai real estate, plot registrations, and property documentation."
            },
            {
              "@type": "Organization",
              "name": "Bright Reality",
              "url": "https://www.kushibusy.in",
              "foundingDate": "2010",
              "numberOfEmployees": "10",
              "slogan": "An Opportunity to Enrich Yourself"
            }
          ]
        })}
      />

      {/* 
        Pass the initialTab if available. The underlying component needs a minor tweak to 
        accept defaultTab, but the standard behavior is fine even without it.
      */}
      <AboutUsSection isHomePage={false} defaultTab={initialTab || 'company'} />

      {/* Verified Detailed Customer Reviews Section */}
      <DetailedReviews />
      
    </div>
  );
};

export default AboutUs;
