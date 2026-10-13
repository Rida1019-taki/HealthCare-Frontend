import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";
import { FaCalendarAlt, FaUserMd, FaUser, FaClock, FaArrowLeft, FaCheck } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHandler";

const schema = yup.object({
  patientId: yup.lazy(() => {
    const role = (localStorage.getItem("role") || "").replace(/^ROLE_/, "").trim().toUpperCase();
    if (role === "PATIENT") {
      return yup.number().nullable().notRequired();
    }
    return yup
      .number()
      .typeError("Please select a patient")
      .required("Please select a patient")
      .positive("Patient ID must be greater than 0")
      .integer("Patient ID must be an integer");
  }),

  medecinId: yup.lazy(() => {
    const role = (localStorage.getItem("role") || "").replace(/^ROLE_/, "").trim().toUpperCase();
    if (role === "MEDECIN") {
      return yup.number().nullable().notRequired();
    }
    return yup
      .number()
      .typeError("Please select a physician")
      .required("Please select a physician")
      .positive("Doctor ID must be greater than 0")
      .integer("Doctor ID must be an integer");
  }),

  dateHeure: yup.string().required("Consultation date and time is required"),
  statut: yup.string().required("Status is required"),
});

export default function AddAppointment() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const rawRole = localStorage.getItem("role") || "";
  const role = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();
  const storedProfileId = localStorage.getItem("profileId");

  const isPatient = role === "PATIENT";
  const isDoctor = role === "MEDECIN";

  const minDateTime = useMemo(() => {
    return new Date().toISOString().slice(0, 16);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      statut: isDoctor ? "CONFIRME" : "EN_ATTENTE",
      patientId: isPatient && storedProfileId ? Number(storedProfileId) : "",
      medecinId: isDoctor && storedProfileId ? Number(storedProfileId) : "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isPatient) {
          setValue("statut", "EN_ATTENTE");

          const doctorsRes = await api.get("/api/medecins?size=100").catch(() => ({ data: { content: [] } }));
          setDoctors(doctorsRes.data?.content || doctorsRes.data || []);

          let pId = storedProfileId;
          if (!pId) {
            setLoadingProfile(true);
            try {
              const meRes = await api.get("/api/patients/me");
              if (meRes.data?.id) {
                pId = meRes.data.id;
                localStorage.setItem("profileId", pId);
              }
            } catch {
              try {
                const rdvRes = await api.get("/api/rendezvous/me");
                const first = rdvRes.data?.content?.[0];
                if (first?.patientId) {
                  pId = first.patientId;
                  localStorage.setItem("profileId", pId);
                }
              } catch (e) {
                console.error("Could not fetch patient id", e);
              }
            } finally {
              setLoadingProfile(false);
            }
          }

          if (pId) {
            setValue("patientId", Number(pId));
          }
        } else if (isDoctor) {
          let mId = storedProfileId;
          if (!mId) {
            setLoadingProfile(true);
            try {
              const meRes = await api.get("/api/medecins/me");
              if (meRes.data?.id) {
                mId = meRes.data.id;
                localStorage.setItem("profileId", mId);
              }
            } catch (e) {
              console.error("Could not fetch doctor id", e);
            } finally {
              setLoadingProfile(false);
            }
          }

          if (mId) {
            setValue("medecinId", Number(mId));
          }

          const patientsRes = await api.get("/api/patients?size=100").catch(() => ({ data: { content: [] } }));
          setPatients(patientsRes.data?.content || patientsRes.data || []);
        } else {
          // ADMIN: fetches both doctors and patients
          const [doctorsRes, patientsRes] = await Promise.all([
            api.get("/api/medecins?size=100").catch(() => ({ data: { content: [] } })),
            api.get("/api/patients?size=100").catch(() => ({ data: { content: [] } })),
          ]);
          setDoctors(doctorsRes.data?.content || doctorsRes.data || []);
          setPatients(patientsRes.data?.content || patientsRes.data || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [isPatient, isDoctor, storedProfileId, setValue]);

  const onSubmit = async (data) => {
    const appointmentDate = data.dateHeure.includes("T")
      ? data.dateHeure.split("T")[0]
      : data.dateHeure;

    let patientIdToSend = Number(data.patientId);
    if (isPatient && (!patientIdToSend || isNaN(patientIdToSend))) {
      const pid = localStorage.getItem("profileId");
      if (pid) {
        patientIdToSend = Number(pid);
      }
    }

    let medecinIdToSend = Number(data.medecinId);
    if (isDoctor && (!medecinIdToSend || isNaN(medecinIdToSend))) {
      const mid = localStorage.getItem("profileId");
      if (mid) {
        medecinIdToSend = Number(mid);
      }
    }

    const appointment = {
      patientId: patientIdToSend,
      medecinId: medecinIdToSend,
      dateRendezVous: appointmentDate,
      statut: isPatient ? "EN_ATTENTE" : (data.statut || "EN_ATTENTE"),
    };

    try {
      await api.post("/api/rendezvous", appointment);
      toast.success(
        isPatient
          ? "Appointment requested successfully! Status: Pending doctor confirmation."
          : "Consultation scheduled successfully!"
      );
      navigate("/appointments");
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Consultation Scheduling</span>
          <h1>
            {isPatient
              ? "Book a Medical Consultation"
              : isDoctor
              ? "Schedule Patient Consultation"
              : "Schedule Clinical Appointment"}
          </h1>
          <p>
            {isPatient
              ? "Select your preferred practitioner and consultation date."
              : isDoctor
              ? "Assign a consultation slot to an existing patient."
              : "Register an appointment between a patient and attending physician."}
          </p>
        </div>

        <Link to="/appointments" className="button button--secondary">
          <FaArrowLeft />
          Back to Schedule
        </Link>
      </section>

      <section className="surface-card">
        <div className="surface-card__header">
          <div>
            <span className="section__eyebrow">Appointment Details</span>
            <h2>Consultation Parameters</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field-grid">
            {/* Patient selection */}
            {!isPatient ? (
              <div className="field-group">
                <label htmlFor="patientId">Patient *</label>
                <div className="input-shell">
                  <FaUser />
                  {patients.length > 0 ? (
                    <select id="patientId" {...register("patientId")}>
                      <option value="">Select a patient</option>
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
                      placeholder="Enter Patient ID"
                      {...register("patientId")}
                    />
                  )}
                </div>
                {errors.patientId && <small className="field-error">{errors.patientId.message}</small>}
              </div>
            ) : (
              <input type="hidden" {...register("patientId")} />
            )}

            {/* Doctor selection */}
            {isDoctor ? (
              <div className="field-group">
                <input type="hidden" {...register("medecinId")} />
                <label>Assigned Physician</label>
                <div className="status-auto-preview">
                  <span className="badge badge-info">Dr. (You)</span>
                  <span className="status-auto-text">
                    This consultation is assigned to your clinical calendar.
                  </span>
                </div>
              </div>
            ) : (
              <div className="field-group">
                <label htmlFor="medecinId">Attending Physician *</label>
                <div className="input-shell">
                  <FaUserMd />
                  {doctors.length > 0 ? (
                    <select id="medecinId" {...register("medecinId")}>
                      <option value="">Select a doctor</option>
                      {doctors.map((d) => (
                        <option key={d.id} value={d.id}>
                          Dr. {d.nom} {d.prenom ? d.prenom : ""} {d.specialite ? `— ${d.specialite}` : ""}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id="medecinId"
                      type="number"
                      placeholder="Enter Doctor ID"
                      {...register("medecinId")}
                    />
                  )}
                </div>
                {errors.medecinId && <small className="field-error">{errors.medecinId.message}</small>}
              </div>
            )}

            {/* Date & Time selection */}
            <div className="field-group">
              <label htmlFor="dateHeure">Consultation Date & Time *</label>
              <div className="input-shell">
                <FaCalendarAlt />
                <input
                  id="dateHeure"
                  type="datetime-local"
                  min={minDateTime}
                  {...register("dateHeure")}
                />
              </div>
              {errors.dateHeure && <small className="field-error">{errors.dateHeure.message}</small>}
            </div>

            {/* Status selection */}
            {isPatient ? (
              <div className="field-group">
                <input type="hidden" value="EN_ATTENTE" {...register("statut")} />
                <label>Appointment Status</label>
                <div className="status-auto-preview">
                  <span className="badge badge-en_attente">Pending Review</span>
                  <span className="status-auto-text">
                    Submitted for confirmation by the medical team.
                  </span>
                </div>
              </div>
            ) : (
              <div className="field-group">
                <label htmlFor="statut">Initial Status *</label>
                <div className="input-shell">
                  <FaClock />
                  <select id="statut" {...register("statut")}>
                    <option value="CONFIRME">Confirmed (CONFIRME)</option>
                    <option value="EN_ATTENTE">Pending (EN_ATTENTE)</option>
                    <option value="ANNULE">Cancelled (ANNULE)</option>
                  </select>
                </div>
                {errors.statut && <small className="field-error">{errors.statut.message}</small>}
              </div>
            )}
          </div>

          <div className="actions">
            <button
              type="submit"
              className="button button--primary"
              disabled={isSubmitting || ((isPatient || isDoctor) && loadingProfile)}
            >
              <FaCheck />
              {isSubmitting
                ? "Scheduling..."
                : isPatient
                ? "Request Appointment"
                : "Schedule Consultation"}
            </button>

            <button
              type="button"
              className="button button--secondary"
              onClick={() => navigate("/appointments")}
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