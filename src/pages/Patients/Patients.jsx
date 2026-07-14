import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchBar from "../../components/SearchBar/SearchBar";
import PatientsTable from "../../components/PatientsTable/PatientsTable";

import "./Patients.css";

export default function Patients() {
    return (
        <>
            <Navbar />

            <div className="patients-page">
                <Sidebar />

                <main className="patients-content">

                    <div className="header">

                        <div>
                            <h1>Patients</h1>
                            <p>Manage patient records and clinical history</p>
                        </div>

                        <button className="add-btn">
                            Add Patient
                        </button>

                    </div>

                    <SearchBar />

                    <PatientsTable />

                </main>

            </div>
        </>
    );
}