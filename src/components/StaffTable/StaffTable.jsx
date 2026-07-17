import "./StaffTable.css";
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

                        <td>

                            <Link to={`/doctors/${doctor.id}`}>
                                <button className="view">
                                    View
                                </button>
                            </Link>

                            <Link to={`/edit-doctor/${doctor.id}`}>
                                <button className="edit">
                                    Edit
                                </button>
                            </Link>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}