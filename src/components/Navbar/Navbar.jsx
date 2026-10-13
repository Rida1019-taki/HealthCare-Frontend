import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaHeartbeat,
  FaUserCircle,
} from "react-icons/fa";
import "./Navbar.css";

const publicLinks = [
  { to: "/#features", label: "Features" },
  { to: "/#workflow", label: "Clinical Workflow" },
  { to: "/#why", label: "Security & Standards" },
  { to: "/about", label: "About Platform" },
];

const pageTitles = {
  "/dashboard": "Clinical Dashboard",
  "/patients": "Patient Management",
  "/doctors": "Medical Staff Directory",
  "/appointments": "Appointment Scheduling",
  "/medical-records": "Electronic Health Records",
  "/notifications": "Notifications & Alerts",
  "/profile": "User Profile & Account",
  "/settings": "Workspace Settings",
  "/patients/add": "Register Patient",
  "/add-patient": "Register Patient",
  "/add-doctor": "Register Physician",
  "/medical-records/add": "File Medical Dossier",
  "/appointments/add": "Schedule Consultation",
};

function Navbar({ variant = "public", title, onMenuToggle }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const rawRole = localStorage.getItem("role") || "";
  const role = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();
  const userLabel = role === "ADMIN" ? "Administrator" : role === "MEDECIN" ? "Physician" : "Patient";
  const username = localStorage.getItem("username") || userLabel;
  const pageTitle = title || pageTitles[location.pathname] || "Medical Workspace";
  const workspacePath = role === "ADMIN" ? "/dashboard" : "/appointments";

  if (variant === "app") {
    return (
      <header className="app-navbar">
        <div className="app-navbar__left">
          <button
            type="button"
            className="icon-button app-navbar__menu"
            onClick={onMenuToggle}
            aria-label="Open clinical navigation"
          >
            <FaBars />
          </button>

          <div className="app-navbar__title">
            <p className="eyebrow">Clinical Center</p>
            <h1>{pageTitle}</h1>
          </div>
        </div>

        <div className="app-navbar__right">
          <Link
            to="/notifications"
            className="icon-button"
            aria-label="Clinical notifications"
            style={{ position: "relative" }}
          >
            <FaBell />
            <span
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--danger)",
              }}
            />
          </Link>

          <Link to="/profile" className="app-navbar__profile">
            <div className="app-navbar__avatar">
              <FaUserCircle />
            </div>
            <div className="app-navbar__meta">
              <strong>{username}</strong>
              <span>{userLabel}</span>
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
          <span className="brand__caption">Clinical Information System</span>
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
        {token ? (
          <Link to={workspacePath} className="button button--primary">
            Enter Workspace
          </Link>
        ) : (
          <>
            <Link to="/login" className="button button--ghost">
              Sign In
            </Link>
            <Link to="/register" className="button button--primary">
              Register Account
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
