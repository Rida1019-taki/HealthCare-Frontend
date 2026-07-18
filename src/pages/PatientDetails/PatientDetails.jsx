import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import api from "../../services/api";
import "./PatientDetails.css";

function PatientDetails() {

    const { id } = useParams();

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        getPatient();
    }, []);

    const getPatient = async () => {
        try {
            const res = await api.get(`/api/patients/${id}`);
            setPatient(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    if (!patient) return <h2>Loading...</h2>;

    return (
        <div className="patient-details">

            <div className="patient-card">

                <h2>Patient Profile</h2>

                <div className="patient-info">
                    <span>Nom</span>
                    <span>{patient.nom}</span>
                </div>

                <div className="patient-info">
                    <span>Prénom</span>
                    <span>{patient.prenom}</span>
                </div>

                <div className="patient-info">
                    <span>Téléphone</span>
                    <span>{patient.telephone}</span>
                </div>

                <div className="patient-info">
                    <span>Date de naissance</span>
                    <span>{patient.dateNaissance}</span>
                </div>

                <div className="patient-actions">

                    <Link to={`/patients/edit/${patient.id}`}>
                        <button className="edit-btn">
                            Modifier
                        </button>
                    </Link>

                    <Link to="/patients">
                        <button className="back-btn">
                            Retour
                        </button>
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default PatientDetails;