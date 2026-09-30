import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);

    try {
      const response = await api.get("/api/rendezvous");
      setAppointments(response.data.content || []);
    } catch (error) {
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/rendezvous/${id}`);
      loadAppointments();
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Unable to delete appointment.");
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
                  <td>{rdv.id}</td>
                  <td>
                    {rdv.patientNom} {rdv.patientPrenom}
                  </td>
                  <td>{rdv.medecinNom}</td>
                  <td>{rdv.dateRendezVous}</td>
                  <td>
                    <span className={`badge badge-${rdv.statut?.toLowerCase() || "default"}`}>{rdv.statut}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="action-link action-link--view" onClick={() => navigate(`/medical-records/${rdv.id}`)}>
                        <FaEye />
                        View
                      </button>
                      <button className="action-link action-link--edit" onClick={() => navigate(`/medical-records/edit/${rdv.id}`)}>
                        <FaEdit />
                        Edit
                      </button>
                      <button className="action-link action-link--danger" onClick={() => deleteAppointment(rdv.id)}>
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
