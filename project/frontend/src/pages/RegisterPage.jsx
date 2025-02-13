import  { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Screenshot_2025-02-08_155703-removebg.png';

const RegisterPage = ({ setIsAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        const username = data.user.name || email.split('@')[0];
        navigate(`/dashboard?user=${encodeURIComponent(username)}`);
      } else {
        setErrorMessage(data.message || 'Échec de l’inscription');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="loginr-page-container">
      <div
        className="login-page d-flex align-items-center justify-content-center min-vh-100"
        style={{ width: '600px', margin: 'auto' }}
      >
        <div className="login-box">
          <div className="text-center mb-4">
            <div className="logor-container mb-3">
              <img width={300} src={logo} alt="Logo" />
            </div>
          </div>
          <form onSubmit={handleRegister} className="login-form">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Votre nom"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Nom</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Mot de passe</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirmer le mot de passe"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Créer un compte
            </button>
          </form>
          <div className="text-center">
            Déjà un compte ? <Link to="/login">Connectez-vous</Link>
          </div>
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

RegisterPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default RegisterPage; 