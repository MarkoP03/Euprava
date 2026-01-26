import React, { useState } from 'react';
import authService from '../api/authService';
import { useNavigate } from 'react-router-dom';

const KindergartenLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/kindergarten/children'); // landing page vrtića
    } catch (err) {
      setError('Pogrešan email ili lozinka');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Predškolska ustanova</h2>

        {error && <div style={styles.error}>{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Prijavljivanje...' : 'Prijavi se'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f7f7f7'
  },
  card: {
    width: 360,
    padding: 30,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15
  },
  button: {
    width: '100%',
    padding: 10,
    background: '#059669',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  error: {
    marginBottom: 15,
    color: '#b91c1c'
  }
};

export default KindergartenLogin;
