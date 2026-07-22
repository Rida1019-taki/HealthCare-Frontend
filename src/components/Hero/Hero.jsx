import './Hero.css';
import {Link} from "react-router-dom";

function Hero(){
    return(
        <section className="hero">
            <h1>HealthCare+</h1>
            <p>
                A professional clinical management portal designed for medical
                efficiency. Manage patient records, schedule appointments,
                and track health outcomes with surgical precision.
            </p>
            <Link to="/dashboard">
            <button>Go To Dashborad</button>
            </Link>
        </section>
    );
}
export default Hero;