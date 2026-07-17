import { useEffect, useState } from "react";
import api from "../../services/api";

import "./AppointmentsTable.css";

export default function AppointmentsTable() {

    const [appointments, setAppointments] = useState([]);

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

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}