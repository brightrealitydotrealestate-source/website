import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

interface LayoutProps {
  children: React.ReactNode;
}

const HOME_PATHS = new Set([
  '/',
  '/aboutus',
  '/services',
  '/contact',
  '/property-sales',
  '/documentation',
  '/registration'
]);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const pageKey = HOME_PATHS.has(pathname) ? 'home' : pathname;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />

      <main key={pageKey} className="flex-grow page-fade-in">
        {children}
      </main>

      <Footer />
      <Analytics />
    </div>
  );
};

export default Layout;
