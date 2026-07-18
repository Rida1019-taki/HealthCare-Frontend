import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import "./ViewDoctor.css";

export default function ViewDoctor() {

    const { id } = useParams();
    const [doctor, setDoctor] = useState({});

    useEffect(() => {
        loadDoctor();
    }, []);

    const loadDoctor = async () => {
        const res = await api.get(`/api/medecins/${id}`);
        setDoctor(res.data);
    };

    return (
        <div className="record-details-page">

            <div className="record-details-card">

                <h2>Doctor Details</h2>

                <div className="info">
                    <span>Name</span>
                    <span>{doctor.nom}</span>
                </div>

                <div className="info">
                    <span>Email</span>
                    <span>{doctor.email}</span>
                </div>

                <div className="info">
                    <span>Phone</span>
                    <span>{doctor.telephone}</span>
                </div>

                <div className="info">
                    <span>Speciality</span>
                    <span>{doctor.specialite}</span>
                </div>

                <Link to="/doctors" className="back-btn">
                    Back
                </Link>

            </div>

        </div>
    );
}