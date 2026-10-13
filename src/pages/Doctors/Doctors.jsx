import { useState } from "react";
import StaffTable from "../../components/DoctorsTable/DoctorsTable";
import { Link } from "react-router-dom";
import { FaUserPlus, FaSearch } from "react-icons/fa";

export default function Doctors() {
  const [speciality, setSpeciality] = useState("");

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Administration • Doctors</span>
          <h1>Doctor & Physician Management</h1>
          <p>Manage clinic physicians, specialties, contact info and practitioner profiles.</p>
        </div>

        <Link to="/add-doctor" className="button button--primary">
          <FaUserPlus />
          Add Doctor
        </Link>
      </section>

      <section className="surface-card">
        <div className="toolbar">
          <div className="input-shell input-shell--toolbar">
            <FaSearch />
            <input
              type="text"
              placeholder="Filter by speciality..."
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
            />
          </div>

          <select className="toolbar-select" value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
            <option value="">All specialities</option>
            <option value="Cardiologie">Cardiologie</option>
            <option value="Dermatologie">Dermatologie</option>
            <option value="Pediatrie">Pediatrie</option>
            <option value="Gynecologie">Gynecologie</option>
            <option value="Ophtalmologie">Ophtalmologie</option>
          </select>
        </div>

        <StaffTable speciality={speciality} />
      </section>
    </div>
  );
}
