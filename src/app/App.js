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
import PatientDetails from "../pages/PatientDetails/PatientDetails";
import EditPatient from "../pages/EditPatient/EditPatient";
import MedicalRecordDetails from "../pages/MedicalRecordDetails/MedicalRecordDetails";
import EditMedicalRecord from "../pages/EditMedicalRecord/EditMedicalRecord";
import AddMedicalRecord from "../pages/AddMedicalRecord/AddMedicalRecord";
import AddAppointment from "../pages/AddAppointment/AddAppointment";

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

          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/patients/edit/:id" element={<EditPatient />} />

          <Route path="/medical-records/:id" element={<MedicalRecordDetails />} />

          <Route
              path="/medical-records/edit/:id"
              element={<EditMedicalRecord />}
          />

              <Route
                  path="/medical-records/add"
                  element={<AddMedicalRecord/>}
              />

          <Route
              path="/appointments/add"
              element={<AddAppointment />}
          />
      </Routes>
  );
}

export default App;
