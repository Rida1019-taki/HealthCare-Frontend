import { Link } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";
import "./StaffOverview.css";

export default function StaffOverview({ doctors = [] }) {
  const rawRole = localStorage.getItem("role") || "";
  const role = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();

  return (
    <div className="table-widget">
      <div className="surface-card__header">
        <div>
          <span className="section__eyebrow">Medical Staff</span>
          <h2>Current Doctors</h2>
        </div>
        {role === "ADMIN" && (
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Link to="/add-doctor" className="text-link" style={{ fontWeight: 600 }}>
              + Add
            </Link>
            <Link to="/doctors" className="text-link">
              All →
            </Link>
          </div>
        )}
      </div>

      <div className="mini-list">
        {doctors.length === 0 ? (
          <div className="empty-state">
            <FaUserMd />
            <p>No physician profiles registered.</p>
          </div>
        ) : (
          doctors.slice(0, 4).map((doctor) => (
            <div key={doctor.id} className="mini-list__item">
              <div>
                <strong>{doctor.nom}</strong>
                <span>{doctor.specialite} {doctor.telephone ? `• Tel: ${doctor.telephone}` : ""}</span>
              </div>
              {role === "ADMIN" ? (
                <Link to={`/doctors/${doctor.id}`} className="action-link action-link--view">
                  View
                </Link>
              ) : (
                <span className="badge badge-default">Active</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
