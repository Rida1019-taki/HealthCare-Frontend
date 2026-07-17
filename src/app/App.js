import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import { Routes, Route } from "react-router-dom";
import Patients from "../pages/Patients/Patients";
import MedicalRecords from "../pages/MedicalRecords/MedicalRecords";
import Doctors from "../pages/Doctors/Doctors";
import './App.css';
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import About from "../pages/About/About";
import Appointments from "../pages/Appointments/Appointments";
import AddPatient from "../pages/AddPatient/AddPatient";
import AddDoctor from "../pages/AddDoctor/AddDoctor";

function App() {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/patients" element={<Patients />} />
          <Route path="/add-patient" element={<AddPatient />} />

          <Route path="/doctors" element={<Doctors />} />
          <Route path="/add-doctor" element={<AddDoctor />} />

          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/appointments" element={<Appointments />} />

          <Route path="/about" element={<About />} />
      </Routes>
  );
}

export default App;
