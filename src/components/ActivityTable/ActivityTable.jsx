import { FaCheckCircle, FaClock, FaExclamationTriangle, FaCalendarAlt } from "react-icons/fa";
import "./ActivityTable.css";

const patients = [
  {
    name: "Sarah Jenkins",
    dep: "Cardiology",
    status: "Completed",
    time: "08:45 AM",
  },
  {
    name: "Michael Chen",
    dep: "Neurology",
    status: "In Progress",
    time: "09:12 AM",
  },
  {
    name: "Elena Rodriguez",
    dep: "Pediatrics",
    status: "Urgent",
    time: "09:30 AM",
  },
  {
    name: "David Wilson",
    dep: "General",
    status: "Scheduled",
    time: "10:00 AM",
  },
];

const getStatusBadge = (status) => {
  const statusConfig = {
    Completed: { class: "badge-success", icon: <FaCheckCircle /> },
    "In Progress": { class: "badge-info", icon: <FaClock /> },
    Urgent: { class: "badge-danger", icon: <FaExclamationTriangle /> },
    Scheduled: { class: "badge-pending", icon: <FaCalendarAlt /> },
  };
  return statusConfig[status] || { class: "badge-default", icon: <FaCalendarAlt /> };
};

export default function ActivityTable() {
  return (
    <div className="table-widget">
      <div className="surface-card__header">
        <div>
          <span className="section__eyebrow">Recent activity</span>
          <h2>Latest actions</h2>
        </div>
        <a href="/appointments" className="text-link">
          View all
        </a>
      </div>

      <table className="data-table data-table--compact">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Department</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient, index) => {
            const statusBadge = getStatusBadge(patient.status);
            return (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.dep}</td>
                <td>
                  <span className={`badge ${statusBadge.class}`}>
                    {statusBadge.icon}
                    {patient.status}
                  </span>
                </td>
                <td>{patient.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
