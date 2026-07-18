import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import MedicalRecordsTable from "../../components/MedicalRecordsTable/MedicalRecordsTable";
import {useNavigate} from "react-router-dom";

import "./MedicalRecords.css";

export default function MedicalRecords() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />

            <div className="medical-page">

                <Sidebar />

                <main className="medical-content">

                    <div className="header">

                        <div>
                            <h1>Medical Records</h1>
                            <p>
                                Centralized database of patient clinical history and diagnostic
                                data.
                            </p>
                        </div>

                        <div className="buttons">
                            <button
                                className="primary"
                                onClick={() => navigate("/medical-records/add")}
                            >
                                Add New Record
                            </button>

                            <button className="secondary">
                                Export CSV
                            </button>
                        </div>

                    </div>

                    <MedicalRecordsTable />

                </main>

            </div>
        </>
    );
}