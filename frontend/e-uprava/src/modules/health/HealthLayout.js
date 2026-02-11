import { NavLink, Outlet } from 'react-router-dom';

const HealthLayout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Zdravstveni sistem</h2>
        <p>Upravljanje podacima</p>

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
