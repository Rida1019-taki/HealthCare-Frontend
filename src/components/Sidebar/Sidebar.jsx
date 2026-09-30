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

const items = [
  { to: "/dashboard", label: "Dashboard", icon: FaHome },
  { to: "/patients", label: "Patients", icon: FaUsers, roles: ["ADMIN"] },
  { to: "/doctors", label: "Doctors", icon: FaUserMd, roles: ["ADMIN"] },
  { to: "/appointments", label: "Appointments", icon: FaCalendarCheck },
  { to: "/medical-records", label: "Medical Records", icon: FaFileAlt },
  { to: "/notifications", label: "Notifications", icon: FaBell },
  { to: "/profile", label: "Profile", icon: FaUserCircle },
  { to: "/settings", label: "Settings", icon: FaCog },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const visibleItems = items.filter((item) => !item.roles || item.roles.includes(role));

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar__brand">
        <span className="brand__mark">
          <FaHeartbeat />
        </span>
        <div>
          <strong>HealthCare+</strong>
          <span>Clinical operations</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Workspace navigation">
        {visibleItems.map((item) => {
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
        <button type="button" className="sidebar__logout" onClick={logout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
