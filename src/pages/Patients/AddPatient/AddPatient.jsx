import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../services/api";

import {
    FaUser,
    FaPhone,
    FaCalendarAlt,
} from "react-icons/fa";

import "./AddPatient.css";

const schema = yup.object({
    nom: yup
        .string()
        .required("Le nom est obligatoire"),

    prenom: yup
        .string()
        .required("Le prénom est obligatoire"),

    telephone: yup
        .number()
        .typeError("Le téléphone doit être un nombre")
        .required("Le téléphone est obligatoire"),

    dateNaissance: yup
        .date()
        .required("La date de naissance est obligatoire"),
});

function AddPatient() {

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

            const response = await api.post("/api/patients", {
                nom: data.nom,
                prenom: data.prenom,
                telephone: Number(data.telephone),
                dateNaissance: data.dateNaissance,
            });

            console.log(response.data);

            reset();

            navigate("/patients");

        } catch (error) {

            console.error(error.response?.data || error);

        }
    };

    return (
        <div className="add-patient-page">

            <div className="add-patient-card">

                <div className="logo">+</div>

                <h2>Ajouter un patient</h2>

                <p className="subtitle">
                    Remplissez les informations du patient.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label>Nom</label>

                    <div className="input-box">
                        <FaUser />

                        <input
                            type="text"
                            placeholder="Nom"
                            {...register("nom")}
                        />
                    </div>

                    <small>{errors.nom?.message}</small>

                    <label>Prénom</label>

                    <div className="input-box">
                        <FaUser />

                        <input
                            type="text"
                            placeholder="Prénom"
                            {...register("prenom")}
                        />
                    </div>

                    <small>{errors.prenom?.message}</small>

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

                    <label>Date de naissance</label>

                    <div className="input-box">
                        <FaCalendarAlt />

                        <input
                            type="date"
                            {...register("dateNaissance")}
                        />
                    </div>

                    <small>{errors.dateNaissance?.message}</small>

                    <button
                        type="submit"
                        className="add-btn"
                    >
                        Ajouter
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddPatient;