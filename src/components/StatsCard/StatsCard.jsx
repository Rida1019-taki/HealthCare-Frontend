import "./StatsCard.css";

export default function StatsCard({ title, value, icon, tone = "blue", change }) {
  return (
    <article className={`stats-card stats-card--${tone}`}>
      <div className="stats-card__icon">{icon}</div>
      <div className="stats-card__body">
        <p className="stats-card__label">{title}</p>
        <h2 className="stats-card__value">{value}</h2>
      </div>
      {change && <span className="stats-card__change">{change}</span>}
    </article>
  );
}
