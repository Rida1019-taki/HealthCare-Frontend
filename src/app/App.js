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
import AddMedicalRecord from "../pages/MedicalRecords/AddMedicalRecord/AddMedicalRecord";
import AddAppointment from "../pages/Appointments/AddAppointment/AddAppointment";
import ViewDoctor from "../pages/Doctors/ViewDoctor/ViewDoctor";
import EditDoctor from "../pages/Doctors/EditDoctor/EditDoctor";
import AuthGuard from "../../guards/AuthGuard";
import RoleGuard from "../../guards/RoleGuard";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<Home />} />

          <Route path="/dashboard" element={
                  <AuthGuard>
                  <Dashboard />
                  </AuthGuard>}
          />

          <Route path="/patients" element={<AuthGuard>
                  <RoleGuard roles={["ADMIN"]}>
                  <Patients/>
                  </RoleGuard>
                  </AuthGuard>} />
              <Route
                  path="/add-patient"
                  element={
                          <AuthGuard>
                                  <RoleGuard roles={["ADMIN"]}>
                                          <AddPatient />
                                  </RoleGuard>
                          </AuthGuard>
                  }
              />

          <Route path="/doctors" element= {
                  <AuthGuard>
                  <RoleGuard roles={["ADMIN"]}>
                          <Doctors/>
                  </RoleGuard>
                  </AuthGuard>

          } />
              <Route
                  path="/add-doctor"
                  element={
                          <AuthGuard>
                                  <RoleGuard roles={["ADMIN"]}>
                                          <AddDoctor />
                                  </RoleGuard>
                          </AuthGuard>
                  }
              />

          <Route path="/medical-records" element={<AuthGuard>
                  <RoleGuard roles={["ADMIN", "MEDECIN"]}>
                          <MedicalRecords />
                  </RoleGuard>
          </AuthGuard>} />

          <Route path="/appointments" element={<AuthGuard>
                  <RoleGuard roles={["ADMIN","MEDECIN"]}>
                          <Appointments/>
                  </RoleGuard>
          </AuthGuard>} />

          <Route path="/about" element={<About />} />

              <Route
                  path="/patients/:id"
                  element={
                          <AuthGuard>
                                  <RoleGuard roles={["ADMIN"]}>
                                          <PatientDetails />
                                  </RoleGuard>
                          </AuthGuard>
                  }
              />
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
