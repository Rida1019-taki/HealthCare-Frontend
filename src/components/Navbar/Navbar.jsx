import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="navbar-logo">HealthCare</h2>

            <ul className="navbar-links">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/patients"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Patients
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        About
                    </NavLink>
                </li>
            </ul>

            <div className="navbar-profile">
                <img
                    src="https://i.pravatar"
                    alt="Profile"
                />
            </div>
        </nav>
    );
}

export default Navbar;