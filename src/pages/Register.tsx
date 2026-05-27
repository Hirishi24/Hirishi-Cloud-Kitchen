import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    
    // Simulate slight loading delay like original script
    setTimeout(async () => {
      await register(fullName, email, password);
      setLoading(false);
      navigate('/');
    }, 800);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Register background bubbles */}
      <div className="register-animated-bg">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <svg className="register-mascot" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="45" cy="55" rx="22" ry="20" fill="#fff" stroke="#e3d18a" stroke-width="2" />
            <ellipse cx="25" cy="40" rx="7" ry="8" fill="#e3d18a" />
            <ellipse cx="65" cy="40" rx="7" ry="8" fill="#e3d18a" />
            <ellipse cx="37" cy="58" rx="4" ry="5" fill="#1b3c3d" />
            <ellipse cx="53" cy="58" rx="4" ry="5" fill="#1b3c3d" />
            <ellipse cx="37" cy="60" rx="1.2" ry="1.5" fill="#fff" />
            <ellipse cx="53" cy="60" rx="1.2" ry="1.5" fill="#fff" />
            <ellipse cx="45" cy="65" rx="2.2" ry="1.2" fill="#1b3c3d" />
            <path d="M42 68 Q45 70 48 68" stroke="#1b3c3d" stroke-width="1.5" fill="none" />
            <ellipse cx="45" cy="80" rx="8" ry="3" fill="#e3d18a" opacity="0.3" />
          </svg>
          
          <h2>Register</h2>
          {error && <div style={{ color: '#ff6b6b', fontFamily: "var(--font-title)", fontSize: '1.2em', marginBottom: '10px' }}>{error}</div>}
          
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          
          <button type="submit" disabled={loading} style={{ cursor: 'pointer' }}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
          
          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
