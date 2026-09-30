import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const role = localStorage.getItem("role") || "USER";
  const userId = localStorage.getItem("userId") || "-";
  const profileId = localStorage.getItem("profileId") || "-";

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Profile</span>
          <h1>User profile</h1>
          <p>Review the current signed-in account details.</p>
        </div>
      </section>

      <section className="surface-card profile-card">
        <div className="profile-card__avatar">
          <FaUserCircle />
        </div>

        <div className="profile-grid">
          <div className="info-card">
            <span>Role</span>
            <strong>{role}</strong>
          </div>
          <div className="info-card">
            <span>User ID</span>
            <strong>{userId}</strong>
          </div>
          <div className="info-card">
            <span>Profile ID</span>
            <strong>{profileId}</strong>
          </div>
          <div className="info-card">
            <span>Status</span>
            <strong>Active session</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
