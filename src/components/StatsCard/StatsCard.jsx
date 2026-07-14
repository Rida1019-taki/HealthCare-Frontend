import "./StatsCard.css";

export default function StatsCard({title, value}){
    return(
        <div className="card">
            <h5>{title}</h5>
            <h2>{value}</h2>
        </div>
    );
}