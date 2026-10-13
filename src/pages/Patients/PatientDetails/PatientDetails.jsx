import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { FaArrowLeft, FaEdit, FaFilePdf } from "react-icons/fa";
import { handleApiError } from "../../../utils/errorHandler";

function PatientDetails() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatient = async () => {
      try {
        const res = await api.get(`/api/patients/${id}`);
        setPatient(res.data);
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    getPatient();
  }, [id]);

  const downloadReport = async () => {
    try {
      toast.info("Generating PDF clinical report...");
      const res = await api.get(`/api/patients/${id}/report`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `clinical_report_patient_${patient?.nom || id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Clinical report downloaded successfully.");
    } catch (err) {
      handleApiError(err);
    }
  };

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

  if (!patient) {
    return (
      <div className="page-stack">
        <div className="surface-card empty-state">
          <h2>Patient record not found.</h2>
          <p>The requested patient does not exist or has been removed.</p>
          <Link to="/patients" className="button button--secondary" style={{ marginTop: "1rem" }}>
            <FaArrowLeft />
            Return to Patients Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Electronic Health Record (EHR)</span>
          <h1>{patient.prenom} {patient.nom}</h1>
          <p>Patient ID: #{patient.id} • Clinical Dossier File</p>
        </div>

        <div className="page-hero__actions">
          <button type="button" className="button button--primary" onClick={downloadReport}>
            <FaFilePdf />
            Download PDF Report
          </button>

          <Link to={`/patients/edit/${patient.id}`} className="button button--secondary">
            <FaEdit />
            Edit Profile
          </Link>

          <Link to="/patients" className="button button--secondary">
            <FaArrowLeft />
            Directory
          </Link>
        </div>
      </section>

      <section className="surface-card">
        <div className="surface-card__header">
          <div>
            <span className="section__eyebrow">Demographics</span>
            <h2>Patient Demographics & Contact Information</h2>
          </div>
        </div>

        <div className="profile-grid">
          <div className="info-card">
            <span>First Name</span>
            <strong>{patient.prenom || "-"}</strong>
          </div>

          <div className="info-card">
            <span>Last Name</span>
            <strong>{patient.nom || "-"}</strong>
          </div>

          <div className="info-card">
            <span>Phone Number</span>
            <strong>{patient.telephone ? String(patient.telephone) : "-"}</strong>
          </div>

          <div className="info-card">
            <span>Email</span>
            <strong>{patient.email || "Not recorded"}</strong>
          </div>

          <div className="info-card">
            <span>Date of Birth</span>
            <strong>{patient.dateNaissance || "-"}</strong>
          </div>

          <div className="info-card">
            <span>Registration Record</span>
            <strong className="badge badge-confirme">Active File</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PatientDetails;
