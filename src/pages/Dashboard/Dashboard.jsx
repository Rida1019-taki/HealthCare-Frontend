import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaFileAlt,
  FaNotesMedical,
  FaPlus,
  FaUserMd,
  FaUsers,
  FaClock,
  FaUserPlus,
} from "react-icons/fa";
import api from "../../services/api";
import StatsCard from "../../components/StatsCard/StatsCard";
import ActivityTable from "../../components/ActivityTable/ActivityTable";
import Alerts from "../../components/Alerts/Alerts";
import StaffOverview from "../../components/StaffOverview/StaffOverview";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const rawRole = localStorage.getItem("role") || "";
  const role = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();

  const loadData = useCallback(async () => {
    try {
      if (role === "PATIENT") {
        const [appointmentsRes, recordsRes] = await Promise.all([
          api.get("/api/rendezvous/me").catch(() => ({ data: { content: [] } })),
          api.get("/api/dossiers/me").catch(() => ({ data: null })),
        ]);
        setAppointments(appointmentsRes.data?.content || []);
        setRecords(recordsRes.data ? [recordsRes.data] : []);
        setPatients([]);
        setDoctors([]);
      } else {
        const [patientsRes, doctorsRes, appointmentsRes, recordsRes] = await Promise.all([
          api.get("/api/patients").catch(() => ({ data: { content: [] } })),
          api.get("/api/medecins").catch(() => ({ data: { content: [] } })),
          api.get("/api/rendezvous").catch(() => ({ data: { content: [] } })),
          api.get("/api/dossiers").catch(() => ({ data: { content: [] } })),
        ]);

        setPatients(patientsRes.data?.content || []);
        setDoctors(doctorsRes.data?.content || []);
        setAppointments(appointmentsRes.data?.content || []);
        setRecords(recordsRes.data?.content || []);
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const roleLabel = role === "ADMIN" ? "Administrator" : role === "MEDECIN" ? "Doctor" : "Patient";
  const upcomingAppointments = appointments.slice(0, 5);
  const recentPatients = patients.slice(0, 5);

  const pendingAppointments = appointments.filter((appointment) =>
    ["pending", "en_attente"].includes(String(appointment.statut || "").toLowerCase())
  ).length;

  const confirmedAppointments = appointments.filter((appointment) =>
    ["confirmed", "confirme"].includes(String(appointment.statut || "").toLowerCase())
  ).length;

  const urgentAppointments = appointments.filter((appointment) =>
    ["urgent", "critical", "annule"].includes(String(appointment.statut || "").toLowerCase())
  ).length;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="page-stack">
      {/* Executive Clinical Header */}
      <section className="page-hero">
        <div className="page-hero__content">
          <span className="section__eyebrow">Clinical Center • Daily Operations</span>
          <h1>Welcome, {roleLabel}</h1>
          <p>
            {currentDate} — Overview of current patient intake, consultation schedule, and active records.
          </p>

          <div className="page-hero__chips">
            <span className="page-hero__chip">
              <FaUsers />
              {patients.length} Registered Patients
            </span>
            <span className="page-hero__chip">
              <FaCalendarCheck />
              {appointments.length} Consultations
            </span>
            <span className="page-hero__chip">
              <span className="badge badge-confirme">{confirmedAppointments} Confirmed</span>
            </span>
            <span className="page-hero__chip">
              <span className="badge badge-en_attente">{pendingAppointments} Pending Review</span>
            </span>
            {urgentAppointments > 0 && (
              <span className="page-hero__chip">
                <span className="badge badge-annule">{urgentAppointments} Cancelled / Urgent</span>
              </span>
            )}
          </div>
        </div>

        <div className="page-hero__actions">
          {role === "ADMIN" ? (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Link to="/add-doctor" className="button button--primary">
                <FaUserPlus />
                Add Doctor
              </Link>
              <Link to="/add-patient" className="button button--secondary">
                <FaUserPlus />
                Add Patient
              </Link>
              <Link to="/appointments/add" className="button button--ghost">
                <FaPlus />
                New Appointment
              </Link>
            </div>
          ) : role === "MEDECIN" ? (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Link to="/add-patient" className="button button--primary">
                <FaUserPlus />
                Add Patient
              </Link>
              <Link to="/appointments/add" className="button button--secondary">
                <FaPlus />
                New Appointment
              </Link>
            </div>
          ) : (
            <Link to="/appointments/add" className="button button--primary">
              <FaPlus />
              New Appointment
            </Link>
          )}
        </div>
      </section>

      {/* KPI Cards */}
      <section className="stats-grid">
        <StatsCard
          title="Total Patients"
          value={loading ? "..." : role === "PATIENT" ? "1 Active" : patients.length}
          icon={<FaUsers />}
          tone="blue"
          change="Directory"
        />
        <StatsCard
          title={role === "ADMIN" ? "Active Doctors" : "All Consultations"}
          value={loading ? "..." : role === "ADMIN" ? doctors.length : appointments.length}
          icon={role === "ADMIN" ? <FaUserMd /> : <FaCalendarCheck />}
          tone={role === "ADMIN" ? "teal" : "cyan"}
          change={role === "ADMIN" ? "Medical Staff" : "This Month"}
        />
        <StatsCard
          title="Pending Approvals"
          value={loading ? "..." : pendingAppointments}
          icon={<FaClock />}
          tone="gold"
          change="Action Required"
        />
        <StatsCard
          title="Medical Records"
          value={loading ? "..." : records.length}
          icon={<FaFileAlt />}
          tone="green"
          change="Archived & Active"
        />
      </section>

      {/* Primary Clinical Operations Grid */}
      <section className="dashboard-grid">
        {/* Today's / Upcoming Appointments */}
        <article className="surface-card">
          <div className="surface-card__header">
            <div>
              <span className="section__eyebrow">Schedule</span>
              <h2>Upcoming Consultations</h2>
            </div>
            <Link to="/appointments" className="text-link">
              View all schedule →
            </Link>
          </div>

          <div className="mini-list">
            {upcomingAppointments.length === 0 ? (
              <div className="empty-state">
                <FaCalendarAlt />
                <p>No consultations scheduled yet.</p>
              </div>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="mini-list__item">
                  <div>
                    <strong>
                      {appointment.patientNom} {appointment.patientPrenom}
                    </strong>
                    <span>
                      Dr. {appointment.medecinNom} • {appointment.dateRendezVous || "Date TBD"}
                    </span>
                  </div>
                  <span className={`badge badge-${String(appointment.statut || "").toLowerCase()}`}>
                    {appointment.statut}
                  </span>
                </div>
              ))
            )}
          </div>
        </article>

        {/* Quick Clinical Shortcuts */}
        <article className="surface-card">
          <div className="surface-card__header">
            <div>
              <span className="section__eyebrow">Workflows</span>
              <h2>Clinical Shortcuts</h2>
            </div>
          </div>

          <div className="quick-actions">
            {role === "ADMIN" && (
              <>
                <Link to="/patients" className="quick-action">
                  <FaUsers />
                  <span>Manage Patients</span>
                </Link>
                <Link to="/add-patient" className="quick-action">
                  <FaUserPlus />
                  <span>Add Patient</span>
                </Link>
                <Link to="/doctors" className="quick-action">
                  <FaUserMd />
                  <span>Manage Doctors</span>
                </Link>
                <Link to="/add-doctor" className="quick-action">
                  <FaUserPlus />
                  <span>Add Doctor</span>
                </Link>
                <Link to="/appointments" className="quick-action">
                  <FaCalendarCheck />
                  <span>All Appointments</span>
                </Link>
                <Link to="/medical-records/add" className="quick-action">
                  <FaNotesMedical />
                  <span>File Medical Record</span>
                </Link>
              </>
            )}
            {role === "MEDECIN" && (
              <>
                <Link to="/patients" className="quick-action">
                  <FaUsers />
                  <span>Patients List</span>
                </Link>
                <Link to="/add-patient" className="quick-action">
                  <FaUserPlus />
                  <span>Add Patient</span>
                </Link>
                <Link to="/appointments" className="quick-action">
                  <FaCalendarCheck />
                  <span>My Consultations</span>
                </Link>
                <Link to="/medical-records" className="quick-action">
                  <FaFileAlt />
                  <span>Patient EHR Files</span>
                </Link>
                <Link to="/medical-records/add" className="quick-action">
                  <FaNotesMedical />
                  <span>New Diagnosis Note</span>
                </Link>
                <Link to="/appointments/add" className="quick-action">
                  <FaPlus />
                  <span>Schedule Patient</span>
                </Link>
              </>
            )}
            {role === "PATIENT" && (
              <>
                <Link to="/appointments" className="quick-action">
                  <FaCalendarCheck />
                  <span>My Appointments</span>
                </Link>
                <Link to="/appointments/add" className="quick-action">
                  <FaPlus />
                  <span>Book Consultation</span>
                </Link>
                <Link to="/medical-records" className="quick-action">
                  <FaFileAlt />
                  <span>My Medical File</span>
                </Link>
                <Link to="/profile" className="quick-action">
                  <FaUsers />
                  <span>Personal Profile</span>
                </Link>
              </>
            )}
          </div>
        </article>
      </section>

      {/* Secondary Information Grid */}
      <section className="dashboard-grid dashboard-grid--three">
        {/* Recent Patients */}
        <article className="surface-card">
          <div className="surface-card__header">
            <div>
              <span className="section__eyebrow">Intake</span>
              <h2>Recent Patients</h2>
            </div>
            {(role === "ADMIN" || role === "MEDECIN") && (
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Link to="/add-patient" className="text-link" style={{ fontWeight: 600 }}>
                  + Add
                </Link>
                <Link to="/patients" className="text-link">
                  All →
                </Link>
              </div>
            )}
          </div>

          <div className="mini-list">
            {recentPatients.length === 0 ? (
              <div className="empty-state">
                <FaUsers />
                <p>No patient records available.</p>
              </div>
            ) : (
              recentPatients.map((patient) => (
                <div key={patient.id} className="mini-list__item">
                  <div>
                    <strong>
                      {patient.prenom} {patient.nom}
                    </strong>
                    <span>{patient.telephone ? `Tel: ${patient.telephone}` : "No phone listed"}</span>
                  </div>
                  {(role === "ADMIN" || role === "MEDECIN") && (
                    <Link to={`/patients/${patient.id}`} className="action-link action-link--view">
                      View
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>
        </article>

        {/* Clinical Alerts */}
        <article className="surface-card">
          <Alerts />
        </article>

        {/* Medical Staff Overview */}
        <article className="surface-card">
          <StaffOverview doctors={doctors} />
        </article>
      </section>

      {/* Recent Activity Audit Table */}
      <section className="surface-card">
        <ActivityTable />
      </section>
    </div>
  );
}
