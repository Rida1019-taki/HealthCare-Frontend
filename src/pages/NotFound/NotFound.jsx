import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="error-page">
            <div className="error-card">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>

                <Link to="/dashboard" className="back-btn">
                    Retour au tableau de bord
                </Link>
            </div>
        </div>
    );
}