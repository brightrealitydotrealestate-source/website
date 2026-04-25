import React from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY_INFO } from '../constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  type?: string;
  name?: string;
  image?: string;
  schema?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  type = 'website',
  name = COMPANY_INFO.name,
  image = '/assets/images/Golden.png', // Default OG image
  schema
}) => {
  // Don't append brand if title already contains it (avoids "... | Bright Reality | Bright Reality")
  const alreadyBranded = title ? title.includes(COMPANY_INFO.name) || title.includes('Kushi Busy') : false;
  const siteTitle = title
    ? alreadyBranded ? title : `${title} | ${COMPANY_INFO.name}`
    : `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline}`;
  const metaDescription = description || "Bright Reality provides premium real estate services in Chennai, including plots, villas, flats, and registration documentation.";
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://www.kushibusy.in');

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
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
};

export default SEO;
