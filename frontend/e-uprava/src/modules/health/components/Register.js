import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';

const HealthRegister = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    surname: '',
    role: 'DOCTOR' // default
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
      navigate('/health/login');
    } catch (err) {
      setError('Registracija nije uspela');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Registracija – Zdravstvo</h2>

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

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="DOCTOR">Doktor</option>
          <option value="NURSE">Medicinska sestra</option>
        </select>

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
  }
};

export default HealthRegister;
