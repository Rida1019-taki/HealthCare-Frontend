import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./EditMedicalRecord.css";

export default function EditMedicalRecord(){

    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        loadRecord();
    }, []);

    const loadRecord = async () => {
        const res = await api.get(`/api/dossiers/${id}`);
        reset(res.data);
    };

    const onSubmit = async(data) => {

        await api.put(`/api/dossiers/${id}/diagnostic`,{
            diagnostic:data.diagnostic
        });

        await api.put(`/api/dossiers/${id}/observation`,{
            observation:data.observation
        });

        navigate("/medical-records");
    };

    return (
        <div className="edit-record-page">

            <div className="edit-record-card">

                <h2>Edit Medical Record</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label>Diagnostic</label>
                    <div className="input-box">
                        <input
                            {...register("diagnostic")}
                            placeholder="Diagnostic"
                        />
                    </div>

                    <label>Observation</label>
                    <div className="input-box">
                    <textarea
                        {...register("observation")}
                        placeholder="Observation"
                    />
                    </div>

                    <div className="actions">

                        <button type="submit" className="save-btn">
                            Save
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