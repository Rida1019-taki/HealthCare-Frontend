import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import AppointmentsTable from "../../components/AppointmentsTable/AppointmentsTable";

import "./Appointments.css";

export default function Appointments() {
    return (
        <>
            <Navbar />

            <div className="appointments-page">
                <Sidebar />

                <main className="appointments-content">

                    <div className="header">
                        <div>
                            <h1>Appointments</h1>
                            <p>Manage all appointments</p>
                        </div>

                        <button
                            className="primary"
                            onClick={() => window.location.href = "/appointments/add"}
                        >
                            Add Appointment
                        </button>
                    </div>

                    <AppointmentsTable />

                </main>
            </div>
        </>
    );
}