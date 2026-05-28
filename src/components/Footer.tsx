import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Globe, Heart, ShieldCheck, Leaf, Clock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <Link to="/" className="top-nav-logo" style={{ marginBottom: '4px' }}>
          <img src="img/hirishi-logo.svg" alt="Hirishi" />
          <div className="top-nav-brand">
            <span className="brand-name">Hirishi</span>
            <span className="brand-sub">Cloud Kitchen</span>
          </div>
        </Link>
        <p>Authentic homemade pickles, sweets & snacks. Taste of Amma's Love — delivered fresh across India & Worldwide.</p>
        <div className="footer-socials">
          <a href="https://instagram.com/hirishicloudkitchen" target="_blank" rel="noopener noreferrer" title="Instagram">
            <img src="img/instagram-icon.png" alt="Instagram" />
          </a>
          <a href="https://facebook.com/hirishicloudkitchen" target="_blank" rel="noopener noreferrer" title="Facebook">
            <img src="img/facebook logo_icon.png" alt="Facebook" />
          </a>
          <a href="https://youtube.com/@hirishicloudkitchen" target="_blank" rel="noopener noreferrer" title="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-svg">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a href="https://www.whatsapp.com/channel/0029VbB6K9z05MUmwvnVGe2y" target="_blank" rel="noopener noreferrer" title="WhatsApp Channel">
            <img src="img/Whatsapp-icon.png" alt="WhatsApp Channel" />
          </a>
          <a href="https://x.com/hirishicloud" target="_blank" rel="noopener noreferrer" title="X (Twitter)">
            <img src="img/twitter-icon.png" alt="X" />
          </a>
        </div>
      </div>
      <div>
        <h4 className="footer-heading">Explore</h4>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/pickles">Pickles Cloud</Link></li>
          <li><Link to="/sweets">Sweets Cloud</Link></li>
          <li><Link to="/snacks">Snacks Cloud</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="footer-heading">Our Promise</h4>
        <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li style={{ color: 'var(--text-secondary)', fontSize: '0.9em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Leaf size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} /> 100% Handcrafted
          </li>
          <li style={{ color: 'var(--text-secondary)', fontSize: '0.9em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} /> Zero Preservatives
          </li>
          <li style={{ color: 'var(--text-secondary)', fontSize: '0.9em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} /> Cold-Pressed Oils Only
          </li>
          <li style={{ color: 'var(--text-secondary)', fontSize: '0.9em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} /> Made in Fresh Batches
          </li>
        </ul>
      </div>
      <div>
        <h4 className="footer-heading">Contact Us</h4>
        <ul className="footer-links">
          <li><a href="tel:+919441317724"><Phone size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />+91 944 131 7724</a></li>
          <li><a href="mailto:hck@hirishi.com"><Mail size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />hck@hirishi.com</a></li>
          <li><span style={{ color: 'var(--text-muted)' }}><Globe size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />India & Worldwide Delivery</span></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Hirishi Cloud Kitchen. All rights reserved.</p>
      <p className="made-with-love">Made with <Heart size={14} fill="currentColor" style={{ display: 'inline', verticalAlign: '-2px', color: '#e74c3c' }} /> in Amma Chethi Vantillu</p>
    </div>
  </footer>
);
