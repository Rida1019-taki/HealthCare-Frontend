import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaUserMd, FaShieldAlt, FaHospital } from "react-icons/fa";

function About() {
  return (
    <div className="landing-page">
      <Navbar variant="public" />

      <main className="landing-main">
        <section className="landing-section">
          <div className="section__header" style={{ maxWidth: "56rem" }}>
            <span className="section__eyebrow">Institutional Overview</span>
            <h1>About HealthCare+ Clinical Information System</h1>
            <p>
              HealthCare+ is a unified Electronic Health Record (EHR) and clinical operations platform engineered to empower medical practitioners, hospital administrators, and patients with secure, accurate, and accessible health data management.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-card__top">
                <FaUserMd style={{ fontSize: "1.5rem", color: "var(--primary)" }} />
              </div>
              <h3>Clinical Mission</h3>
              <p>
                To streamline patient coordination, eliminate data fragmentation, and deliver reliable clinical record workflows that support superior patient outcomes.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-card__top">
                <FaHospital style={{ fontSize: "1.5rem", color: "var(--primary)" }} />
              </div>
              <h3>Healthcare Vision</h3>
              <p>
                To equip medical institutions of all scales with an enterprise-grade digital foundation that balances operational efficiency with strict clinical ergonomics.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-card__top">
                <FaShieldAlt style={{ fontSize: "1.5rem", color: "var(--primary)" }} />
              </div>
              <h3>Confidentiality & Compliance</h3>
              <p>
                Patient data integrity is preserved using encrypted storage, certified role-based permissions, and end-to-end access audit trails.
              </p>
            </article>
          </div>

          <div className="cta-panel" style={{ marginTop: "3rem" }}>
            <div>
              <span className="section__eyebrow">Medical Collaboration</span>
              <h2>Ready to Modernize Your Clinical Workflows?</h2>
              <p>Join physicians, healthcare practitioners, and patients on HealthCare+.</p>
            </div>
            <a href="/register" className="button button--primary">
              Get Started
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;