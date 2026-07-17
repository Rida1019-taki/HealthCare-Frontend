import "./PatientsTable.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PatientsTable() {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = async () => {
        try {
            const response = await api.get("/api/patients");

            // Spring Boot Page<ResponsePatientDTO>
            setPatients(response.data.content);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="table-container">

            <table>

                <thead>

                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Téléphone</th>
                    <th>Date de naissance</th>
                    <th>Actions</th>
                </tr>

                </thead>

                <tbody>

                {patients.map((patient) => (

                    <tr key={patient.id}>

                        <td>{patient.nom}</td>

                        <td>{patient.prenom}</td>

                        <td>{patient.telephone}</td>

                        <td>{patient.dateNaissance}</td>

                        <td>
                            <button className="profile-btn">
                                View Profile
                            </button>

                            <button className="edit-btn">
                                Edit
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