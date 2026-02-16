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
    name: "Poonamallee",
    subtitle: "Upcoming Residential Plots in Poonamallee",
    src: "https://i.pinimg.com/1200x/a6/15/30/a61530b39558e18df7a896ed6ac1c574.jpg",
    alt: "Upcoming Residential Plots in Poonamallee"
  },
  {
    id: 2,
    name: "Avadi",
    subtitle: "Buy Residential Plots for Sale in Avadi, Chennai ",
    src: "https://i.pinimg.com/736x/00/62/c8/0062c863324f2d03712fe00222511257.jpg",
    alt: "Buy Residential Plots for Sale in Avadi, Chennai"
  },
  {
    id: 3,
    name: "OMR",
    subtitle: "Upcoming World Class Mall in OMR, Chennai",
    src: "https://i.pinimg.com/736x/5c/61/52/5c6152498c9416507fa3b99d7f50d430.jpg",
    alt: "Upcoming World Class Mall in OMR, Chennai"
  },
  {
    id: 4,
    name: "Kuthambakkam",
    subtitle: "Upcoming New Bus Terminus Kuthambakkam, Chennai",
    src: "https://i.pinimg.com/1200x/fc/cd/8d/fccd8dc7f22219a4b3e9bdfab62a9751.jpg",
    alt: "Upcoming New Bus Terminus Kuthambakkam, Chennai"
  },
  {
    id: 5,
    name: "Poonamallee",
    subtitle: "New Metro Line Poonamallee, Vadapalani to Poonamallee in 2026",
    src: "https://i.pinimg.com/1200x/46/14/e5/4614e504bc1e11f3e585d20033540784.jpg",
    alt: "New Metro Line Poonamallee"
  },
  {
    id: 6,
    name: "Avadi",
    subtitle: "New Suburban Railway Line Avadi, Tambaram - Avadi - Soon",
    src: "https://i.pinimg.com/1200x/01/be/a1/01bea166874b6c6f8add6617ca78164e.jpg",
    alt: "New Suburban Railway Line Avadi, Tambaram - Avadi - Soon"
  },
  {
    id: 7,
    name: "Paranthur",
    subtitle: "New International Airport Paranthur, Chennai",
    src: "https://i.pinimg.com/1200x/53/1f/13/531f137fa97e776062b07b974fa3fa04.jpg",
    alt: "New International Airport Paranthur, Chennai"
  },
];

export const SERVICES: ServiceItem[] = [
  { id: 1, title: "Buy/Sell Properties (Plots, Villas, Flats)", link: "/#services", slug: "property-sales" },
  { id: 2, title: "Documentation (Patta, EC)", link: "/#services", slug: "documentation" },
  { id: 3, title: "Property Registration Services", link: "/#services", slug: "registration" },
];

// Google Icon for Reviews (Monochrome)
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  React.createElement("svg", {
    ...props,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: "0" // Use fill for 'G' logo
  },
    React.createElement("path", {
      d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347 .533 12S5.867 24 12.48 24c3.44 0 6.053-1.147 8.16-3.293 2.133-2.133 2.827-5.12 2.827-7.547 0-.747-.08-1.48-.173-2.24H12.48z"
    })
  )
);

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Instagram", url: "https://www.instagram.com/kushibusy/", icon: Instagram },
  { platform: "YouTube", url: "https://www.youtube.com/@KUSHIBUSY", icon: Youtube },
  { platform: "Facebook", url: "https://facebook.com", icon: Facebook },
  { platform: "WhatsApp", url: "https://wa.me/+919840013421", icon: WhatsAppBrandIcon },
  { platform: "Email", url: "mailto:brightrealityrealestate@gmail.com", icon: Mail },
  { platform: "Google Reviews", url: "https://g.page/r/CXFNhZDbWYmNEAI/review", icon: GoogleIcon }, // Placeholder URL
];

export const COMPANY_INFO = {
  name: "Bright Reality",
  tagline: "An Oppertunity to Enrich Yourself",
  address: "No.62/2, 2nd Floor, South Sivan Koil Street, Vadapalani, Chennai - 600 026",
  email: "brightrealityrealestate@gmail.com",
  phone: "+91 98400 55492",
  copyrightYear: "2026",
  mapAddress: "No.62/2, 2nd Floor, South Sivan Koil Street, Vadapalani, Chennai - 600 026",
  googleMapLink: "https://maps.app.goo.gl/rgyNhRoqV9YPb1dx7",
  mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.498492067764!2d80.2125164!3d13.0471321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2ae321b5313b9565%3A0x8d8959db90854d71!2sBright%20Reality!5e0!3m2!1sen!2sin!4v1707900000000!5m2!1sen!2sin"
};

