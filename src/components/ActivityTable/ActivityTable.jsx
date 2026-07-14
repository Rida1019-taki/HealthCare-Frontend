import "./ActivityTable.css";

const patients=[
    {
        name:"Sarah Jenkins",
        dep:"Cardiology",
        status:"Completed",
        time:"08:45 AM"
    },
    {
        name:"Michael Chen",
        dep:"Neurology",
        status:"In Progress",
        time:"09:12 AM"
    },
    {
        name:"Elena Rodriguez",
        dep:"Pediatrics",
        status:"Urgent",
        time:"09:30 AM"
    },
    {
        name:"David Wilson",
        dep:"General",
        status:"Scheduled",
        time:"10:00 AM"
    }
];

export default function ActivityTable(){

    return(

        <div className="tableBox">

            <h3>Recent Activity</h3>

            <table>

                <thead>

                <tr>

                    <th>Patient</th>

                    <th>Department</th>

                    <th>Status</th>

                    <th>Time</th>

                </tr>

                </thead>

                <tbody>

                {patients.map((p,index)=>(

                    <tr key={index}>

                        <td>{p.name}</td>

                        <td>{p.dep}</td>

                        <td>{p.status}</td>

                        <td>{p.time}</td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );

}