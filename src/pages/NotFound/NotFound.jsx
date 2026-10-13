import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="auth-page">
      <div className="error-card">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <div className="brand__mark" style={{ width: "3.5rem", height: "3.5rem", fontSize: "1.75rem", backgroundColor: "var(--warning-bg)", color: "var(--warning)" }}>
            <FaExclamationTriangle />
          </div>
        </div>

        <h1>404</h1>
        <h2>Resource Not Found</h2>
        <p>
          The page or clinical resource you are searching for does not exist or has been relocated.
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