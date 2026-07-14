import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import { Routes, Route } from "react-router-dom";
import Patients from "../pages/Patients/Patients";
import MedicalRecords from "../pages/MedicalRecords/MedicalRecords";
import Doctors from "./pages/Doctors/Doctors";
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicalRecords" element={<MedicalRecords />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
  );
}

export default App;
