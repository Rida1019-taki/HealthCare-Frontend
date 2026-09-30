import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Patients from "../pages/Patients/Patients";
import MedicalRecords from "../pages/MedicalRecords/MedicalRecords";
import Doctors from "../pages/Doctors/Doctors";
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
import Notifications from "../pages/Notifications/Notifications";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import AuthGuard from "../guards/AuthGuard";
import RoleGuard from "../guards/RoleGuard";
import Forbidden from "../pages/Forbidden/Forbidden";
import NotFound from "../pages/NotFound/NotFound";

const withLayout = (node) => <AppLayout>{node}</AppLayout>;

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            {withLayout(<Dashboard />)}
          </AuthGuard>
        }
      />

      <Route
        path="/patients"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN"]}>{withLayout(<Patients />)}</RoleGuard>
          </AuthGuard>
        }
      />
      <Route
        path="/add-patient"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN"]}>{withLayout(<AddPatient />)}</RoleGuard>
          </AuthGuard>
        }
      />
      <Route
        path="/patients/:id"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN"]}>{withLayout(<PatientDetails />)}</RoleGuard>
          </AuthGuard>
        }
      />
      <Route
        path="/patients/edit/:id"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN"]}>{withLayout(<EditPatient />)}</RoleGuard>
          </AuthGuard>
        }
      />

      <Route
        path="/doctors"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN"]}>{withLayout(<Doctors />)}</RoleGuard>
          </AuthGuard>
        }
      />
      <Route
        path="/add-doctor"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN"]}>{withLayout(<AddDoctor />)}</RoleGuard>
          </AuthGuard>
        }
      />
      <Route
        path="/doctors/:id"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN"]}>{withLayout(<ViewDoctor />)}</RoleGuard>
          </AuthGuard>
        }
      />
      <Route
        path="/doctors/edit/:id"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN"]}>{withLayout(<EditDoctor />)}</RoleGuard>
          </AuthGuard>
        }
      />

      <Route
        path="/medical-records"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN", "MEDECIN"]}>{withLayout(<MedicalRecords />)}</RoleGuard>
          </AuthGuard>
        }
      />
      <Route
        path="/medical-records/:id"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN", "MEDECIN"]}>{withLayout(<MedicalRecordDetails />)}</RoleGuard>
          </AuthGuard>
        }
      />
      <Route
        path="/medical-records/edit/:id"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN", "MEDECIN"]}>{withLayout(<EditMedicalRecord />)}</RoleGuard>
          </AuthGuard>
        }
      />
      <Route
        path="/medical-records/add"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN", "MEDECIN"]}>{withLayout(<AddMedicalRecord />)}</RoleGuard>
          </AuthGuard>
        }
      />

      <Route
        path="/appointments"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN", "MEDECIN"]}>{withLayout(<Appointments />)}</RoleGuard>
          </AuthGuard>
        }
      />
      <Route
        path="/appointments/add"
        element={
          <AuthGuard>
            <RoleGuard roles={["ADMIN", "MEDECIN"]}>{withLayout(<AddAppointment />)}</RoleGuard>
          </AuthGuard>
        }
      />

      <Route
        path="/notifications"
        element={
          <AuthGuard>
            {withLayout(<Notifications />)}
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            {withLayout(<Profile />)}
          </AuthGuard>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthGuard>
            {withLayout(<Settings />)}
          </AuthGuard>
        }
      />

      <Route path="/403" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
