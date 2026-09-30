import { useNavigate } from "react-router-dom";
import MedicalRecordsTable from "../../components/MedicalRecordsTable/MedicalRecordsTable";
import { FaFileMedical, FaPlus } from "react-icons/fa";

export default function MedicalRecords() {
  const navigate = useNavigate();

  return (
    <div className="page-stack">
      <section className="page-hero page-hero--compact">
        <div>
          <span className="section__eyebrow">Medical records</span>
          <h1>Clinical record center</h1>
          <p>Keep diagnoses, observations and treatment notes organized in one secure space.</p>
        </div>

        <button className="button button--primary" onClick={() => navigate("/medical-records/add")}>
          <FaPlus />
          Add record
        </button>
      </section>

      <section className="surface-card">
        <div className="surface-card__header">
          <div>
            <span className="section__eyebrow">Records</span>
            <h2>Recent patient files</h2>
          </div>
          <div className="surface-card__pill">
            <FaFileMedical />
            Protected medical data
          </div>
        </div>

        <MedicalRecordsTable />
      </section>
    </div>
  );
}
