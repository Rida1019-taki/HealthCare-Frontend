import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AddAppointment.css";
import {FaCalendarAlt} from "react-icons/fa";

export default function AddAppointment() {

    const { register, handleSubmit } = useForm();
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

                    <label>Doctor ID</label>
                    <input
                        type="number"
                        {...register("medecinId")}
                    />

                    <label>Date & Time</label>
                    <input
                        type="datetime-local"
                        {...register("dateHeure")}
                    />

                    <label>Status</label>
                    <select {...register("statut")}>
                        <option value="EN_ATTENTE">EN_ATTENTE</option>
                        <option value="CONFIRME">CONFIRME</option>
                        <option value="ANNULE">ANNULE</option>
                    </select>

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