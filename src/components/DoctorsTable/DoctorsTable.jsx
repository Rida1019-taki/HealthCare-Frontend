import "./DoctorsTable.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function StaffTable() {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = async () => {
        try {

            const response = await api.get("/api/medecins");

            setDoctors(response.data.content);


        } catch (error) {
            console.error(error);
        }
    };

    const deleteDoctor = async (id) => {

        if (!window.confirm("Delete this doctor ?")) return;

        try {

            await api.delete(`/api/medecins/${id}`);

            setDoctors(prev =>
                prev.filter(doctor => doctor.id !== id)
            );

        } catch (err) {
            console.log(err.response?.data || err);
        }
    };

    return (
        <div className="table-container">

            <table>

                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Spécialité</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>

                {doctors.map((doctor) => (

                    <tr key={doctor.id}>

                        <td>{doctor.nom}</td>

                        <td>{doctor.specialite}</td>

                        <td>{doctor.email}</td>

                        <td>{doctor.telephone}</td>

                        <td className="actions">

                            <Link
                                to={`/doctors/${doctor.id}`}
                                className="view-btn"
                            >
                                View
                            </Link>

                            <Link
                                to={`/doctors/edit/${doctor.id}`}
                                className="edit-btn"
                            >
                                Edit
                            </Link>

                            <button
                                className="delete-btn"
                                onClick={() => deleteDoctor(doctor.id)}
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