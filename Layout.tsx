import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/next';
interface LayoutProps {
  children: React.ReactNode;
}

const HOME_PATHS = new Set(['/', '/aboutus', '/services', '/contact', '/property-sales', '/documentation', '/registration']);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Group all Home-layout routes under a single key so navigating between
  // sections within the home page does NOT remount <main> or replay the
  // fade-in animation. Only truly different pages get a new key.
  const pageKey = HOME_PATHS.has(pathname) ? 'home' : pathname;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Analytics />
      <Navbar />
      <main key={pageKey} className="flex-grow page-fade-in">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;