import React, { useState } from 'react';
import authService from '../api/authService';
import { useNavigate, Link } from 'react-router-dom';

const HealthLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login(username, password);
      navigate('/health/allergies');
    } catch (err) {
      setError('Pogrešan korisničko ime ili lozinka');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Zdravstveni sistem</h2>

        {error && <div style={styles.error}>{error}</div>}

       <input
          type="text" 
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        {/* 👇 LINK KA REGISTRACIJI */}
        <p style={styles.registerText}>
          Nemaš nalog?{' '}
          <Link to="/health/register" style={styles.link}>
            Registruj se
          </Link>
        </p>
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
    background: '#f3f6f9'
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
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  error: {
    marginBottom: 15,
    color: '#b91c1c'
  },
  registerText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default HealthLogin;
