import "./DoctorsTable.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import {handleApiError} from "../../utils/errorHandler";

export default function StaffTable({ speciality }) {

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = async () => {

        try {

            const response = await api.get("/api/medecins");
            console.log(response.data.content);
            setDoctors(response.data.content || []);

        } catch (error) {

            toast.error("Impossible de charger les médecins.");
            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const deleteDoctor = async (id) => {

        if (!window.confirm("Delete this doctor ?")) return;

        try {

            await api.delete(`/api/medecins/${id}`);

            setDoctors((prev) =>
                prev.filter((doctor) => doctor.id !== id)
            );

            toast.success("Doctor deleted successfully");

        } catch (error) {

            handleApiError(error);

        }

    };

    const filteredDoctors =
        speciality === ""
            ? doctors
            : doctors.filter(
                (doctor) =>
                    doctor.specialite &&
                    doctor.specialite
                        .toLowerCase()
                        .includes(speciality.toLowerCase())
            );

    if (loading) {
        return (
            <div className="table-container">
                <p className="empty-message">Loading doctors...</p>
            </div>
        );
    }

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

                {filteredDoctors.length === 0 ? (

                    <tr>
                        <td colSpan="5" className="empty-message">
                            Aucun médecin trouvé.
                        </td>
                    </tr>

                ) : (

                    filteredDoctors.map((doctor) => (

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

                    ))

                )}

                </tbody>

            </table>

        </div>
    );
}