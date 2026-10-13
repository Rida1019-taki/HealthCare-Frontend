import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../services/api";
import { FaUser, FaPhone, FaCalendarAlt, FaArrowLeft, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHandler";

const schema = yup.object({
  nom: yup.string().required("Last name is required"),
  prenom: yup.string().required("First name is required"),
  telephone: yup
    .number()
    .typeError("Phone must be a valid number")
    .required("Phone number is required"),
  dateNaissance: yup
    .string()
    .required("Date of birth is required"),
});

function AddPatient() {
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
      const birthDate = data.dateNaissance instanceof Date
        ? data.dateNaissance.toISOString().split("T")[0]
        : String(data.dateNaissance || "").split("T")[0];

      await api.post("/api/patients", {
        nom: data.nom.trim(),
        prenom: data.prenom.trim(),
        telephone: Number(data.telephone),
        dateNaissance: birthDate,
      });
      toast.success("Patient registered successfully!");
      reset();
      navigate("/patients");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Patient Management</span>
          <h1>Register New Patient</h1>
          <p>Create a medical profile and clinical dossier entry for a new patient.</p>
        </div>

        <Link to="/patients" className="button button--secondary">
          <FaArrowLeft />
          Back to Directory
        </Link>
      </section>

      <section className="surface-card">
        <div className="surface-card__header">
          <div>
            <span className="section__eyebrow">Demographics</span>
            <h2>Patient Information</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field-grid">
            <div className="field-group">
              <label htmlFor="nom">Last Name (Nom) *</label>
              <div className="input-shell">
                <FaUser />
                <input
                  id="nom"
                  type="text"
                  placeholder="e.g. Dupont"
                  {...register("nom")}
                />
              </div>
              {errors.nom && <small className="field-error">{errors.nom.message}</small>}
            </div>

            <div className="field-group">
              <label htmlFor="prenom">First Name (Prénom) *</label>
              <div className="input-shell">
                <FaUser />
                <input
                  id="prenom"
                  type="text"
                  placeholder="e.g. Jean"
                  {...register("prenom")}
                />
              </div>
              {errors.prenom && <small className="field-error">{errors.prenom.message}</small>}
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

            <div className="field-group">
              <label htmlFor="dateNaissance">Date of Birth *</label>
              <div className="input-shell">
                <FaCalendarAlt />
                <input
                  id="dateNaissance"
                  type="date"
                  {...register("dateNaissance")}
                />
              </div>
              {errors.dateNaissance && <small className="field-error">{errors.dateNaissance.message}</small>}
            </div>
          </div>

          <div className="actions">
            <button
              type="submit"
              className="button button--primary"
              disabled={isSubmitting}
            >
              <FaCheck />
              {isSubmitting ? "Registering Patient..." : "Register Patient"}
            </button>

            <button
              type="button"
              className="button button--secondary"
              onClick={() => navigate("/patients")}
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

export default AddPatient;