import { Link } from "react-router-dom";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

export default function Forbidden() {
  return (
    <div className="auth-page">
      <div className="forbidden-card">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <div className="brand__mark" style={{ width: "3.5rem", height: "3.5rem", fontSize: "1.75rem", backgroundColor: "var(--danger-bg)", color: "var(--danger)" }}>
            <FaShieldAlt />
          </div>
        </div>

        <h1>403</h1>
        <h2>Access Restricted</h2>
        <p>
          You do not have the required permissions to view this clinical section. Please contact your system administrator if you believe this is an error.
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/dashboard" className="button button--primary">
            <FaArrowLeft />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}