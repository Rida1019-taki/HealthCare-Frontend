import { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/errorHandler";
import { FaEdit, FaEye, FaTrash, FaFilePdf } from "react-icons/fa";

export default function MedicalRecordsTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const rawRole = localStorage.getItem("role") || "";
  const role = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();

  const loadRecords = useCallback(async () => {
    setLoading(true);

    try {
      if (role === "PATIENT") {
        try {
          const res = await api.get("/api/dossiers/me");
          setRecords(res.data ? [res.data] : []);
        } catch (err) {
          if (err.response?.status === 404) {
            setRecords([]);
          } else {
            throw err;
          }
        }
      } else {
        const res = await api.get("/api/dossiers");
        setRecords(res.data.content || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to load medical records.");
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this medical record?")) return;

    try {
      await api.delete(`/api/dossiers/${id}`);
      setRecords((prev) => prev.filter((record) => record.id !== id));
      toast.success("Medical record deleted successfully.");
    } catch (err) {
      handleApiError(err);
    }
  };

  const downloadPdf = async (recordId, patientName) => {
    try {
      toast.info("Generating PDF...");
      const res = await api.get(`/api/dossiers/${recordId}/download`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `dossier_medical_${patientName || recordId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("PDF downloaded.");
    } catch (err) {
      handleApiError(err);
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
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Diagnosis</th>
              <th>Observation</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">
                    <p>No medical records found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id}>
                  <td>
                    <strong>
                      {record.patientPrenom} {record.patientNom}
                    </strong>
                  </td>
                  <td>{record.diagnostic}</td>
                  <td>{record.observation}</td>
                  <td>{record.dateCreation}</td>
                  <td>
                    <div className="row-actions">
                      <Link to={`/medical-records/${record.id}`} className="action-link action-link--view">
                        <FaEye />
                        View
                      </Link>

                      <button
                        className="action-link"
                        title="Download PDF"
                        onClick={() =>
                          downloadPdf(record.id, `${record.patientNom}_${record.patientPrenom}`)
                        }
                      >
                        <FaFilePdf />
                        PDF
                      </button>

                      {role !== "PATIENT" && (
                        <>
                          <Link to={`/medical-records/edit/${record.id}`} className="action-link action-link--edit">
                            <FaEdit />
                            Edit
                          </Link>
                          <button className="action-link action-link--danger" onClick={() => deleteRecord(record.id)}>
                            <FaTrash />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
