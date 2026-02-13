import React from 'react';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { Slide, ServiceItem, SocialLink, GalleryItem } from './types';

// Custom WhatsApp Icon Component
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  React.createElement("svg", {
    ...props,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, [
    React.createElement("path", { d: "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21", key: "path" }),
    React.createElement("path", { d: "M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1", key: "path2" }) // Simplified internal
  ])
);

// Better WhatsApp Path (closer to brand)
const WhatsAppBrandIcon = (props: React.SVGProps<SVGSVGElement>) => (
  React.createElement("svg", {
    ...props,
    viewBox: "0 0 24 24",
    fill: "currentColor", // Fill for solid look or stroke for outline
    stroke: "currentColor",
    strokeWidth: "0",
  },
    React.createElement("path", {
      d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
    }))
);

/**
 * SLIDE CONFIGURATION
 */
export const SLIDES: Slide[] = [
  {
    id: 1,
    name: "Slide1",
    subtitle: "Your Subtitle Here",
    src: "/assets/images/Golden.png",
    alt: "Luxury Villa Exterior"
  },
  {
    id: 2,
    name: "Slide2",
    subtitle: "Your Subtitle Here",
    src: "https://i.pinimg.com/1200x/fb/1b/7f/fb1b7fc8048fbda0618b0c132ca0f0ad.jpg",
    alt: "Modern Penthouse Interior"
  },
  {
    id: 3,
    name: "Slide3",
    subtitle: "Your Subtitle Here",
    src: "https://i.pinimg.com/736x/e9/0c/5e/e90c5eb1955ad9316f10098a5d920499.jpg",
    alt: "Futuristic Architecture"
  },
];

export const SERVICES: ServiceItem[] = [
  { id: 1, title: "Buy/Sell Properties (Plots, Villas, Flats)", link: "/#services" },
  { id: 2, title: "Documentation (Patta, EC)", link: "/#services" },
  { id: 3, title: "Property Registration Services", link: "/#services" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Instagram", url: "https://www.instagram.com/kushibusy/", icon: Instagram },
  { platform: "YouTube", url: "https://www.youtube.com/@KUSHIBUSY", icon: Youtube },
  { platform: "Facebook", url: "https://facebook.com", icon: Facebook },
  { platform: "WhatsApp", url: "https://whatsapp.com", icon: WhatsAppBrandIcon },
  { platform: "Email", url: "mailto:nazeerahamedswin@gmail.com", icon: Mail },
];

export const COMPANY_INFO = {
  name: "Bright Reality",
  tagline: "An Oppertunity to Enrich Yourself",
  address: "No.62/2, 2nd Floor, South Sivan Koil Street, Vadapalani, Chennai - 600 026",
  email: "nazeerahamedswin@gmail.com",
  phone: "+91 98400 13421",
  copyrightYear: "2026",
  mapAddress: "No.62/2, 2nd Floor, South Sivan Koil Street, Vadapalani, Chennai - 600 026"
};

export const ABOUT_US_IMAGE = "https://i.pinimg.com/1200x/7b/e4/68/7be468645bee9d8123b984215123a23c.jpg ";

export const GALLERY_ITEMS: GalleryItem[] = [
  { type: 'image', src: "https://picsum.photos/1200/800?random=10", alt: "Luxury Bedroom" },
  { type: 'image', src: "https://picsum.photos/800/1200?random=11", alt: "Modern Kitchen" },
  { type: 'image', src: "https://picsum.photos/1000/1000?random=12", alt: "Poolside View" },
  { type: 'image', src: "https://picsum.photos/1200/600?random=13", alt: "Garden Landscape" },
  // Using the actual video for thumbnail generation
  { type: 'video', src: "/assets/videos/BR.mp4", alt: "About Bright Reality" },
  { type: 'image', src: "https://picsum.photos/800/800?random=14", alt: "Living Room" },
  { type: 'image', src: "https://picsum.photos/900/1200?random=15", alt: "Bathroom" },
  { type: 'image', src: "https://picsum.photos/1200/900?random=16", alt: "Balcony" },
];

export const COLORS = {
  cream: '#FAFAF5',
  peach: '#F9D8A5',
  goldLight: '#E5C47A',
  goldDefault: '#D9B104',
  goldDark: '#B09257',
  goldDeep: '#3E2F0D',
};

// Contact Information
export const CONTACT_INFO = {
  phone: '+1234567890', // Replace with actual phone number
  whatsapp: '+1234567890', // Replace with actual WhatsApp number (will be provided by user)
};