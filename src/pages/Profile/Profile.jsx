import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaCheck,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import api from "../../services/api";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/errorHandler";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    nom: "",
    prenom: "",
    telephone: "",
    dateNaissance: "",
    specialite: "",
    password: "",
  });

  const loadProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/profile");
      setProfile(response.data);
      setFormData({
        username: response.data.username || "",
        nom: response.data.nom || "",
        prenom: response.data.prenom || "",
        telephone: response.data.telephone != null ? String(response.data.telephone) : "",
        dateNaissance: response.data.dateNaissance || "",
        specialite: response.data.specialite || "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      const rawRole = localStorage.getItem("role") || "USER";
      const fallbackProfile = {
        username: localStorage.getItem("username") || "User",
        email: localStorage.getItem("email") || "user@healthcare.com",
        role: rawRole.replace(/^ROLE_/, "").trim().toUpperCase(),
        nom: "",
        prenom: "",
        telephone: null,
        dateNaissance: "",
        specialite: "",
      };
      setProfile(fallbackProfile);
      setFormData({
        username: fallbackProfile.username,
        nom: "",
        prenom: "",
        telephone: "",
        dateNaissance: "",
        specialite: "",
        password: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        username: formData.username.trim(),
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        telephone: formData.telephone ? Number(formData.telephone) : null,
        dateNaissance: formData.dateNaissance || null,
        specialite: formData.specialite.trim(),
        password: formData.password ? formData.password.trim() : null,
      };

      const response = await api.put("/api/profile", payload);
      setProfile(response.data);
      if (response.data.username) {
        localStorage.setItem("username", response.data.username);
      }
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      handleApiError(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        nom: profile.nom || "",
        prenom: profile.prenom || "",
        telephone: profile.telephone != null ? String(profile.telephone) : "",
        dateNaissance: profile.dateNaissance || "",
        specialite: profile.specialite || "",
        password: "",
      });
    }
    setIsEditing(false);
  };

  const rawRole = profile?.role || localStorage.getItem("role") || "USER";
  const role = String(rawRole).replace(/^ROLE_/, "").trim().toUpperCase();

  const roleLabel =
    role === "ADMIN" ? "Administrator" : role === "MEDECIN" ? "Doctor" : "Patient";

  const displayName =
    profile?.nom || profile?.prenom
      ? `${profile?.nom || ""} ${profile?.prenom || ""}`.trim()
      : profile?.username || "Account Holder";

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Account</span>
          <h1>User Profile</h1>
          <p>View and manage your personal healthcare account details.</p>
        </div>

        {!isEditing && (
          <button
            type="button"
            className="button button--primary"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
            Edit Profile
          </button>
        )}
      </section>

      <section className="surface-card profile-card">
        <div className="profile-card__header">
          <div className="profile-card__identity">
            <div className="profile-card__avatar">
              <FaUserCircle />
            </div>
            <div>
              <h2>{displayName}</h2>
              <p>{profile?.email || "No email available"}</p>
              <div style={{ marginTop: "0.45rem" }}>
                <span className="badge badge-info">{roleLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="empty-state empty-state--compact">
            <p>Loading profile details...</p>
          </div>
        ) : isEditing ? (
          <form className="settings-form" onSubmit={handleSave} style={{ marginTop: "1rem" }}>
            <div className="field-grid">
              <div className="field-group">
                <label htmlFor="username">Username / Account Name</label>
                <div className="input-shell">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="email">Email address</label>
                <div className="input-shell">
                  <input
                    id="email"
                    type="email"
                    disabled
                    value={profile?.email || ""}
                    style={{ opacity: 0.7, cursor: "not-allowed" }}
                  />
                </div>
                <small style={{ color: "#64748b", fontSize: "0.78rem" }}>
                  Email is your unique login credential.
                </small>
              </div>

              <div className="field-group">
                <label htmlFor="nom">Last Name (Nom)</label>
                <div className="input-shell">
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              {role === "PATIENT" && (
                <div className="field-group">
                  <label htmlFor="prenom">First Name (Prénom)</label>
                  <div className="input-shell">
                    <input
                      id="prenom"
                      name="prenom"
                      type="text"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      placeholder="First Name"
                    />
                  </div>
                </div>
              )}

              <div className="field-group">
                <label htmlFor="telephone">Phone Number</label>
                <div className="input-shell">
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="e.g. 0612345678"
                  />
                </div>
              </div>

              {role === "PATIENT" && (
                <div className="field-group">
                  <label htmlFor="dateNaissance">Date of Birth</label>
                  <div className="input-shell">
                    <input
                      id="dateNaissance"
                      name="dateNaissance"
                      type="date"
                      value={formData.dateNaissance}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {role === "MEDECIN" && (
                <div className="field-group">
                  <label htmlFor="specialite">Medical Speciality</label>
                  <div className="input-shell">
                    <input
                      id="specialite"
                      name="specialite"
                      type="text"
                      value={formData.specialite}
                      onChange={handleInputChange}
                      placeholder="e.g. Cardiologue, Pédiatre"
                    />
                  </div>
                </div>
              )}

              <div className="field-group">
                <label htmlFor="password">New Password (optional)</label>
                <div className="input-shell">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Leave blank to keep unchanged"
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
              <button
                type="submit"
                className="button button--primary"
                disabled={saving}
              >
                <FaCheck />
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>

              <button
                type="button"
                className="button button--ghost"
                onClick={handleCancel}
                disabled={saving}
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-grid" style={{ marginTop: "1rem" }}>
            <div className="info-card">
              <span>Full Name</span>
              <strong>{displayName}</strong>
            </div>

            <div className="info-card">
              <span>Email Address</span>
              <strong>{profile?.email || "-"}</strong>
            </div>

            <div className="info-card">
              <span>Account Role</span>
              <strong>{roleLabel}</strong>
            </div>

            <div className="info-card">
              <span>Phone Number</span>
              <strong>{profile?.telephone ? String(profile.telephone) : "Not specified"}</strong>
            </div>

            {role === "PATIENT" && (
              <div className="info-card">
                <span>Date of Birth</span>
                <strong>{profile?.dateNaissance || "Not specified"}</strong>
              </div>
            )}

            {role === "MEDECIN" && (
              <div className="info-card">
                <span>Medical Speciality</span>
                <strong>{profile?.specialite || "General Practice"}</strong>
              </div>
            )}

            <div className="info-card">
              <span>Account Status</span>
              <strong style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--success, #16a34a)" }}>
                <FaCheckCircle /> Active Account
              </strong>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
