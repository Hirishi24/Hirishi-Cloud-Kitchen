import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate slight loading delay like original script
    setTimeout(async () => {
      await login(emailOrUsername, password);
      setLoading(false);
      navigate('/');
    }, 800);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Login background bubbles */}
      <div className="login-animated-bg">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <svg className="login-mascot" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Email or Username"
            required
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
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
          
          <button type="submit" disabled={loading} style={{ cursor: 'pointer' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
