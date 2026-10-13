import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaUser, FaPhone, FaCalendarAlt, FaArrowLeft, FaCheck } from "react-icons/fa";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHandler";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const res = await api.get(`/api/patients/${id}`);
        reset(res.data);
      } catch (err) {
        handleApiError(err);
      }
    };

    loadPatient();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/api/patients/${id}`, {
        nom: data.nom,
        prenom: data.prenom,
        telephone: Number(data.telephone),
        dateNaissance: data.dateNaissance,
      });
      toast.success("Patient updated successfully!");
      navigate("/patients");
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Patient Management</span>
          <h1>Edit Patient Profile</h1>
          <p>Update demographic and contact details for patient #{id}.</p>
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
            <h2>Patient Details</h2>
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
                  placeholder="Last Name"
                  {...register("nom", { required: true })}
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="prenom">First Name (Prénom) *</label>
              <div className="input-shell">
                <FaUser />
                <input
                  id="prenom"
                  type="text"
                  placeholder="First Name"
                  {...register("prenom", { required: true })}
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="telephone">Phone Number *</label>
              <div className="input-shell">
                <FaPhone />
                <input
                  id="telephone"
                  type="number"
                  placeholder="0612345678"
                  {...register("telephone", { required: true })}
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="dateNaissance">Date of Birth *</label>
              <div className="input-shell">
                <FaCalendarAlt />
                <input
                  id="dateNaissance"
                  type="date"
                  {...register("dateNaissance", { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="actions">
            <button
              type="submit"
              className="button button--primary"
              disabled={isSubmitting}
            >
              <FaCheck />
              {isSubmitting ? "Saving Changes..." : "Save Changes"}
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

export default EditPatient;
