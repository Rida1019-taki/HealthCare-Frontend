import { Link } from "react-router-dom";
import AppointmentsTable from "../../components/AppointmentsTable/AppointmentsTable";
import { FaPlus } from "react-icons/fa";

export default function Appointments() {
  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Appointments</span>
          <h1>Appointment management</h1>
          <p>Review, confirm and manage the current schedule with a clear clinical overview.</p>
        </div>

        <Link to="/appointments/add" className="button button--primary">
          <FaPlus />
          Add appointment
        </Link>
      </section>

      <section className="surface-card">
        <AppointmentsTable />
      </section>
    </div>
  );
}
