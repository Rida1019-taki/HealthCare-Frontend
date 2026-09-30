import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaFileAlt,
  FaNotesMedical,
  FaPlus,
  FaUserMd,
  FaUsers,
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
  const role = localStorage.getItem("role");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [patientsRes, doctorsRes, appointmentsRes, recordsRes] = await Promise.all([
        api.get("/api/patients"),
        api.get("/api/medecins"),
        api.get("/api/rendezvous"),
        api.get("/api/dossiers"),
      ]);

      setPatients(patientsRes.data.content || []);
      setDoctors(doctorsRes.data.content || []);
      setAppointments(appointmentsRes.data.content || []);
      setRecords(recordsRes.data.content || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const roleLabel = role === "ADMIN" ? "Administrator" : role === "MEDECIN" ? "Doctor" : "Team member";
  const upcomingAppointments = appointments.slice(0, 3);
  const recentPatients = patients.slice(0, 4);
  const pendingAppointments = appointments.filter(
    (appointment) => String(appointment.statut || "").toLowerCase() === "pending"
  ).length;
  const urgentAppointments = appointments.filter((appointment) =>
    ["urgent", "critical"].includes(String(appointment.statut || "").toLowerCase())
  ).length;

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div className="page-hero__content">
          <span className="section__eyebrow">Clinical dashboard</span>
          <h1>Good morning, {roleLabel}</h1>
          <p>
            A concise view of today&apos;s activity, current workload, and the parts of the practice that need
            attention.
          </p>

          <div className="page-hero__chips">
            <span className="page-hero__chip">Patients {patients.length}</span>
            <span className="page-hero__chip">Appointments {appointments.length}</span>
            <span className="page-hero__chip">Pending {pendingAppointments}</span>
            <span className="page-hero__chip">Urgent {urgentAppointments}</span>
          </div>
        </div>

        <div className="page-hero__actions">
          <Link to="/appointments/add" className="button button--primary">
            <FaPlus />
            New appointment
          </Link>
        </div>
      </section>

      <section className="dashboard-hero">
        <div className="dashboard-hero__copy">
          <span className="section__eyebrow">Today at a glance</span>
          <h2>Operational clarity for the people running the clinic.</h2>
          <p>
            This panel surfaces the main load indicators so the team can react quickly without digging through the
            tables below.
          </p>
        </div>

        <div className="dashboard-hero__panel">
          <div className="dashboard-hero__metric">
            <span>Appointments</span>
            <strong>{loading ? "..." : appointments.length}</strong>
          </div>
          <div className="dashboard-hero__metric">
            <span>Pending</span>
            <strong>{loading ? "..." : pendingAppointments}</strong>
          </div>
          <div className="dashboard-hero__metric">
            <span>Urgent</span>
            <strong>{loading ? "..." : urgentAppointments}</strong>
          </div>
          <div className="dashboard-hero__metric">
            <span>Patients</span>
            <strong>{loading ? "..." : patients.length}</strong>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <StatsCard
          title="Total Patients"
          value={loading ? "..." : patients.length}
          icon={<FaUsers />}
          tone="blue"
          change="+12%"
        />
        <StatsCard
          title="Appointments"
          value={loading ? "..." : appointments.length}
          icon={<FaCalendarCheck />}
          tone="cyan"
          change="+5%"
        />
        <StatsCard
          title="Upcoming Appointments"
          value={loading ? "..." : upcomingAppointments.length}
          icon={<FaCalendarAlt />}
          tone="gold"
          change="Today"
        />
        <StatsCard
          title="Medical Records"
          value={loading ? "..." : records.length}
          icon={<FaFileAlt />}
          tone="green"
          change="Active"
        />
      </section>

      <section className="dashboard-grid">
        <article className="surface-card surface-card--wide">
          <div className="surface-card__header">
            <div>
              <span className="section__eyebrow">Upcoming appointments</span>
              <h2>Today&apos;s schedule</h2>
            </div>
            <Link to="/appointments" className="text-link">
              View all
            </Link>
          </div>

          <div className="mini-list">
            {upcomingAppointments.length === 0 ? (
              <div className="empty-state empty-state--compact">
                <FaCalendarAlt />
                <p>No upcoming appointments yet.</p>
              </div>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="mini-list__item">
                  <div>
                    <strong>
                      {appointment.patientNom} {appointment.patientPrenom}
                    </strong>
                    <span>{appointment.medecinNom}</span>
                  </div>
                  <span className={`badge badge-${appointment.statut?.toLowerCase() || "default"}`}>{appointment.statut}</span>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="surface-card">
          <div className="surface-card__header">
            <div>
              <span className="section__eyebrow">Quick actions</span>
              <h2>Shortcuts</h2>
            </div>
          </div>

          <div className="quick-actions">
            <Link to="/patients" className="quick-action">
              <FaUsers />
              <span>Patients</span>
            </Link>
            <Link to="/doctors" className="quick-action">
              <FaUserMd />
              <span>Doctors</span>
            </Link>
            <Link to="/medical-records/add" className="quick-action">
              <FaNotesMedical />
              <span>Add record</span>
            </Link>
            <Link to="/notifications" className="quick-action">
              <FaCalendarCheck />
              <span>Notifications</span>
            </Link>
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid--three">
        <article className="surface-card">
          <div className="surface-card__header">
            <div>
              <span className="section__eyebrow">Recent patients</span>
              <h2>New and active patients</h2>
            </div>
          </div>

          <div className="mini-list">
            {recentPatients.length === 0 ? (
              <div className="empty-state empty-state--compact">
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
                    <span>{patient.telephone || "-"}</span>
                  </div>
                  <Link to={`/patients/${patient.id}`} className="text-link">
                    View
                  </Link>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="surface-card">
          <Alerts />
        </article>

        <article className="surface-card">
          <StaffOverview doctors={doctors} />
        </article>
      </section>

      <section className="surface-card">
        <ActivityTable />
      </section>
    </div>
  );
}
