import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaCalendarAlt } from "react-icons/fa";
import api from "../../services/api";
import "./EditPatient.css";

function EditPatient() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        loadPatient();
    }, []);

    const loadPatient = async () => {
        try {
            const res = await api.get(`/api/patients/${id}`);
            reset(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async (data) => {
        try {
            await api.put(`/api/patients/${id}`, data);
            navigate("/patients");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="edit-patient-page">
            <div className="edit-patient-card">

                <div className="logo">
                    <FaUser />
                </div>

                <h2>Modifier un patient</h2>

                <p className="subtitle">
                    Modifiez les informations du patient.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label>Nom</label>

                    <div className="input-box">
                        <FaUser />
                        <input
                            type="text"
                            {...register("nom")}
                            placeholder="Nom"
                        />
                    </div>

                    <label>Prénom</label>

                    <div className="input-box">
                        <FaUser />
                        <input
                            type="text"
                            {...register("prenom")}
                            placeholder="Prénom"
                        />
                    </div>

                    <label>Téléphone</label>

                    <div className="input-box">
                        <FaPhone />
                        <input
                            type="number"
                            {...register("telephone")}
                            placeholder="0600000000"
                        />
                    </div>

                    <label>Date de naissance</label>

                    <div className="input-box">
                        <FaCalendarAlt />
                        <input
                            type="date"
                            {...register("dateNaissance")}
                        />
                    </div>

                    <div className="actions">

                        <button
                            type="submit"
                            className="update-btn"
                        >
                            Modifier
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/patients")}
                        >
                            Annuler
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default EditPatient;