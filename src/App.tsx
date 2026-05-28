import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';

import { AnimatedBg } from './components/AnimatedBg';
import { WelcomeModal } from './components/WelcomeModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Pickles } from './pages/Pickles';
import { Sweets } from './pages/Sweets';
import { Snacks } from './pages/Snacks';

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('welcome') || urlParams.has('replay') || urlParams.has('intro')) {
      sessionStorage.removeItem('hck_welcome_seen'); // Clear it to allow consistent replaying
      return true;
    }
    const hasSeen = sessionStorage.getItem('hck_welcome_seen');
    return !hasSeen;
  });

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem('hck_welcome_seen', 'true');
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Ambient background */}
          <AnimatedBg />

          <div className="app-wrapper">
            {/* Promo banner + Top nav */}

            <Navbar />

            {/* Welcome modal */}
            {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}

            {/* Cart drawer */}
            <CartDrawer />

            {/* Page routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pickles" element={<Pickles />} />
              <Route path="/sweets" element={<Sweets />} />
              <Route path="/snacks" element={<Snacks />} />
            </Routes>

            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
