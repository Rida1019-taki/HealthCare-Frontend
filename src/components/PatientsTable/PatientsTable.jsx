import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/errorHandler";
import { FaChevronLeft, FaChevronRight, FaEdit, FaEye, FaTrash } from "react-icons/fa";

export default function PatientsTable({ search, sortOrder }) {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const getPatients = useCallback(async () => {
    setLoading(true);

    try {
      let response;

      if (search.trim() !== "") {
        response = await api.get(`/api/patients/search?nom=${search}&page=${page}&size=10`);
      } else {
        response = await api.get(`/api/patients?page=${page}&size=10`);
      }

      const data = [...(response.data.content || [])].sort((a, b) =>
        sortOrder === "asc" ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom)
      );

      setPatients(data);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      toast.error("Impossible de charger les patients.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, search, sortOrder]);

  useEffect(() => {
    setPage(0);
  }, [search]);

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  const deletePatient = async (id) => {
    if (!window.confirm("Delete this patient?")) return;

    try {
      await api.delete(`/api/patients/${id}`);
      toast.success("Patient deleted successfully");
      getPatients();
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
              <th>ID</th>
              <th>Patient</th>
              <th>Phone</th>
              <th>Birth date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">
                    <p>No patients found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <span className="id-badge">{patient.id}</span>
                  </td>
                  <td>
                    <strong>
                      {patient.prenom} {patient.nom}
                    </strong>
                  </td>
                  <td>{patient.telephone}</td>
                  <td>{patient.dateNaissance}</td>
                  <td>
                    <div className="row-actions">
                      <Link to={`/patients/${patient.id}`} className="action-link action-link--view">
                        <FaEye />
                        View
                      </Link>
                      <Link to={`/patients/edit/${patient.id}`} className="action-link action-link--edit">
                        <FaEdit />
                        Edit
                      </Link>
                      <button className="action-link action-link--danger" onClick={() => deletePatient(patient.id)}>
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

      <div className="table-footer">
        <p>
          Page {page + 1} of {Math.max(totalPages, 1)}
        </p>

        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            <FaChevronLeft />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button key={index} className={page === index ? "active" : ""} onClick={() => setPage(index)}>
              {index + 1}
            </button>
          ))}
          <button disabled={page === totalPages - 1 || totalPages === 0} onClick={() => setPage(page + 1)}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
