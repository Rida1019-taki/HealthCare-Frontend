import { Link } from "react-router-dom";
import "./Forbidden.css";

export default function Forbidden() {
    return (
        <div className="forbidden-page">
            <div className="forbidden-card">

                <h1>403</h1>

                <h2>Access Denied</h2>

                <p>
                    Vous n'avez pas l'autorisation d'accéder à cette page.
                </p>

                <Link to="/dashboard" className="back-btn">
                    Retour au tableau de bord
                </Link>

            </div>
        </div>
    );
}