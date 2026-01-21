import { NavLink, Outlet } from 'react-router-dom';

const HealthLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Health</h2>

        <NavLink
          to="/health/allergies"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
            }`
          }
        >
          Allergies
        </NavLink>

        {/* add more */}
        {/* <NavLink to="/health/patients">Patients</NavLink> */}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default HealthLayout;
