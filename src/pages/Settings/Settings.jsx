import { useState } from "react";
import { FaBell, FaLock, FaSlidersH } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const saveSettings = (event) => {
    event.preventDefault();
    toast.success("Settings updated locally.");
  };

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Settings</span>
          <h1>Workspace settings</h1>
          <p>Adjust the interface preferences for this healthcare workspace.</p>
        </div>
      </section>

      <form className="surface-card settings-form" onSubmit={saveSettings}>
        <div className="settings-section">
          <div className="surface-card__header">
            <div>
              <span className="section__eyebrow">Preferences</span>
              <h2>Interface controls</h2>
            </div>
            <FaSlidersH className="widget-icon" />
          </div>

          <label className="toggle-row">
            <span>
              <FaBell />
              Notification alerts
            </span>
            <input type="checkbox" checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)} />
          </label>

          <label className="toggle-row">
            <span>
              <FaLock />
              Compact navigation mode
            </span>
            <input type="checkbox" checked={compactMode} onChange={(e) => setCompactMode(e.target.checked)} />
          </label>
        </div>

        <button type="submit" className="button button--primary">
          Save settings
        </button>
      </form>
    </div>
  );
}
