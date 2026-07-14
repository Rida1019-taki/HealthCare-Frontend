import "./StaffTable.css";

const doctors = [
    {
        name: "Dr. Sarah Lee",
        specialty: "Cardiology",
        email: "sarah@healthcore.com",
        phone: "+1 (555) 123-4567",
        status: "Available",
    },
    {
        name: "Dr. James Bond",
        specialty: "Surgery",
        email: "james@healthcore.com",
        phone: "+1 (555) 987-6543",
        status: "Busy",
    },
    {
        name: "Dr. Emma Wilson",
        specialty: "Pediatrics",
        email: "emma@healthcore.com",
        phone: "+1 (555) 456-7890",
        status: "Available",
    },
    {
        name: "Dr. Michael Brown",
        specialty: "Neurology",
        email: "michael@healthcore.com",
        phone: "+1 (555) 765-4321",
        status: "On Leave",
    },
];

export default function StaffTable() {
    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Specialty</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {doctors.map((doctor, index) => (
                    <tr key={index}>
                        <td>{doctor.name}</td>
                        <td>{doctor.specialty}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.phone}</td>

                        <td>
                <span
                    className={`status ${doctor.status
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                >
                  {doctor.status}
                </span>
                        </td>

                        <td>
                            <button className="view">View</button>
                            <button className="edit">Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}