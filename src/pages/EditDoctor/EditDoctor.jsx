import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./EditDoctor.css";

export default function EditDoctor() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        loadDoctor();
    }, []);

    const loadDoctor = async () => {
        const res = await api.get(`/api/medecins/${id}`);
        reset(res.data);
    };

    const onSubmit = async (data) => {

        await api.put(`/api/medecins/${id}`, data);

        navigate("/doctors");
    };

    return (
        <div className="edit-record-page">

            <div className="edit-record-card">

                <h2>Edit Doctor</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label>Name</label>

                    <div className="input-box">
                        <input {...register("nom")} />
                    </div>

                    <label>Email</label>

                    <div className="input-box">
                        <input {...register("email")} />
                    </div>

                    <label>Phone</label>

                    <div className="input-box">
                        <input {...register("telephone")} />
                    </div>

                    <label>Speciality</label>

                    <div className="input-box">
                        <input {...register("specialite")} />
                    </div>

                    <div className="actions">

                        <button className="save-btn">
                            Save
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/doctors")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}