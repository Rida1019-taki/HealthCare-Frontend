import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export default function MedicalRecordsTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);

    try {
      const res = await api.get("/api/dossiers");
      setRecords(res.data.content || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this medical record?")) return;

    try {
      await api.delete(`/api/dossiers/${id}`);
      setRecords((prev) => prev.filter((record) => record.id !== id));
    } catch (err) {
      console.log(err.response?.data || err);
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
                      <Link to={`/medical-records/edit/${record.id}`} className="action-link action-link--edit">
                        <FaEdit />
                        Edit
                      </Link>
                      <button className="action-link action-link--danger" onClick={() => deleteRecord(record.id)}>
                        <FaTrash />
                        Delete
                      </button>
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
