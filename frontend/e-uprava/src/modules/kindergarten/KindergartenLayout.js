import { NavLink, Outlet } from 'react-router-dom';

const KindergartenLayout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Predškolska ustanova</h2>
        <p>Administracija</p>

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

        <NavLink
          to="/kindergarten/enrollments"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Enrollments
        </NavLink>

        <NavLink
          to="/kindergarten/notifications"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Notifications
        </NavLink>

        <NavLink
          to="/kindergarten/users"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Users
        </NavLink>
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
