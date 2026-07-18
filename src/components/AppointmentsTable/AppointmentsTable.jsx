import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AppointmentsTable.css";
import { useNavigate } from "react-router-dom";

export default function AppointmentsTable() {

    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            const response = await api.get("/api/rendezvous");
            setAppointments(response.data.content);
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const deleteAppointment = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this appointment?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/api/rendezvous/${id}`);

            loadAppointments();

        } catch (error) {
            console.error(error.response?.data || error);
            alert("Unable to delete appointment.");
        }
    };

    return (
        <div className="table-container">

            <table>

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

                {appointments.map((rdv) => (

                    <tr key={rdv.id}>

                        <td>{rdv.id}</td>

                        <td>
                            {rdv.patientNom} {rdv.patientPrenom}
                        </td>

                        <td>{rdv.medecinNom}</td>

                        <td>{rdv.dateRendezVous}</td>

                        <td>
                                <span className={`status ${rdv.statut.toLowerCase()}`}>
                                    {rdv.statut}
                                </span>
                        </td>

                        <td className="actions">

                            <button
                                className="view-btn"
                                onClick={() => navigate(`/medical-records/${rdv.id}`)}
                            >
                                View
                            </button>

                            <button
                                className="edit-btn"
                                onClick={() => navigate(`/medical-records/edit/${rdv.id}`)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => deleteAppointment(rdv.id)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}