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
} from "react-icons/fa";
import "./Sidebar.css";

const clinicalNav = [
  { to: "/dashboard", label: "Dashboard", icon: FaHome },
  { to: "/patients", label: "Patients", icon: FaUsers, roles: ["ADMIN"] },
  { to: "/doctors", label: "Doctors", icon: FaUserMd, roles: ["ADMIN"] },
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
  const userLabel = role === "ADMIN" ? "Administrator" : role === "MEDECIN" ? "Physician" : "Patient";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const visibleClinical = clinicalNav.filter((item) => !item.roles || item.roles.includes(role));
  const visibleSystem = systemNav.filter((item) => !item.roles || item.roles.includes(role));

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
        <div style={{ padding: "0.25rem 0.5rem 0.35rem", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
          Clinical Operations
        </div>

        {visibleClinical.map((item) => {
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
          Account & Preferences
        </div>

        {visibleSystem.map((item) => {
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
