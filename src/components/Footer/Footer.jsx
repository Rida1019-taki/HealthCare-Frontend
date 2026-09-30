import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <div className="brand">
          <span className="brand__mark">
            <FaHeartbeat />
          </span>
          <div>
            <span className="brand__name">HealthCare+</span>
            <span className="brand__caption">Professional medical workspace</span>
          </div>
        </div>
        <p>Secure, simple and reliable healthcare management for modern teams.</p>
      </div>

      <div className="site-footer__links">
        <div>
          <h3>Navigation</h3>
          <Link to="/">Home</Link>
          <a href="#features">Features</a>
          <a href="#workflow">How It Works</a>
        </div>
        <div>
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
      </div>

      <div className="site-footer__meta">
        <p>Copyright {new Date().getFullYear()} HealthCare+. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
