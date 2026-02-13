import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FloatingContactButtons from './components/FloatingContactButtons';
import { CONTACT_INFO } from './constants';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
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
  );
};

export default App;