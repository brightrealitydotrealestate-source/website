import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FloatingContactButtons from './components/FloatingContactButtons';
import { CONTACT_INFO } from './constants';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Home serves as a Layout Route for these paths to prevent remounting */}
            <Route element={<Home />}>
              <Route path="/" element={<></>} />
              <Route path="/aboutus" element={<></>} />
              <Route path="/services" element={<></>} />
              <Route path="/contact" element={<></>} />
              {/* Dynamic route for services at root level */}
              <Route path="/:serviceSlug" element={<></>} />
            </Route>
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Layout>
        <FloatingContactButtons
          phoneNumber={CONTACT_INFO.phone}
          whatsappNumber={CONTACT_INFO.whatsapp}
        />
      </Router>
    </HelmetProvider>
  );
};

export default App;