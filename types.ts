import React from 'react';

export interface Slide {
  id: number;
  name: string;
  src: string;
  alt: string;
  subtitle: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  link: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ElementType;
}

export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
}