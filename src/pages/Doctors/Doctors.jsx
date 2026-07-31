import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import StaffTable from "../../components/DoctorsTable/DoctorsTable";
import "./Doctors.css";
import { Link } from "react-router-dom";

export default function Doctors() {

    const [speciality, setSpeciality] = useState("");

    return (
        <>
            <Navbar />

            <div className="staff-page">
                <Sidebar />

                <main className="staff-content">

                    <div className="header">

                        <div>
                            <h1>Doctors</h1>
                            <p>Manage doctors information and availability.</p>
                        </div>

                        <Link to="/add-doctor">
                            <button className="add-btn">
                                Add Doctor
                            </button>
                        </Link>

                    </div>

                    <select
                        className="speciality-select"
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                    >
                        <option value="">Toutes les spécialités</option>
                        <option value="Cardiologie">Cardiologie</option>
                        <option value="Dermatologie">Dermatologie</option>
                        <option value="Pediatrie">Pediatrie</option>
                        <option value="Gynecologie">Gynecologie</option>
                        <option value="Ophtalmologie">Ophtalmologie</option>
                        <option value="test">test</option>
                    </select>

                    <StaffTable speciality={speciality} />

                </main>

            </div>
        </>
    );
}