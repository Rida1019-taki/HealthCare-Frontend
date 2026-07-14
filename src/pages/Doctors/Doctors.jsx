import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import StaffTable from "../../components/StaffTable/StaffTable";

import "./Doctors.css";

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

                        <button className="add-btn">
                            Add Doctor
                        </button>
                    </div>

                    <StaffTable />
                </main>
            </div>
        </>
    );
}