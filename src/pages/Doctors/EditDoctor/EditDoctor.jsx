import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../../services/api";
import { handleApiError } from "../../../utils/errorHandler";
import { toast } from "react-toastify";
import { FaUserMd, FaEnvelope, FaPhone, FaStethoscope, FaArrowLeft, FaCheck } from "react-icons/fa";

export default function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const res = await api.get(`/api/medecins/${id}`);
        reset(res.data);
      } catch (error) {
        handleApiError(error);
      }
    };

    loadDoctor();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/api/medecins/${id}`, {
        nom: data.nom,
        email: data.email,
        specialite: data.specialite,
        telephone: Number(data.telephone),
      });
      toast.success("Physician details updated successfully!");
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
          <h1>Edit Physician Profile</h1>
          <p>Update credentials, contact information, and medical speciality.</p>
        </div>

        <Link to="/doctors" className="button button--secondary">
          <FaArrowLeft />
          Back to Directory
        </Link>
      </section>

      <section className="surface-card">
        <div className="surface-card__header">
          <div>
            <span className="section__eyebrow">Profile Details</span>
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
                  placeholder="Doctor Name"
                  {...register("nom", { required: true })}
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="specialite">Clinical Speciality *</label>
              <div className="input-shell">
                <FaStethoscope />
                <select id="specialite" {...register("specialite", { required: true })}>
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
            </div>

            <div className="field-group">
              <label htmlFor="email">Email Address *</label>
              <div className="input-shell">
                <FaEnvelope />
                <input
                  id="email"
                  type="email"
                  placeholder="doctor@healthcare.com"
                  {...register("email", { required: true })}
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
