import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="sidebar">

            <h3>Management</h3>

            <ul>

                <Link to="/appointments">
                    <li>Appointments</li>
                </Link>

                <Link to="/medical-records">
                    <li>Medical Records</li>
                </Link>

                <Link to="/doctors">
                    <li>Doctors</li>
                </Link>

                <Link to="/settings">
                    <li>Settings</li>
                </Link>

                <li className="logout" onClick={logout}>
                    Logout
                </li>

            </ul>

        </div>
    );
}