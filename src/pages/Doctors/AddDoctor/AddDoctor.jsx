import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../services/api";
import {
  FaUserMd,
  FaEnvelope,
  FaPhone,
  FaStethoscope,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHandler";

const schema = yup.object({
  nom: yup.string().required("Doctor name is required"),
  specialite: yup.string().required("Speciality is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  telephone: yup
    .number()
    .typeError("Phone must be a valid number")
    .required("Phone number is required"),
});

export default function AddDoctor() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/api/medecins", {
        nom: data.nom.trim(),
        specialite: data.specialite.trim(),
        email: data.email.trim(),
        telephone: Number(data.telephone),
      });

      toast.success("Physician registered successfully!");
      reset();
      navigate("/doctors");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Medical Staff Directory</span>
          <h1>Register New Physician</h1>
          <p>Add a medical doctor, specialist, or practitioner to the clinic directory.</p>
        </div>

        <Link to="/doctors" className="button button--secondary">
          <FaArrowLeft />
          Back to Directory
        </Link>
      </section>

      <section className="surface-card">
        <div className="surface-card__header">
          <div>
            <span className="section__eyebrow">Physician Profile</span>
            <h2>Practitioner Information</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field-grid">
            <div className="field-group">
              <label htmlFor="nom">Full Name (Dr.) *</label>
              <div className="input-shell">
                <FaUserMd />
                <input
                  id="nom"
                  type="text"
                  placeholder="e.g. Dr. Alexandre Martin"
                  {...register("nom")}
                />
              </div>
              {errors.nom && <small className="field-error">{errors.nom.message}</small>}
            </div>

            <div className="field-group">
              <label htmlFor="specialite">Clinical Speciality *</label>
              <div className="input-shell">
                <FaStethoscope />
                <select id="specialite" {...register("specialite")}>
                  <option value="">Select Speciality</option>
                  <option value="Cardiologie">Cardiologie</option>
                  <option value="Dermatologie">Dermatologie</option>
                  <option value="Pediatrie">Pediatrie</option>
                  <option value="Gynecologie">Gynecologie</option>
                  <option value="Ophtalmologie">Ophtalmologie</option>
                  <option value="Neurologie">Neurologie</option>
                  <option value="Medecine Generale">Médecine Générale</option>
                </select>
              </div>
              {errors.specialite && <small className="field-error">{errors.specialite.message}</small>}
            </div>

            <div className="field-group">
              <label htmlFor="email">Email Address *</label>
              <div className="input-shell">
                <FaEnvelope />
                <input
                  id="email"
                  type="email"
                  placeholder="doctor@healthcare.com"
                  {...register("email")}
                />
              </div>
              {errors.email && <small className="field-error">{errors.email.message}</small>}
            </div>

            <div className="field-group">
              <label htmlFor="telephone">Phone Number *</label>
              <div className="input-shell">
                <FaPhone />
                <input
                  id="telephone"
                  type="number"
                  placeholder="e.g. 0612345678"
                  {...register("telephone")}
                />
              </div>
              {errors.telephone && <small className="field-error">{errors.telephone.message}</small>}
            </div>
          </div>

          <div className="actions">
            <button
              type="submit"
              className="button button--primary"
              disabled={isSubmitting}
            >
              <FaCheck />
              {isSubmitting ? "Registering Physician..." : "Register Physician"}
            </button>

            <button
              type="button"
              className="button button--secondary"
              onClick={() => navigate("/doctors")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}