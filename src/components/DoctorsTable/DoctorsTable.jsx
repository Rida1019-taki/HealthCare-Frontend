import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { handleApiError } from "../../utils/errorHandler";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export default function StaffTable({ speciality }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getDoctors = async () => {
      try {
        let response;

        if (speciality.trim() !== "") {
          response = await api.get(`/api/medecins/search?specialite=${speciality}`);
        } else {
          response = await api.get("/api/medecins");
        }

        setDoctors(response.data.content || []);
      } catch (error) {
        toast.error("Impossible de charger les médecins.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, [speciality]);

  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await api.delete(`/api/medecins/${id}`);
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
      toast.success("Doctor deleted successfully");
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
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Speciality</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">
                    <p>No doctors found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>
                    <strong>{doctor.nom}</strong>
                  </td>
                  <td>{doctor.specialite}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.telephone}</td>
                  <td>
                    <div className="row-actions">
                      <Link to={`/doctors/${doctor.id}`} className="action-link action-link--view">
                        <FaEye />
                        View
                      </Link>
                      <Link to={`/doctors/edit/${doctor.id}`} className="action-link action-link--edit">
                        <FaEdit />
                        Edit
                      </Link>
                      <button className="action-link action-link--danger" onClick={() => deleteDoctor(doctor.id)}>
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
