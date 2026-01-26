import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';

const KindergartenRegister = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    surname: '',
    role: 'TEACHER' // default
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.register(form);
      navigate('/kindergarten/login');
    } catch (err) {
      setError('Registracija nije uspela');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Registracija – Vrtić</h2>

        {error && <div style={styles.error}>{error}</div>}

        <input
          name="name"
          placeholder="Ime"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="surname"
          placeholder="Prezime"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="username"
          placeholder="Korisničko ime"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Lozinka"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Registracija...' : 'Registruj se'}
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

export default KindergartenRegister;
