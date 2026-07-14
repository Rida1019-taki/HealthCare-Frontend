import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import StatsCard from "../components/StatsCard/StatsCard";
import ActivityTable from "../components/ActivityTable/ActivityTable";
import Alerts from "../components/Alerts/Alerts";
import Staff from "../components/Staff/Staff";
import "./Dashboard.css";

export default function Dashboard(){
    return(
        <>
            <Navbar/>
            <div className="dashboard">
                <Sidebar/>
                <main className="content">
                    <h1>
                        Clinical Dashboard
                    </h1>
                    <p className="status">
                        System Status: Operational • Last Updated: 09:42 AM
                    </p>
                    <div className="stats">
                        <StatsCard
                            title="TOTAL PATIENTS"
                            value="1,284"
                        />

                        <StatsCard
                            title="CONSULTATIONS"
                            value="42"
                        />

                        <StatsCard
                            title="PENDING REPORTS"
                            value="18"
                        />

                        <StatsCard
                            title="AVAILABLE STAFF"
                            value="36"
                        />

                    </div>

                    <div className="bottom">
                        <ActivityTable/>
                        <div className="right">
                            <Alerts/>
                            <Staff/>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
