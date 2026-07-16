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

function App() {
  return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicalRecords" element={<MedicalRecords />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About/>} />
      </Routes>
  );
}

export default App;
