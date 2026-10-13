import { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/errorHandler";
import { FaCheck, FaTimes, FaTrash, FaFilePdf, FaEye } from "react-icons/fa";

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const rawRole = localStorage.getItem("role") || "";
  const role = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      if (role === "PATIENT") {
        response = await api.get("/api/rendezvous/me");
      } else if (statusFilter !== "ALL") {
        response = await api.get(`/api/rendezvous/statut/${statusFilter}`);
      } else {
        response = await api.get("/api/rendezvous");
      }
      setAppointments(response.data.content || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load appointments.");
    } finally {
      setLoading(false);
    }
  }, [role, statusFilter]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await api.put(`/api/rendezvous/${id}/annuler`);
      toast.success("Appointment cancelled successfully.");
      loadAppointments();
    } catch (error) {
      handleApiError(error);
    }
  };

  const confirmAppointment = async (rdv) => {
    try {
      await api.put(`/api/rendezvous/${rdv.id}`, {
        dateRendezVous: rdv.dateRendezVous,
        statut: "CONFIRME",
      });
      toast.success("Appointment confirmed.");
      loadAppointments();
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this appointment?")) return;

    try {
      await api.delete(`/api/rendezvous/${id}`);
      toast.success("Appointment deleted successfully.");
      loadAppointments();
    } catch (error) {
      handleApiError(error);
    }
  };

  const downloadPatientAppointmentsPdf = async (patientId, patientName) => {
    if (!patientId) {
      toast.error("Patient ID not found.");
      return;
    }

    try {
      toast.info("Generating PDF...");
      const response = await api.get(`/api/rendezvous/patient/${patientId}/download`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `appointments_patient_${patientName || patientId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("PDF downloaded.");
    } catch (error) {
      handleApiError(error);
    }
  };

  if (loading) {
    return (
      <div className="table-state">
        <div className="skeleton-table">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
        </div>
      </div>
    );
  }

  return (
    <div className="table-shell">
      {role !== "PATIENT" && (
        <div className="toolbar" style={{ marginBottom: "1rem" }}>
          <select
            className="toolbar-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="EN_ATTENTE">Pending (EN_ATTENTE)</option>
            <option value="CONFIRME">Confirmed (CONFIRME)</option>
            <option value="ANNULE">Cancelled (ANNULE)</option>
            <option value="TERMINE">Completed (TERMINE)</option>
          </select>
        </div>
      )}

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    <p>No appointments available.</p>
                  </div>
                </td>
              </tr>
            ) : (
              appointments.map((rdv) => (
                <tr key={rdv.id}>
                  <td>
                    <span className="id-badge">{rdv.id}</span>
                  </td>
                  <td>
                    <strong>
                      {rdv.patientNom} {rdv.patientPrenom}
                    </strong>
                  </td>
                  <td>Dr. {rdv.medecinNom}</td>
                  <td>{rdv.dateRendezVous}</td>
                  <td>
                    <span className={`badge badge-${String(rdv.statut || "").toLowerCase()}`}>
                      {rdv.statut}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="action-link action-link--view"
                        title="View Details"
                        onClick={() => setSelectedAppointment(rdv)}
                      >
                        <FaEye />
                        Details
                      </button>

                      {rdv.statut === "EN_ATTENTE" && (role === "ADMIN" || role === "MEDECIN") && (
                        <button
                          className="action-link action-link--edit"
                          title="Confirm Appointment"
                          onClick={() => confirmAppointment(rdv)}
                        >
                          <FaCheck />
                          Confirm
                        </button>
                      )}

                      {rdv.statut !== "ANNULE" && (
                        <button
                          className="action-link action-link--danger"
                          title="Cancel Appointment"
                          onClick={() => cancelAppointment(rdv.id)}
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      )}

                      {rdv.patientId && (
                        <button
                          className="action-link"
                          title="Download Patient Schedule PDF"
                          onClick={() =>
                            downloadPatientAppointmentsPdf(
                              rdv.patientId,
                              `${rdv.patientNom}_${rdv.patientPrenom}`
                            )
                          }
                        >
                          <FaFilePdf />
                          PDF
                        </button>
                      )}

                      {(role === "ADMIN" || role === "MEDECIN") && (
                        <button
                          className="action-link action-link--danger"
                          title="Delete Permanently"
                          onClick={() => deleteAppointment(rdv.id)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedAppointment && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1rem",
          }}
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            className="surface-card"
            style={{ maxWidth: 520, width: "100%", padding: "1.75rem", boxShadow: "var(--shadow-modal)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="surface-card__header">
              <div>
                <span className="section__eyebrow">Consultation Details</span>
                <h2>Appointment #{selectedAppointment.id}</h2>
              </div>
              <span className={`badge badge-${String(selectedAppointment.statut || "").toLowerCase()}`}>
                {selectedAppointment.statut}
              </span>
            </div>

            <div className="profile-grid" style={{ gridTemplateColumns: "1fr", gap: "0.5rem" }}>
              <div className="info-card">
                <span>Patient</span>
                <strong>
                  {selectedAppointment.patientNom} {selectedAppointment.patientPrenom} (ID #{selectedAppointment.patientId})
                </strong>
              </div>

              <div className="info-card">
                <span>Attending Physician</span>
                <strong>Dr. {selectedAppointment.medecinNom} (ID #{selectedAppointment.medecinId})</strong>
              </div>

              <div className="info-card">
                <span>Consultation Date & Time</span>
                <strong>{selectedAppointment.dateRendezVous || "Not scheduled"}</strong>
              </div>
            </div>

            <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setSelectedAppointment(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
