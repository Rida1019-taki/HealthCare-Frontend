import { FaBell, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import "./Alerts.css";

export default function Alerts() {
  return (
    <div className="table-widget">
      <div className="surface-card__header">
        <div>
          <span className="section__eyebrow">Notifications</span>
          <h2>System alerts</h2>
        </div>
        <FaBell className="widget-icon" />
      </div>

      <div className="alert-stack">
        <div className="alert-item alert-item--critical">
          <FaExclamationTriangle />
          <div>
            <strong>Critical alert</strong>
            <p>Pharmacy inventory low</p>
            <span>2 minutes ago</span>
          </div>
        </div>

        <div className="alert-item alert-item--info">
          <FaInfoCircle />
          <div>
            <strong>Notice</strong>
            <p>Software update scheduled at 02:00 AM</p>
            <span>1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
