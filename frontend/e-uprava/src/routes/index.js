// Kindergarten components
import ChildManagement from '../modules/kindergarten/components/ChildManagement';
import KindergartenManagement from '../modules/kindergarten/components/KindergartenManagement';
import EnrollmentManagement from '../modules/kindergarten/components/EnrollmentManagement';
import NotificationsManagement from '../modules/kindergarten/components/NotificationsManagement';
import UserManagement from '../modules/kindergarten/components/UserManagement';

// Health components
import AllergyManagement from '../modules/health/components/AllergyManagement';
import DoctorReportManagement from '../modules/health/components/DoctorReportManagement';
import EnrollmentConfirmationManagement from '../modules/health/components/EnrollmentConfirmationManagement';
import MedicalRecordManagement from '../modules/health/components/MedicalRecordManagement';
import ReportOfIllnessManagement from '../modules/health/components/ReportOfIllnessManagement';
import VaccineManagement from '../modules/health/components/VaccineManagement';

export const routes = {
  preschool: {
    label: 'Predškolska Ustanova',
    pages: [
      { id: 'children', label: 'Deca', path: '/kindergarten/children', component: ChildManagement },
      { id: 'kindergartens', label: 'Vrtići', path: '/kindergarten/kindergartens', component: KindergartenManagement },
      { id: 'enrollments', label: 'Upisi', path: '/kindergarten/enrollments', component: EnrollmentManagement },
      { id: 'notifications', label: 'Obaveštenja', path: '/kindergarten/notifications', component: NotificationsManagement },
      { id: 'users', label: 'Korisnici', path: '/kindergarten/users', component: UserManagement }
    ]
  },
  healthcare: {
    label: 'Zdravstvo',
    pages: [
      { id: 'allergies', label: 'Alergije', path: '/health/allergies', component: AllergyManagement },
      { id: 'doctor-reports', label: 'Lekarski Izveštaji', path: '/health/doctor-reports', component: DoctorReportManagement },
      { id: 'enrollment-confirmation', label: 'Potvrda Upisa', path: '/health/enrollment-confirmation', component: EnrollmentConfirmationManagement },
      { id: 'medical-records', label: 'Medicinski Kartoni', path: '/health/medical-records', component: MedicalRecordManagement },
      { id: 'illness-reports', label: 'Izveštaji o Bolesti', path: '/health/illness-reports', component: ReportOfIllnessManagement },
      { id: 'vaccines', label: 'Vakcinacija', path: '/health/vaccines', component: VaccineManagement }
    ]
  }
};

export const allRoutes = Object.values(routes).flatMap(subsystem => subsystem.pages);
