import { FaBell, FaCheckCircle, FaCircle, FaRegClock } from "react-icons/fa";

const notifications = [
  {
    id: 1,
    type: "Appointment",
    message: "Patient Sarah Jenkins confirmed for 10:00 AM.",
    time: "5 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "Record",
    message: "New medical record added for Michael Chen.",
    time: "30 minutes ago",
    unread: true,
  },
  {
    id: 3,
    type: "System",
    message: "Backup completed successfully.",
    time: "2 hours ago",
    unread: false,
  },
];

export default function Notifications() {
  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Notifications</span>
          <h1>Notification center</h1>
          <p>Keep track of updates, reminders and system activity in one place.</p>
        </div>

        <div className="surface-card__pill">
          <FaBell />
          {notifications.filter((item) => item.unread).length} unread
        </div>
      </section>

      <section className="surface-card">
        <div className="notification-list">
          {notifications.map((notification) => (
            <article key={notification.id} className={`notification-item ${notification.unread ? "notification-item--unread" : ""}`}>
              <div className="notification-item__icon">
                {notification.unread ? <FaCircle /> : <FaCheckCircle />}
              </div>
              <div className="notification-item__body">
                <div className="notification-item__top">
                  <strong>{notification.type}</strong>
                  <span>
                    <FaRegClock />
                    {notification.time}
                  </span>
                </div>
                <p>{notification.message}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
