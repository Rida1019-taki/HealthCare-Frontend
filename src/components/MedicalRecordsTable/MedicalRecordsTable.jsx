import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MedicalRecordsTable.css";
import { Link } from "react-router-dom";

export default function MedicalRecordsTable() {

    const [records, setRecords] = useState([]);

    useEffect(() => {
        loadRecords();
    }, []);

    const loadRecords = async () => {
        try {
            const res = await api.get("/api/dossiers");
            setRecords(res.data.content);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteRecord = async(id)=>{

        if(!window.confirm("Delete this medical record ?"))
            return;

        try{

            await api.delete(`/api/dossiers/${id}`);

            loadRecords();

        }catch(err){
            console.log(err.response?.data || err);
        }

    }

    return (
        <div className="table-box">

            <table>

                <thead>
                <tr>
                    <th>Patient</th>
                    <th>Diagnostic</th>
                    <th>Observation</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>

                {records.map(record => (

                    <tr key={record.id}>

                        <td>
                            {record.patientPrenom} {record.patientNom}
                        </td>

                        <td>{record.diagnostic}</td>

                        <td>{record.observation}</td>

                        <td>{record.dateCreation}</td>

                        <td className="actions">

                            <Link
                                to={`/medical-records/${record.id}`}
                                className="view-btn"
                            >
                                View
                            </Link>

                            <Link
                                to={`/medical-records/edit/${record.id}`}
                                className="edit-btn"
                            >
                                Edit
                            </Link>

                            <button
                                className="delete"
                                onClick={() => deleteRecord(record.id)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

            <div className="footer">
                <p>Showing {records.length} records</p>
            </div>

        </div>
    );
}