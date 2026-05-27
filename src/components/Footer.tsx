import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img src="/img/hirishi-logo.svg" alt="Hirishi Cloud Kitchen" className="footer-logo-img" />
            <div className="footer-logo-text">
              <span className="brand-main">Hirishi</span>
              <span className="brand-sub">Cloud Kitchen</span>
            </div>
          </div>
          <p className="brand-tagline">Experience the authentic taste of tradition, hand-crafted with Amma's love and shipped fresh across India & Worldwide (International Delivery Available).</p>
          <div className="footer-socials">
            <a href="https://instagram.com/hirishicloudkitchen" target="_blank" rel="noopener noreferrer" title="Instagram">
              <img src="/img/instagram-icon.png" alt="Instagram" />
            </a>
            <a href="https://facebook.com/hirishicloudkitchen" target="_blank" rel="noopener noreferrer" title="Facebook">
              <img src="/img/facebook logo_icon.png" alt="Facebook" />
            </a>
            <a href="https://youtube.com/@hirishicloudkitchen" target="_blank" rel="noopener noreferrer" title="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-svg">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.whatsapp.com/channel/0029VbB6K9z05MUmwvnVGe2y" target="_blank" rel="noopener noreferrer" title="WhatsApp Channel">
              <img src="/img/Whatsapp-icon.png" alt="WhatsApp Channel" />
            </a>
            <a href="https://x.com/hirishicloud" target="_blank" rel="noopener noreferrer" title="X (Twitter)">
              <img src="/img/twitter-icon.png" alt="X" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/menu">Full Menu</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
          </ul>
        </div>

        {/* Categories Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Our Clouds</h4>
          <ul className="footer-links">
            <li><Link to="/pickles">Pickles Cloud</Link></li>
            <li><Link to="/sweets">Sweets Cloud</Link></li>
            <li><Link to="/snacks">Snacks Cloud</Link></li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Get in Touch</h4>
          <ul className="footer-links contact-links">
            <li>
              <img src="/img/Whatsapp-icon.png" alt="WhatsApp" className="footer-contact-icon" />
              <a href="tel:+919441317724">+91 944 131 7724</a>
            </li>
            <li>
              <img src="/img/Gmail.width-500.format-webp.webp" alt="Gmail" className="footer-contact-icon" />
              <a href="mailto:hck@hirishi.com">hck@hirishi.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright-info">
          <p className="copyright-text">&copy; {new Date().getFullYear()} Hirishi Cloud Kitchen. All rights reserved.</p>
          <p className="made-with-love">Made with ❤️ in Amma Chethi Vantillu</p>
        </div>
        <div className="footer-bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <span className="separator">|</span>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

