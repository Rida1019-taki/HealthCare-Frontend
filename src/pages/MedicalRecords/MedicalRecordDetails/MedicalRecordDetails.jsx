import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import api from "../../../services/api";
import "./MedicalRecordDetails.css";

export default function MedicalRecordDetails() {

    const { id } = useParams();
    const [record, setRecord] = useState(null);

    useEffect(() => {
        loadRecord();
    }, []);

    const loadRecord = async () => {
        const res = await api.get(`/api/dossiers/${id}`);
        setRecord(res.data);
    };

    if (!record) return <h2>Loading...</h2>;

    return (
        <div className="record-details-page">
            <div className="record-details-card">

                <h2>Medical Record</h2>

                <div className="info">
                    <span>Patient ID</span>
                    <span>{record.patientId}</span>
                </div>

                <div className="info">
                    <span>Diagnostic</span>
                    <span>{record.diagnostic}</span>
                </div>

                <div className="info">
                    <span>Observation</span>
                    <span>{record.observation}</span>
                </div>

                <div className="info">
                    <span>Date</span>
                    <span>{record.dateCreation}</span>
                </div>

                <div className="actions">
                    <Link
                        to="/medical-records"
                        className="back-btn"
                    >
                        Back
                    </Link>
                </div>

            </div>
        </div>
    );
}