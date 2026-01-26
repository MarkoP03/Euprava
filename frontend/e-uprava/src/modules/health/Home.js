import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dobrodošli 👋</h1>
        <p style={styles.subtitle}>Izaberite sistem za prijavu</p>

        <div style={styles.buttons}>
          <button
            onClick={() => navigate('/health/login')}
            style={{ ...styles.button, backgroundColor: '#2563eb' }}
          >
            Zdravstvo
          </button>

          <button
            onClick={() => navigate('/kindergarten/login')}
            style={{ ...styles.button, backgroundColor: '#059669' }}
          >
            Predškolska ustanova
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f3f6f9'
  },
  card: {
    background: '#ffffff',
    padding: 40,
    borderRadius: 12,
    boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: 420
  },
  title: {
    fontSize: 28,
    marginBottom: 10
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: 30
  },
  buttons: {
    display: 'flex',
    gap: 20,
    justifyContent: 'center'
  },
  button: {
    padding: '12px 24px',
    borderRadius: 8,
    border: 'none',
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer',
    minWidth: 150
  }
};

export default Home;
