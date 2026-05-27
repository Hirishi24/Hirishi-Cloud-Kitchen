import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { PromoBanner } from './components/PromoBanner';
import { AnimatedBg } from './components/AnimatedBg';
import { WelcomeModal } from './components/WelcomeModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Menu } from './pages/Menu';
import { Pickles } from './pages/Pickles';
import { PickleDetail } from './pages/PickleDetail';
import { Sweets } from './pages/Sweets';
import { Snacks } from './pages/Snacks';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
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
          <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Background elements */}
            <AnimatedBg />

            {/* Header Container - outside layout wrapper to preserve position: fixed and show on landing page */}
            <header className="header-fixed-container">
              <PromoBanner />
              <Navbar />
            </header>

            {/* Session Welcome Modal */}
            {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}

            {/* Global Slide-over Cart Drawer */}
            <CartDrawer />

            {/* Page content wrapper with transition - completely hides main content during modal to optimize performance and prevent flashing */}
            <div className={`app-main-layout ${showWelcome ? 'layout-hidden' : 'layout-visible'}`}>
              {/* Page content with spacing for fixed navbar */}
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/pickles" element={<Pickles />} />
                  <Route path="/pickles/:id" element={<PickleDetail />} />
                  <Route path="/sweets" element={<Sweets />} />
                  <Route path="/snacks" element={<Snacks />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </main>

              {/* Global Footer */}
              <Footer />
            </div>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

