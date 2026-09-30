import { useState } from "react";
import PatientsTable from "../../components/PatientsTable/PatientsTable";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function Patients() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Patients</span>
          <h1>Patient management</h1>
          <p>Organize patient records, contact details and clinical history.</p>
        </div>

        <Link to="/add-patient" className="button button--primary">
          <FaPlus />
          Add patient
        </Link>
      </section>

      <section className="surface-card">
        <div className="toolbar">
          <div className="input-shell input-shell--toolbar">
            <FaSearch />
            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="toolbar-select">
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>

        <PatientsTable search={search} sortOrder={sortOrder} />
      </section>
    </div>
  );
}
