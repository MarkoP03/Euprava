import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from './api/authService';

const HealthLayout = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      let user = authService.getCurrentUser();

      if (!user) {
        user = await authService.whoami();
        authService.setCurrentUser(user);
      }

      setCurrentUser(user);
    } catch (err) {
      console.error('Auth error:', err);
      navigate('/health/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate('/health/login');
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <div style={{ color: '#6b7280' }}>Učitavanje...</div>
      </div>
    );
  }

  return (
    <div className="layout">
      <aside className="sidebar">

        <h2>Zdravstveni sistem</h2>
        <p>Upravljanje podacima</p>

        {/* User info */}
        {currentUser && (
          <div
            style={{
              padding: '12px 16px',
              marginBottom: '20px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {currentUser.name} {currentUser.surname}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              {currentUser.role}
            </div>
          </div>
        )}

        <NavLink
          to="/health/allergies"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Allergies
        </NavLink>

        <NavLink
          to="/health/doctor-reports"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Doctor reports
        </NavLink>

        <NavLink
          to="/health/medical-records"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Medical records
        </NavLink>

        <NavLink
          to="/health/illness-reports"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Illness reports
        </NavLink>

        <NavLink
          to="/health/vaccines"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Vaccines
        </NavLink>

        <NavLink
          to="/health/enrollment-confirmation"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Enrollment confirmation
        </NavLink>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            padding: '10px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Logout
        </button>

      </aside>

      <main className="main">
        <div className="card">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default HealthLayout;
