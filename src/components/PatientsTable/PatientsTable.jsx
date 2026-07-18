import "./PatientsTable.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function PatientsTable() {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = async () => {
        try {
            const response = await api.get("/api/patients");

            setPatients(response.data.content);

        } catch (error) {
            console.error(error);
        }
    };

    const deletePatient = async (id) => {

        if (!window.confirm("Delete this patient ?"))
            return;

        try {

            await api.delete(`/api/patients/${id}`);

            getPatients();

        } catch (err) {
            console.log(err.response?.data || err);
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

                {patients.map((patient) => (

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

                ))}

                </tbody>

            </table>

            <div className="footer">
                <p>
                    Showing {patients.length} patients
                </p>
            </div>

        </div>
    );
}