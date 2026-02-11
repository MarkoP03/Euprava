import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from './api/authService'; 

const KindergartenLayout = () => {
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
    } catch (error) {
      console.error('Error fetching current user:', error);
      // Redirektuj na login ako nema autentifikovanog korisnika
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = () => {
    return currentUser?.role === 'ADMIN';
  };

  const isTeacher = () => {
    return currentUser?.role === 'TEACHER';
  };
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate('/kindergarten/login');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <div style={{ color: '#6b7280', fontSize: '16px' }}>Učitavanje...</div>
      </div>
    );
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Predškolska ustanova</h2>
        <p>Administracija</p>

        {currentUser && (
          <div style={{
            padding: '12px 16px',
            marginBottom: '20px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>
              {currentUser.name} {currentUser.surname}
            </div>
            <div style={{ color: '#6b7280', fontSize: '12px' }}>
              {currentUser.role === 'ADMIN' ? 'Administrator' : 'Vaspitač'}
            </div>
          </div>
        )}

        
        <NavLink
          to="/kindergarten/children"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Children
        </NavLink>
        

        <NavLink
          to="/kindergarten/kindergartens"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Kindergartens
        </NavLink>

        {isAdmin() && (
          <NavLink
            to="/kindergarten/enrollments"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Enrollments
          </NavLink>
        )}

        <NavLink
          to="/kindergarten/notifications"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Notifications
        </NavLink>

        {isAdmin() && (
          <NavLink
            to="/kindergarten/users"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Users
          </NavLink>
        )}



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

export default KindergartenLayout;