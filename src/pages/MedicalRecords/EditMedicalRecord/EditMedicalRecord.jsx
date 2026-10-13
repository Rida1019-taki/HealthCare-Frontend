import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHandler";
import { FaNotesMedical, FaClipboard, FaArrowLeft, FaCheck } from "react-icons/fa";

export default function EditMedicalRecord() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const res = await api.get(`/api/dossiers/${id}`);
        reset(res.data);
      } catch (error) {
        handleApiError(error);
      }
    };

    loadRecord();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/api/dossiers/${id}/diagnostic`, {
        diagnostic: data.diagnostic,
      });

      await api.put(`/api/dossiers/${id}/observation`, {
        observation: data.observation,
      });

      toast.success("Medical dossier updated successfully!");
      navigate("/medical-records");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Electronic Health Records (EHR)</span>
          <h1>Edit Medical Record</h1>
          <p>Update diagnosis and clinical observation for dossier #{id}.</p>
        </div>

        <Link to="/medical-records" className="button button--secondary">
          <FaArrowLeft />
          Back to Records
        </Link>
      </section>

      <section className="surface-card">
        <div className="surface-card__header">
          <div>
            <span className="section__eyebrow">Clinical Update</span>
            <h2>Diagnostic & Observations</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field-group">
            <label htmlFor="diagnostic">Clinical Diagnosis *</label>
            <div className="input-shell">
              <FaNotesMedical />
              <input
                id="diagnostic"
                {...register("diagnostic", { required: true })}
                placeholder="Diagnostic"
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="observation">Clinical Observation *</label>
            <div className="input-shell">
              <FaClipboard style={{ alignSelf: "flex-start", marginTop: "0.25rem" }} />
              <textarea
                id="observation"
                {...register("observation", { required: true })}
                placeholder="Clinical observations and treatment updates..."
                rows={5}
              />
            </div>
          </div>

          <div className="actions">
            <button
              type="submit"
              className="button button--primary"
              disabled={isSubmitting}
            >
              <FaCheck />
              {isSubmitting ? "Saving..." : "Save Record"}
            </button>

            <button
              type="button"
              className="button button--secondary"
              onClick={() => navigate("/medical-records")}
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
