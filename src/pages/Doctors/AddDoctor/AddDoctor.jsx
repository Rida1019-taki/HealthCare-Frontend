import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../services/api";

import {
    FaUserMd,
    FaEnvelope,
    FaPhone,
    FaStethoscope,
} from "react-icons/fa";

import "./AddDoctor.css";

const schema = yup.object({
    nom: yup.string().required("Le nom est obligatoire"),

    specialite: yup.string().required("La spécialité est obligatoire"),

    email: yup
        .string()
        .email("Email invalide")
        .required("Email obligatoire"),

    telephone: yup
        .number()
        .typeError("Téléphone invalide")
        .required("Téléphone obligatoire"),
});

export default function AddDoctor() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/api/medecins", {
                nom: data.nom,
                specialite: data.specialite,
                email: data.email,
                telephone: Number(data.telephone),
            });

            console.log(response.data);

            reset();

            navigate("/doctors");
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <div className="add-patient-page">
            <div className="add-patient-card">

                <div className="logo">+</div>

                <h2>Ajouter un médecin</h2>

                <p className="subtitle">
                    Remplissez les informations du médecin.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label>Nom</label>

                    <div className="input-box">
                        <FaUserMd />

                        <input
                            type="text"
                            placeholder="Nom"
                            {...register("nom")}
                        />
                    </div>

                    <small>{errors.nom?.message}</small>

                    <label>Spécialité</label>

                    <div className="input-box">
                        <FaStethoscope />

                        <input
                            type="text"
                            placeholder="Cardiologie"
                            {...register("specialite")}
                        />
                    </div>

                    <small>{errors.specialite?.message}</small>

                    <label>Email</label>

                    <div className="input-box">
                        <FaEnvelope />

                        <input
                            type="email"
                            placeholder="doctor@gmail.com"
                            {...register("email")}
                        />
                    </div>

                    <small>{errors.email?.message}</small>

                    <label>Téléphone</label>

                    <div className="input-box">
                        <FaPhone />

                        <input
                            type="number"
                            placeholder="0600000000"
                            {...register("telephone")}
                        />
                    </div>

                    <small>{errors.telephone?.message}</small>

                    <button type="submit" className="add-btn">
                        Ajouter
                    </button>

                </form>
            </div>
        </div>
    );
}