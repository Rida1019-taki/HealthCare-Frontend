import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaHeartbeat,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import "./Navbar.css";

const publicLinks = [
  { to: "#features", label: "Features" },
  { to: "#workflow", label: "How It Works" },
  { to: "#why", label: "Why HealthCare+" },
];

const pageTitles = {
  "/dashboard": "Dashboard",
  "/patients": "Patients",
  "/doctors": "Doctors",
  "/appointments": "Appointments",
  "/medical-records": "Medical Records",
  "/notifications": "Notifications",
  "/profile": "Profile",
  "/settings": "Settings",
  "/patients/add": "Add Patient",
  "/add-patient": "Add Patient",
  "/add-doctor": "Add Doctor",
  "/medical-records/add": "Add Medical Record",
  "/appointments/add": "Add Appointment",
};

function Navbar({ variant = "public", title, onMenuToggle }) {
  const location = useLocation();
  const role = localStorage.getItem("role") || "USER";
  const userLabel = role === "ADMIN" ? "Administrator" : role === "MEDECIN" ? "Doctor" : "Patient";
  const pageTitle = title || pageTitles[location.pathname] || "HealthCare+";

  if (variant === "app") {
    return (
      <header className="app-navbar">
        <div className="app-navbar__left">
          <button type="button" className="icon-button app-navbar__menu" onClick={onMenuToggle} aria-label="Open menu">
            <FaBars />
          </button>

          <div className="brand brand--compact">
            <span className="brand__mark">
              <FaHeartbeat />
            </span>
            <div>
              <span className="brand__name">HealthCare+</span>
              <span className="brand__caption">Medical workspace</span>
            </div>
          </div>

          <div className="app-navbar__title">
            <p className="eyebrow">Workspace</p>
            <h1>{pageTitle}</h1>
          </div>
        </div>

        <div className="app-navbar__right">
          <button type="button" className="icon-button" aria-label="Search">
            <FaSearch />
          </button>

          <Link to="/notifications" className="icon-button" aria-label="Notifications">
            <FaBell />
          </Link>

          <Link to="/profile" className="app-navbar__profile">
            <div className="app-navbar__avatar">
              <FaUserCircle />
            </div>
            <div className="app-navbar__meta">
              <strong>{userLabel}</strong>
              <span>{role}</span>
            </div>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="public-navbar">
      <Link to="/" className="brand">
        <span className="brand__mark">
          <FaHeartbeat />
        </span>
        <div>
          <span className="brand__name">HealthCare+</span>
          <span className="brand__caption">Secure healthcare operations</span>
        </div>
      </Link>

      <nav className="public-navbar__links" aria-label="Primary">
        {publicLinks.map((link) => (
          <a key={link.label} href={link.to}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="public-navbar__actions">
        <Link to="/login" className="button button--ghost">
          Sign in
        </Link>
        <Link to="/register" className="button button--primary">
          Get Started
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
