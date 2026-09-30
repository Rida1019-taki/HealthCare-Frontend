import "./StaffOverview.css";

export default function StaffOverview({ doctors = [] }) {
  return (
    <div className="table-widget">
      <div className="surface-card__header">
        <div>
          <span className="section__eyebrow">Staff overview</span>
          <h2>Current team</h2>
        </div>
      </div>

      <div className="mini-list">
        {doctors.length === 0 ? (
          <p className="widget-copy">No doctor data available yet.</p>
        ) : (
          doctors.slice(0, 4).map((doctor) => (
            <div key={doctor.id} className="mini-list__item">
              <div>
                <strong>{doctor.nom}</strong>
                <span>{doctor.specialite}</span>
              </div>
              <span className="badge badge-default">Active</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
