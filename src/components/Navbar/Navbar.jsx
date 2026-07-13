import './Navbar.css';

export default function Navbar(){
    return(
        <nav className="navbar">
            <h2 className="logo">HealthCare</h2>

            <ul>
                <li className="active">Home</li>
                <li>Dashboard</li>
                <li>Patients</li>
                <li>About</li>
            </ul>
            <span className="pofile">⚪</span>
        </nav>
    );
}