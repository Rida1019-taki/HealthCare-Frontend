import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import PatientsTable from "../../components/PatientsTable/PatientsTable";
import "./Patients.css";
import {Link} from "react-router-dom";

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
                        <Link to="/add-patient">

                        <button className="add-btn">
                            Add Patient
                        </button>
                        </Link>

                    </div>


                    <PatientsTable />

                </main>

            </div>
        </>
    );
}