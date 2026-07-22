import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./AddAppointment.css";
import {FaCalendarAlt} from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddAppointment() {


    const navigate = useNavigate();

    const onSubmit = async (data) => {

        const appointment = {
            patientId: Number(data.patientId),
            medecinId: Number(data.medecinId),
            dateRendezVous: data.dateHeure.split("T")[0],
            statut: data.statut,
        };

        try{
            await api.post("/api/rendezvous", appointment);
            navigate("/appointments");
        }catch(err){
            console.log(err.response?.data);
        }
    };

    const schema = yup.object({
        patientId: yup
            .number()
            .typeError("Patient ID must be a number.")
            .required("Patient ID is required.")
            .positive("Patient ID must be greater than 0.")
            .integer("Patient ID must be an integer."),

        medecinId: yup
            .number()
            .typeError("Doctor ID must be a number.")
            .required("Doctor ID is required.")
            .positive("Doctor ID must be greater than 0.")
            .integer("Doctor ID must be an integer."),

        dateHeure: yup
            .string()
            .required("Appointment date and time are required."),

        statut: yup
            .string()
            .required("Please select an appointment status.")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return(
        <div className="add-appointment-page">
            <div className="add-appointment-card">

                <div className="logo">
                    <FaCalendarAlt />
                </div>

                <h2>Add Appointment</h2>

                <p className="subtitle">
                    Schedule a new appointment.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label>Patient ID</label>
                    <input
                        type="number"
                        {...register("patientId")}
                    />
                    <p className="error">{errors.patientId?.message}</p>
                    <label>Doctor ID</label>
                    <input
                        type="number"
                        {...register("medecinId")}
                    />
                    <p className="error">{errors.medecinId?.message}</p>
                    <label>Date & Time</label>
                    <input
                        type="datetime-local"
                        {...register("dateHeure")}
                    />
                    <p className="error">{errors.dateHeure?.message}</p>
                    <label>Status</label>
                    <select {...register("statut")}>
                        <option value="EN_ATTENTE">EN_ATTENTE</option>
                        <option value="CONFIRME">CONFIRME</option>
                        <option value="ANNULE">ANNULE</option>
                    </select>
                    <p className="error">{errors.statut?.message}</p>
                    <div className="actions">
                        <button className="save-btn" type="submit">
                            Save Appointment
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/appointments")}
                        >
                            Cancel
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
}