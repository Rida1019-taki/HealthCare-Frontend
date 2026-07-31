import "./PatientsTable.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {handleApiError} from "../../utils/errorHandler";

export default function PatientsTable({ search, sortOrder }) {

    const [patients, setPatients] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setPage(0);
    }, [search]);

    useEffect(() => {
        getPatients();
    }, [page, search]);

    const getPatients = async () => {
        try {

            let response;

            if (search.trim() !== "") {
                response = await api.get(
                    `/api/patients/search?nom=${search}&page=${page}&size=10`
                );
            } else {
                response = await api.get(
                    `/api/patients?page=${page}&size=10`
                );
            }

            let data = [...response.data.content];

            data.sort((a, b) => {
                if (sortOrder === "asc") {
                    return a.nom.localeCompare(b.nom);
                }
                return b.nom.localeCompare(a.nom);
            });

            setPatients(data);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            toast.error("Impossible de charger les patients.");
            console.error(error);
        }
    };

    const deletePatient = async (id) => {

        if (!window.confirm("Delete this patient ?")) return;

        try {

            await api.delete(`/api/patients/${id}`);

            toast.success("Patient deleted successfully");

            getPatients();

        } catch (err) {

            handleApiError(err);

        }

    };

    return (
        <div className="table-container">

            <table>

                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Birth Date</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>

                {patients.length === 0 ? (

                    <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                            Aucun patient trouvé.
                        </td>
                    </tr>

                ) : (

                    patients.map((patient) => (

                        <tr key={patient.id}>

                            <td>{patient.id}</td>
                            <td>{patient.prenom}</td>
                            <td>{patient.nom}</td>
                            <td>{patient.telephone}</td>
                            <td>{patient.dateNaissance}</td>

                            <td className="actions">

                                <Link
                                    to={`/patients/${patient.id}`}
                                    className="view-btn"
                                >
                                    View
                                </Link>

                                <Link
                                    to={`/patients/edit/${patient.id}`}
                                    className="edit-btn"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="delete-btn"
                                    onClick={() => deletePatient(patient.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                )}

                </tbody>

            </table>

            <div className="pagination">

                <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (

                    <button
                        key={index}
                        className={page === index ? "active-page" : ""}
                        onClick={() => setPage(index)}
                    >
                        {index + 1}
                    </button>

                ))}

                <button
                    disabled={page === totalPages - 1 || totalPages === 0}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>

            </div>

            <div className="footer">
                <p>
                    Showing {patients.length} patients
                </p>
            </div>

        </div>
    );
}