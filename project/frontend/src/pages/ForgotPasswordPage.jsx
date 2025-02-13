import  { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setMessage(data.message);
      } else {
        setErrorMessage(data.message || 'Échec de la réinitialisation.');
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-page d-flex align-items-center justify-content-center min-vh-100">
        <div className="forgot-password-box p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4">Réinitialiser le mot de passe</h2>
          <form onSubmit={handleForgotPassword}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Envoyer
            </button>
          </form>
          <div className="text-center">
            <Link to="/login">Retour à la connexion</Link>
          </div>
          {message && <div className="alert alert-success mt-3" role="alert">{message}</div>}
          {errorMessage && <div className="alert alert-danger mt-3" role="alert">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 