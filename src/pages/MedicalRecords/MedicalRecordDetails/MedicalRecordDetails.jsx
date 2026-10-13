import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHandler";
import { FaFilePdf, FaArrowLeft, FaEdit } from "react-icons/fa";

export default function MedicalRecordDetails() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const rawRole = localStorage.getItem("role") || "";
  const role = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const res = await api.get(`/api/dossiers/${id}`);
        setRecord(res.data);
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecord();
  }, [id]);

  const downloadPdf = async () => {
    try {
      toast.info("Generating PDF dossier report...");
      const res = await api.get(`/api/dossiers/${id}/download`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `dossier_medical_${record?.patientNom || id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Medical dossier PDF downloaded successfully!");
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

  if (!record) {
    return (
      <div className="page-stack">
        <div className="surface-card empty-state">
          <h2>Medical record not found</h2>
          <p>The requested clinical dossier does not exist or has been removed.</p>
          <Link to="/medical-records" className="button button--secondary" style={{ marginTop: "1rem" }}>
            <FaArrowLeft />
            Return to Medical Records
          </Link>
        </div>
      </div>
    );
  }

  const patientDisplayName = record.patientNom
    ? `${record.patientNom} ${record.patientPrenom || ""}`
    : `Patient #${record.patientId}`;

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Electronic Health Record (EHR)</span>
          <h1>Dossier #{record.id} — {patientDisplayName}</h1>
          <p>Created on {record.dateCreation || "N/A"} • Patient Reference #{record.patientId}</p>
        </div>

        <div className="page-hero__actions">
          <button type="button" className="button button--primary" onClick={downloadPdf}>
            <FaFilePdf />
            Download PDF Report
          </button>

          {role !== "PATIENT" && (
            <Link to={`/medical-records/edit/${record.id}`} className="button button--secondary">
              <FaEdit />
              Edit Record
            </Link>
          )}

          <Link to="/medical-records" className="button button--secondary">
            <FaArrowLeft />
            Back to Records
          </Link>
        </div>
      </section>

      <section className="surface-card">
        <div className="surface-card__header">
          <div>
            <span className="section__eyebrow">Clinical File</span>
            <h2>Diagnostic & Observations</h2>
          </div>
        </div>

        <div className="profile-grid">
          <div className="info-card">
            <span>Patient</span>
            <strong>{patientDisplayName}</strong>
          </div>

          <div className="info-card">
            <span>Patient ID</span>
            <strong>#{record.patientId}</strong>
          </div>

          <div className="info-card" style={{ gridColumn: "1 / -1" }}>
            <span>Clinical Diagnosis</span>
            <strong style={{ fontSize: "1.1rem", color: "var(--primary-navy)" }}>{record.diagnostic}</strong>
          </div>

          <div className="info-card" style={{ gridColumn: "1 / -1" }}>
            <span>Clinical Observations & Treatment Plan</span>
            <p style={{ marginTop: "0.5rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              {record.observation}
            </p>
          </div>

          <div className="info-card">
            <span>Date Created</span>
            <strong>{record.dateCreation || "-"}</strong>
          </div>

          <div className="info-card">
            <span>Confidentiality Classification</span>
            <strong className="badge badge-confirme">Protected Clinical Data</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
