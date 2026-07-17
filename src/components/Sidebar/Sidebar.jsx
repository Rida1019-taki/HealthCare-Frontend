import "./Sidebar.css";
import {Link} from "react-router-dom";

export default function Sidebar(){
    return(
        <div className="sidebar">
            <h3>Management</h3>
            <ul>
                <Link to="/appointments">

                <li>Appointments</li>
                </Link>

                <Link to="/medical-records">

                <li>Medical Records</li>
                </Link>

                <Link to="/doctors">

                <li>Staff Directory</li>
                </Link>

                <Link to="/settings">

                <li>Settings</li>
                </Link>

            </ul>
        </div>
    );
}