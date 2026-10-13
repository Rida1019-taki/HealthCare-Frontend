import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaNotesMedical, FaClipboard, FaArrowLeft, FaCheck } from "react-icons/fa";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHandler";

export default function AddMedicalRecord() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.get("/api/patients");
        setPatients(res.data?.content || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPatients();
  }, []);

  const onSubmit = async (data) => {
    if (!data.patientId) {
      toast.error("Please select a patient.");
      return;
    }
    if (!data.diagnostic?.trim()) {
      toast.error("Diagnostic is required.");
      return;
    }
    if (!data.observation?.trim()) {
      toast.error("Observation is required.");
      return;
    }

    try {
      const record = {
        patientId: Number(data.patientId),
        diagnostic: data.diagnostic.trim(),
        observation: data.observation.trim(),
        dateCreation: new Date().toISOString().split("T")[0],
      };

      await api.post("/api/dossiers", record);
      toast.success("Electronic medical record created successfully!");
      navigate("/medical-records");
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Electronic Health Records (EHR)</span>
          <h1>File Medical Record</h1>
          <p>Create a clinical dossier entry containing diagnostic assessment and observations.</p>
        </div>

        <Link to="/medical-records" className="button button--secondary">
          <FaArrowLeft />
          Back to Records
        </Link>
      </section>

      <section className="surface-card">
        <div className="surface-card__header">
          <div>
            <span className="section__eyebrow">Clinical Dossier</span>
            <h2>Record Information</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field-group">
            <label htmlFor="patientId">Select Patient *</label>
            <div className="input-shell">
              <FaUser />
              {patients.length > 0 ? (
                <select id="patientId" {...register("patientId", { required: true })}>
                  <option value="">Select patient for this record</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nom} {p.prenom} (ID: #{p.id})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id="patientId"
                  type="number"
                  {...register("patientId", { required: true })}
                  placeholder="Enter Patient ID"
                />
              )}
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="diagnostic">Clinical Diagnosis *</label>
            <div className="input-shell">
              <FaNotesMedical />
              <input
                id="diagnostic"
                {...register("diagnostic", { required: true })}
                placeholder="e.g. Hypertension artérielle stade 1, Diabète type 2..."
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="observation">Clinical Observations & Treatment Plan *</label>
            <div className="input-shell">
              <FaClipboard style={{ alignSelf: "flex-start", marginTop: "0.25rem" }} />
              <textarea
                id="observation"
                {...register("observation", { required: true })}
                placeholder="Document symptoms, vital signs, physical exam findings, and prescribed treatment..."
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
              {isSubmitting ? "Filing Record..." : "File Medical Record"}
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