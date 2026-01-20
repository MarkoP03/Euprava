import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import './App.css';

import ChildManagement from './modules/kindergarten/ChildManagement';
import KindergartenManagement from './modules/kindergarten/KindergartenManagement';
import EnrollmentManagement from './modules/kindergarten/EnrollmentManagement';
import NotificationsManagement from './modules/kindergarten/NotificationsManagement';
import UserManagement from './modules/kindergarten/UserManagement';

import HealthcareSubsystem from './modules/health/HealthcareSubsystem';

function App() {
  const [currentSubsystem, setCurrentSubsystem] = useState('preschool');
  const [currentPage, setCurrentPage] = useState('children');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const preschoolPages = [
    { id: 'children', label: 'Deca', component: ChildManagement },
    { id: 'kindergartens', label: 'Vrtići', component: KindergartenManagement },
    { id: 'enrollments', label: 'Upisi', component: EnrollmentManagement },
    { id: 'notifications', label: 'Obaveštenja', component: NotificationsManagement },
    { id: 'users', label: 'Korisnici', component: UserManagement }
  ];

  const CurrentComponent = currentSubsystem === 'preschool' 
    ? preschoolPages.find(p => p.id === currentPage)?.component || ChildManagement
    : HealthcareSubsystem;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-800 text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6">Sistem eUprave</h1>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-2">PODSISTEMI</h3>
            <button 
              onClick={() => setCurrentSubsystem('preschool')}
              className={`w-full text-left px-3 py-2 rounded mb-1 ${currentSubsystem === 'preschool' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              Predškolska Ustanova
            </button>
            <button 
              onClick={() => setCurrentSubsystem('healthcare')}
              className={`w-full text-left px-3 py-2 rounded ${currentSubsystem === 'healthcare' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              Zdravstvo
            </button>
          </div>

          {currentSubsystem === 'preschool' && (
            <div>
              <h3 className="text-sm text-gray-400 mb-2">MODULI</h3>
              {preschoolPages.map(page => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`w-full text-left px-3 py-2 rounded mb-1 ${currentPage === page.id ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-semibold">
            {currentSubsystem === 'preschool' ? 'Predskolska Ustanova' : 'Zdravstvo'}
          </h2>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <CurrentComponent />
        </main>
      </div>
    </div>
  );
}

export default App;