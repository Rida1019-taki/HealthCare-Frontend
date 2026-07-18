import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import StaffTable from "../../components/DoctorsTable/DoctorsTable";

import "./Doctors.css";
import {Link} from "react-router-dom";

export default function Doctors() {
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

                    <StaffTable />
                </main>
            </div>
        </>
    );
}