export const ABOUT_US_IMAGE = "/assets/images/company.png";
export const ABOUT_US_FOUNDER_IMAGE = "/assets/images/founder.png"; // User can update this path later

export const GALLERY_ITEMS: GalleryItem[] = [
  { type: 'image', src: "/assets/images/brightrealitychenani.jpeg", alt: "Bright Reality Real Estate Company in Chennai" },
  { type: 'image', src: "/assets/images/CMDA Approved Plots in Avadi.png", alt: "CMDA Approved Plots in Avadi" },
  { type: 'image', src: "/assets/images/Low Budget Plots Around Ponamallee.png", alt: "Low Budget Plots Around Ponamallee" },
  { type: 'image', src: "/assets/images/Available Plots In Sriperumbhur Surrounding.png", alt: "Available Plots In Sriperumbhur Surrounding" },
  { type: 'image', src: "/assets/images/Gated Community Villas, Plots in Maraimalai Nagar.png", alt: "Gated Community Villas, Plots in Maraimalai Nagar" },
  { type: 'image', src: "/assets/images/Plots in Chengalpattu, Newly Launched Plots in Chengalpattu Surrounding.png", alt: "Plots in Chengalpattu, Newly Launched Plots in Chengalpattu Surrounding" },
  { type: 'image', src: "/assets/images/New Plots, Appartments, Resale House, Villas in Guduvancheri.png", alt: "New Plots, Appartments, Resale House, Villas in Guduvancheri" },
  { type: 'image', src: "/assets/images/Plots in Tiruvallur, Newly Launched Available Plots in Tiruvallur.png", alt: "Plots in Tiruvallur, Newly Launched Available Plots in Tiruvallur" },
  { type: 'image', src: "/assets/images/Low Budget Villa Plots in Vepampattu.png", alt: "Low Budget Villa Plots in Vepampattu" },
  { type: 'image', src: "/assets/images/propertiesforsaleinkodaikanal.jpeg", alt: "Properties for sale in Kodaikanal" },
  { type: 'image', src: "https://i.pinimg.com/736x/e9/1e/ce/e91eceb210710b9dbb2c5e05d04a1574.jpg", alt: "Best Real estate Company in Chennai" },
  { type: 'image', src: "https://i.pinimg.com/736x/fc/c8/df/fcc8dffbc79ead993ca1d8ac9aff2f14.jpg", alt: "Low Budget Plots in Chennai" },
  { type: 'image', src: "https://i.pinimg.com/736x/5e/09/4d/5e094d155618d1bdc54a1e785dfa17a2.jpg", alt: "Villas for Sale in Chennai" },
  { type: 'image', src: "https://i.pinimg.com/1200x/be/da/f8/bedaf87a4c587dd29b66840d4fcb5f17.jpg", alt: "Appartment for Sale in Chennai" },
  // Using the actual video for thumbnail generation
  { type: 'video', src: "/assets/videos/BR.mp4", alt: "About Bright Reality" },
  { type: 'image', src: "/assets/images/propertiesinkodaikanal.jpeg", alt: "Properties in Kodaikanal" },
  { type: 'image', src: "/assets/images/propertiesavailableinkodaikanal.jpeg", alt: "Properties Available in Kodaikanal" },
  { type: 'video', src: "https://v1.pinimg.com/videos/mc/720p/29/ef/52/29ef526285821ff585be9de512a1783f.mp4", alt: "Gated Community Appartment in Avadi" },
  { type: 'image', src: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeGGe4ZtkJ8eNTlY7iWsNgVS_lLegysxQOhMK04a6qnWxn3DYsRtIpf6usgMVxpphvIxwu98tzxgxUT-Hp8V6SDzPgUzlRpfh7T_TbEdXN_FVx40Uau5zGAly7lYxI7LibISq779rtDN2ZoPZi3eI0?key=qF8Y8X7g422MQiWtFYG0Rg", alt: "On road properties around over all the chennai" },
  { type: 'image', src: "https://media-cdn.tripadvisor.com/media/photo-m/1280/15/4d/46/af/kodaikanal.jpg", alt: "hill station properties in tamil nadu" },
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
  phone: '+91 98400 55492 ', // Replace with actual phone number
  whatsapp: '+919840013421', // Replace with actual WhatsApp number (will be provided by user)
};