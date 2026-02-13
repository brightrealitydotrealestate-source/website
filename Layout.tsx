import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to top when the route path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      {/* Key forces re-render of main, triggering the animation defined in tailwind config */}
      <main key={pathname} className="flex-grow animate-fadeIn">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;