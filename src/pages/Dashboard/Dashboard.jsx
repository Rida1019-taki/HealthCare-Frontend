import { useEffect, useState } from "react";
import api from "../../services/api";

import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import StatsCard from "../../components/StatsCard/StatsCard";
import ActivityTable from "../../components/ActivityTable/ActivityTable";
import Alerts from "../../components/Alerts/Alerts";
import StaffOverview from "../../components/StaffOverview/StaffOverview";

export default function Dashboard() {

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const patientsRes = await api.get("/api/patients");
            const doctorsRes = await api.get("/api/medecins");
            const appointmentsRes = await api.get("/api/rendezvous");
            const recordsRes = await api.get("/api/dossiers");

            setPatients(patientsRes.data.content);
            setDoctors(doctorsRes.data.content);
            setAppointments(appointmentsRes.data.content);
            setRecords(recordsRes.data.content);

        } catch (err) {
            console.log(err);
        }
    };

    return(
        <>
            <Navbar/>
            <div className="dashboard">
                <Sidebar/>
                <main className="content">
                    <h1>
                        Clinical Dashboard
                    </h1>
                    <p className="status">
                        System Status: Operational • Last Updated: 09:42 AM
                    </p>
                    <div className="stats">
                        <StatsCard title="TOTAL PATIENTS" value={patients.length} />

                        <StatsCard title="TOTAL DOCTORS" value={doctors.length} />

                        <StatsCard title="TOTAL APPOINTMENTS" value={appointments.length} />

                        <StatsCard title="MEDICAL RECORDS" value={records.length} />

                    </div>

                    <div className="bottom">
                        <ActivityTable/>
                        <div className="right">
                            <Alerts/>
                            <StaffOverview/>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
