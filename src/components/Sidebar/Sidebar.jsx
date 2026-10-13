import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaCog,
  FaFileAlt,
  FaHeartbeat,
  FaHome,
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
  FaUserMd,
  FaUsers,
  FaUserPlus,
} from "react-icons/fa";
import "./Sidebar.css";

const adminNav = [
  { to: "/dashboard", label: "Dashboard", icon: FaHome },
  { to: "/patients", label: "Manage Patients", icon: FaUsers },
  { to: "/add-patient", label: "Add Patient", icon: FaUserPlus },
  { to: "/doctors", label: "Manage Doctors", icon: FaUserMd },
  { to: "/add-doctor", label: "Add Doctor", icon: FaUserPlus },
];

const doctorNav = [
  { to: "/patients", label: "Patients Directory", icon: FaUsers },
  { to: "/add-patient", label: "Add Patient", icon: FaUserPlus },
  { to: "/appointments", label: "Consultations", icon: FaCalendarCheck },
  { to: "/medical-records", label: "Medical Records", icon: FaFileAlt },
];

const patientNav = [
  { to: "/appointments", label: "Appointments", icon: FaCalendarCheck },
  { to: "/medical-records", label: "Medical Records", icon: FaFileAlt },
];

const systemNav = [
  { to: "/notifications", label: "Notifications", icon: FaBell },
  { to: "/profile", label: "Profile", icon: FaUserCircle },
  { to: "/settings", label: "Settings", icon: FaCog },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const rawRole = localStorage.getItem("role") || "";
  const role = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();
  const isAdmin = role === "ADMIN";
  const isDoctor = role === "MEDECIN";
  const userLabel = isAdmin ? "Administrator" : isDoctor ? "Physician" : "Patient";
  const sectionTitle = isAdmin ? "Clinical Operations" : isDoctor ? "Clinical Care" : "Patient Portal";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const primaryItems = isDoctor ? doctorNav : patientNav;

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar__brand">
        <span className="brand__mark">
          <FaHeartbeat />
        </span>
        <div>
          <strong>HealthCare+</strong>
          <span>Clinical Operations</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Clinical Navigation">
        {isAdmin ? (
          <>
            <div style={{ padding: "0.25rem 0.5rem 0.35rem", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
              Administration & Management
            </div>

            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => `sidebar__link ${isActive ? "active" : ""}`}
                >
                  <Icon />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            <div style={{ padding: "1rem 0.5rem 0.35rem", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
              Clinical Operations
            </div>

            {patientNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => `sidebar__link ${isActive ? "active" : ""}`}
                >
                  <Icon />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </>
        ) : (
          <>
            <div style={{ padding: "0.25rem 0.5rem 0.35rem", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
              {sectionTitle}
            </div>

            {primaryItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => `sidebar__link ${isActive ? "active" : ""}`}
                >
                  <Icon />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </>
        )}

        <div style={{ padding: "1rem 0.5rem 0.35rem", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
          Account & Preferences
        </div>

        {systemNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `sidebar__link ${isActive ? "active" : ""}`}
            >
              <Icon />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <div style={{ padding: "0 0.5rem 0.75rem" }}>
          <span className="badge badge-default" style={{ width: "100%", justifyContent: "center" }}>
            Role: {userLabel}
          </span>
        </div>

        <button type="button" className="sidebar__logout" onClick={logout}>
          <FaSignOutAlt />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
