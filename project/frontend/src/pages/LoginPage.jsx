import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Screenshot_2025-02-08_155703-removebg.png';

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if email or password is incorrect
    if (email !== "Essalmi14@gmail.com") {
      setErrorMessage("Email incorrect !");
      setTimeout(() => setErrorMessage(''), 3000); 
    } else if (password !== "123456") {
      setErrorMessage("Mot de passe incorrect !");
      setTimeout(() => setErrorMessage(''), 3000); 
    } else {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      const username = email.split('@')[0];
      navigate(`/dashboard?user=${encodeURIComponent(username)}`);
    }
  };

  useEffect(() => {
    const loginBox = document.querySelector('.login-box');
    loginBox.classList.add('zoom-in');
  }, []);

  return (
    <div className="login-page-container">
      <div
        className="login-page d-flex align-items-center justify-content-center min-vh-100"
        style={{
          position: 'relative',
          left: '450px',
          width: '600px',
        }}
      >
        <div className="login-box">
          <div className="text-center mb-4">
            <div id='imm' className="logo-container mb-3">
              <img width={200} src={logo} alt="" />
            </div>
           
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-4 password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Mot de passe</label>
              <button type="button" className="btn toggle-password" onClick={togglePassword}>
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
            <div className="text-end mb-3">
              <a href="#" className="text-muted" style={{ textDecoration: 'none' }}>
                Mot de passe oublié ?
              </a>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">Se connecter</button>
          </form>
        </div>
      </div>
      {errorMessage && (
        <div
          className="error-notification"
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '15px 30px',
            borderRadius: '5px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 9999,
            fontSize: '16px',
            opacity: 1,
            transition: 'opacity 0.5s ease-in-out',  
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
