import "./PatientsTable.css";

const patients = [
    {
        name:"Sarah Jenkins",
        email:"s.jenkins@example.com",
        phone:"+1 (555) 012-3456"
    },
    {
        name:"Marcus Thorne",
        email:"mthorne.88@webmail.com",
        phone:"+1 (555) 987-6543"
    },
    {
        name:"Elena Rodriguez",
        email:"elena.rod@provider.net",
        phone:"+1 (555) 234-5678"
    },
    {
        name:"David Chen",
        email:"dchen@clinic-internal.com",
        phone:"+1 (555) 456-7890"
    },
    {
        name:"Aisha Khan",
        email:"aisha.k@domain.com",
        phone:"+1 (555) 765-4321"
    }
];

export default function PatientsTable(){

    return(

        <div className="table-container">

            <table>

                <thead>

                <tr>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Phone</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {patients.map((patient,index)=>(

                    <tr key={index}>

                        <td>{patient.name}</td>

                        <td>{patient.email}</td>

                        <td>{patient.phone}</td>

                        <td>

                            <button className="profile-btn">View Profile</button>

                            <button className="edit-btn">Edit</button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

            <div className="footer">

                <p>Showing 1-5 of 142 patients</p>

                <div>

                    <button>Previous</button>

                    <button>Next</button>

                </div>

            </div>

        </div>

    );

}