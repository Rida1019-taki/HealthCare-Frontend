import "./Sidebar.css";

export default function Sidebar(){
    return(
        <div className="sidebar">
            <h3>Management</h3>
            <ul>
                <li>Appointments</li>

                <li>Medical Records</li>

                <li>Staff Directory</li>

                <li>Settings</li>

            </ul>
        </div>
    );
}