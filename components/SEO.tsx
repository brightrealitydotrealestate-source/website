import React from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY_INFO } from '../constants';

interface SEOProps {
<<<<<<< HEAD
    title?: string;
    description?: string;
    canonical?: string;
    type?: string;
    name?: string;
    image?: string;
    schema?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    type = 'website',
    name = COMPANY_INFO.name,
    image = '/assets/images/Golden.png', // Default OG image
    schema
}) => {
    const siteTitle = title ? `${title} | ${COMPANY_INFO.name}` : `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline}`;
    const metaDescription = description || "Bright Reality provides premium real estate services in Chennai, including plots, villas, flats, and registration documentation.";
    const currentUrl = canonical || window.location.href;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content={name} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {schema}
                </script>
            )}
        </Helmet>
    );
=======
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  name?: string;
  image?: string;
  schema?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  type = 'website',
  name = COMPANY_INFO.name,
  image = '/assets/images/Golden.png',
  schema
}) => {
  const siteTitle = title
    ? `${title} | ${COMPANY_INFO.name} Chennai`
    : `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline} Chennai`;

  const metaDescription =
    description ||
    "Bright Reality is a trusted real estate company in Chennai offering plots, villas, flats, and property registration services across Chennai.";

  const currentUrl =
    canonical || (typeof window !== 'undefined' ? window.location.href : '');

  // Default LocalBusiness schema for Chennai
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": COMPANY_INFO.name,
    "image": image,
    "url": currentUrl,
    "telephone": COMPANY_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_INFO.address,
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": COMPANY_INFO.pincode,
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chennai"
    }
  };

  return (
    <Helmet>
      {/* Standard */}
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={currentUrl} />

      {/* GEO SEO */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Chennai" />
      <meta name="geo.position" content="13.0827;80.2707" />
      <meta name="ICBM" content="13.0827, 80.2707" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={name} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {/* Custom schema if passed */}
      {schema && (
        <script type="application/ld+json">
          {schema}
        </script>
      )}
    </Helmet>
  );
>>>>>>> 70af73cd5e1c2bda10e3b8ccc50863fb6058d301
};

export default SEO;
