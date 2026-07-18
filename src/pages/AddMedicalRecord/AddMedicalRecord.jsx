import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaFileMedical, FaUser, FaNotesMedical, FaClipboard } from "react-icons/fa";
import api from "../../services/api";
import "./AddMedicalRecord.css";

export default function AddMedicalRecord() {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {

            const record = {
                patientId: Number(data.patientId),
                diagnostic: data.diagnostic,
                observation: data.observation,
                dateCreation: new Date().toISOString().split("T")[0],
            };

            console.log(record);

            await api.post("/api/dossiers", record);

            navigate("/medical-records");

        } catch (err) {
            console.log(err.response?.data);
        }
    };

    return (
        <div className="record-page">

            <div className="record-card">

                <div className="logo">
                    <FaFileMedical />
                </div>

                <h2>Add Medical Record</h2>

                <p className="subtitle">
                    Create a new medical record.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label>Patient ID</label>

                    <div className="input-box">
                        <FaUser />
                        <input
                            type="number"
                            {...register("patientId")}
                            placeholder="Patient ID"
                        />
                    </div>

                    <label>Diagnostic</label>

                    <div className="input-box">
                        <FaNotesMedical />
                        <input
                            {...register("diagnostic")}
                            placeholder="Diagnostic"
                        />
                    </div>

                    <label>Observation</label>

                    <div className="input-box">
                        <FaClipboard />
                        <textarea
                            {...register("observation")}
                            placeholder="Observation"
                        />
                    </div>

                    <div className="actions">

                        <button type="submit" className="save-btn">
                            Save Record
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/medical-records")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}