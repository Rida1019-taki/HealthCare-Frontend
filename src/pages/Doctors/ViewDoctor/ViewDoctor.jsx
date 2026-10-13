import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../services/api";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { handleApiError } from "../../../utils/errorHandler";

export default function ViewDoctor() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const res = await api.get(`/api/medecins/${id}`);
        setDoctor(res.data);
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="page-stack">
        <div className="surface-card">
          <div className="skeleton-table">
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
          </div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="page-stack">
        <div className="surface-card empty-state">
          <h2>Physician not found</h2>
          <p>The requested doctor record does not exist or has been removed.</p>
          <Link to="/doctors" className="button button--secondary" style={{ marginTop: "1rem" }}>
            <FaArrowLeft />
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Medical Staff Profile</span>
          <h1>{doctor.nom}</h1>
          <p>{doctor.specialite} • Practitioner ID #{doctor.id}</p>
        </div>

        <div className="page-hero__actions">
          <Link to={`/doctors/edit/${doctor.id}`} className="button button--primary">
            <FaEdit />
            Edit Profile
          </Link>

          <Link to="/doctors" className="button button--secondary">
            <FaArrowLeft />
            Back to Directory
          </Link>
        </div>
      </section>

      <section className="surface-card">
        <div className="surface-card__header">
          <div>
            <span className="section__eyebrow">Credentials</span>
            <h2>Physician Credentials & Contact Details</h2>
          </div>
        </div>

        <div className="profile-grid">
          <div className="info-card">
            <span>Practitioner Name</span>
            <strong>{doctor.nom}</strong>
          </div>

          <div className="info-card">
            <span>Medical Speciality</span>
            <strong>{doctor.specialite}</strong>
          </div>

          <div className="info-card">
            <span>Email Address</span>
            <strong>{doctor.email || "-"}</strong>
          </div>

          <div className="info-card">
            <span>Direct Phone</span>
            <strong>{doctor.telephone ? String(doctor.telephone) : "-"}</strong>
          </div>

          <div className="info-card">
            <span>Clinical Status</span>
            <strong className="badge badge-confirme">Active Physician</strong>
          </div>

          <div className="info-card">
            <span>Schedule Permissions</span>
            <strong>Consultation Scheduling Enabled</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
