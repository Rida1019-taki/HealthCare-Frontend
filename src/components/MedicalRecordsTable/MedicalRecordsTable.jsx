import "./MedicalRecordsTable.css";

const records = [
    {
        patient:"Elena Rodriguez",
        diagnosis:"Type 2 Diabetes mellitus",
        date:"2023-10-24"
    },
    {
        patient:"Marcus Chen",
        diagnosis:"Hypertensive heart disease",
        date:"2023-11-02"
    },
    {
        patient:"Sarah Jenkins",
        diagnosis:"Acute viral pharyngitis",
        date:"2023-11-15"
    },
    {
        patient:"David Okafor",
        diagnosis:"Anterior cruciate ligament tear",
        date:"2023-11-18"
    },
    {
        patient:"Linda Thompson",
        diagnosis:"Stable angina pectoris",
        date:"2023-11-20"
    }
];

export default function MedicalRecordsTable(){

    return(

        <div className="table-box">

            <table>

                <thead>

                <tr>
                    <th>Patient</th>
                    <th>Diagnosis</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>

                </thead>

                <tbody>

                {records.map((record,index)=>(

                    <tr key={index}>

                        <td>{record.patient}</td>

                        <td>{record.diagnosis}</td>

                        <td>{record.date}</td>

                        <td>

                            <button className="view">View</button>

                            <button className="edit">Edit</button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

            <div className="footer">

                <p>Showing 5 of 1,248 records</p>

                <div className="pagination">

                    <button>{"<"}</button>
                    <button className="active">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>{">"}</button>

                </div>

            </div>

        </div>

    );

}