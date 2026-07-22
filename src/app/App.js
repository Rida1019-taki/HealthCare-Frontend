import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import {Routes, Route, Navigate} from "react-router-dom";
import Patients from "../pages/Patients/Patients";
import MedicalRecords from "../pages/MedicalRecords/MedicalRecords";
import Doctors from "../pages/Doctors/Doctors";
import './App.css';
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import About from "../pages/About/About";
import Appointments from "../pages/Appointments/Appointments";
import AddPatient from "../pages/Patients/AddPatient/AddPatient";
import AddDoctor from "../pages/Doctors/AddDoctor/AddDoctor";
import PatientDetails from "../pages/Patients/PatientDetails/PatientDetails";
import EditPatient from "../pages/Patients/EditPatient/EditPatient";
import MedicalRecordDetails from "../pages/MedicalRecords/MedicalRecordDetails/MedicalRecordDetails";
import EditMedicalRecord from "../pages/MedicalRecords/EditMedicalRecord/EditMedicalRecord";
import AddMedicalRecord from "../pages/Appointments/AddMedicalRecord/AddMedicalRecord";
import AddAppointment from "../pages/Appointments/AddAppointment/AddAppointment";
import ViewDoctor from "../pages/Doctors/ViewDoctor/ViewDoctor";
import EditDoctor from "../pages/Doctors/EditDoctor/EditDoctor";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<Home />} />

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

          <Route path="/doctors/:id" element={<ViewDoctor />} />
          <Route path="/doctors/edit/:id" element={<EditDoctor />} />
      </Routes>
  );
}

export default App;
