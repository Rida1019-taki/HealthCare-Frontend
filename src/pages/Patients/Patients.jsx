import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import PatientsTable from "../../components/PatientsTable/PatientsTable";
import "./Patients.css";
import { Link } from "react-router-dom";

export default function Patients() {
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

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

                    <div className="patients-actions">
                        <input
                            type="text"
                            placeholder="Search patient..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />

                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="sort-select"
                        >
                            <option value="asc">A → Z</option>
                            <option value="desc">Z → A</option>
                        </select>
                    </div>

                    <PatientsTable
                        search={search}
                        sortOrder={sortOrder}
                    />

                </main>
            </div>
        </>
    );
}