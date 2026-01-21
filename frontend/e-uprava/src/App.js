
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './modules/health/Home';
import HealthLayout from './modules/health/HealthLayout';
import AllergyManagement from './modules/health/components/AllergyManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Health section */}
        <Route path="/health" element={<HealthLayout />}>
          <Route path="allergies" element={<AllergyManagement />} />
          {/* <Route path="patients" element={<PatientManagement />} /> */}
        </Route>

        {/* Kindergarten section later */}
        {/* <Route path="/kindergarten" element={<KindergartenLayout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;