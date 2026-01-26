import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './modules/health/Home';

import HealthLayout from './modules/health/HealthLayout';
import KindergartenLayout from './modules/kindergarten/KindergartenLayout';

import AllergyManagement from './modules/health/components/AllergyManagement';
import DoctorReportManagement from './modules/health/components/DoctorReportManagement';
import EnrollmentConfirmationManagement from './modules/health/components/EnrollmentConfirmationManagement';
import MedicalRecordManagement from './modules/health/components/MedicalRecordManagement';
import ReportOfIllnessManagement from './modules/health/components/ReportOfIllnessManagement';
import VaccineManagement from './modules/health/components/VaccineManagement';
import HealthLogin from './modules/health/components/login';


import ChildManagement from './modules/kindergarten/components/ChildManagement';
import KindergartenManagement from './modules/kindergarten/components/KindergartenManagement';
import EnrollmentManagement from './modules/kindergarten/components/EnrollmentManagement';
import NotificationsManagement from './modules/kindergarten/components/NotificationsManagement';
import UserManagement from './modules/kindergarten/components/UserManagement';
import KindergartenLogin from './modules/kindergarten/components/login';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/health/login" element={<HealthLogin />} />
        <Route path="/kindergarten/login" element={<KindergartenLogin />} />

        {/* ================= HEALTH ================= */}
        <Route path="/health" element={<HealthLayout />}>
          <Route path="allergies" element={<AllergyManagement />} />
          <Route path="doctor-reports" element={<DoctorReportManagement />} />
          <Route path="enrollment-confirmation" element={<EnrollmentConfirmationManagement />} />
          <Route path="medical-records" element={<MedicalRecordManagement />} />
          <Route path="illness-reports" element={<ReportOfIllnessManagement />} />
          <Route path="vaccines" element={<VaccineManagement />} />
        </Route>

        {/* ================= KINDERGARTEN ================= */}
        <Route path="/kindergarten" element={<KindergartenLayout />}>
          <Route path="children" element={<ChildManagement />} />
          <Route path="kindergartens" element={<KindergartenManagement />} />
          <Route path="enrollments" element={<EnrollmentManagement />} />
          <Route path="notifications" element={<NotificationsManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
