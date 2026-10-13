import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCheckCircle,
  FaFileAlt,
  FaHeartbeat,
  FaLock,
  FaBell,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    title: "Patient Electronic Records",
    text: "Centralize medical history, diagnoses, contact details, and vital demographics in an encrypted registry.",
    icon: FaUsers,
  },
  {
    title: "Clinical Appointment Scheduling",
    text: "Coordinate practitioner schedules, confirm consultations, and manage pending intake requests seamlessly.",
    icon: FaCalendarCheck,
  },
  {
    title: "Diagnostic & EHR Notes",
    text: "Create structured clinical observations, diagnosis records, and export comprehensive PDF patient reports.",
    icon: FaFileAlt,
  },
  {
    title: "Role-Based Access Governance",
    text: "Enforce strict role separation between Administrators, Physicians, and Patients for data confidentiality.",
    icon: FaLock,
  },
  {
    title: "Real-Time Activity Monitoring",
    text: "Track practice workload, active consultations, and operational alerts across the medical center.",
    icon: FaBell,
  },
  {
    title: "Operational Practice Reporting",
    text: "Gain visibility into patient inflow, appointment completion rates, and provider utilization.",
    icon: FaChartLine,
  },
];

const steps = [
  {
    title: "Secure Authentication & Role Onboarding",
    text: "Sign in with multi-role credentials (Administrator, Medical Doctor, or Patient) with immediate permission provisioning.",
  },
  {
    title: "Clinical Record Management & Scheduling",
    text: "Manage patient dossiers, schedule upcoming appointments, and record clinical diagnoses with ease.",
  },
  {
    title: "Report Generation & Coordinated Care",
    text: "Instantly compile patient dossiers into standardized PDF summaries for clinical handoffs and compliance.",
  },
];

const benefits = [
  {
    title: "Clinical Confidentiality",
    text: "Strict data privacy standards designed for medical information workflows and role-scoped permissions.",
  },
  {
    title: "Zero Visual Clutter",
    text: "High-density, calm ergonomic layout designed for practitioners who need speed, accuracy, and focus.",
  },
  {
    title: "Exportable Reports",
    text: "Generate official PDF medical records and appointment schedules with a single click.",
  },
  {
    title: "Responsive Care Coordination",
    text: "Engineered for desktops, consultation room tablets, and mobile devices without losing operational fidelity.",
  },
];

function Home() {
  const token = localStorage.getItem("token");
  const rawRole = localStorage.getItem("role") || "";
  const role = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();
  const workspacePath = role === "ADMIN" ? "/dashboard" : "/appointments";

  return (
    <div className="landing-page">
      <Navbar variant="public" />

      <main className="landing-main">
        {/* Hero Section */}
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <span className="section__eyebrow">Enterprise Healthcare Information System</span>
            <h1>Clinical Management Built for Medical Excellence</h1>
            <p className="landing-hero__lede">
              HealthCare+ provides medical centers, clinicians, and patients with a unified platform for electronic health records, consultation scheduling, and secure care workflows.
            </p>

            <div className="landing-hero__actions">
              {token ? (
                <Link to={workspacePath} className="button button--primary">
                  Enter Medical Workspace
                  <FaArrowRight />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="button button--primary">
                    Create Practice Account
                    <FaArrowRight />
                  </Link>
                  <a href="#features" className="button button--ghost">
                    Explore Platform Features
                  </a>
                </>
              )}
            </div>

            <div className="landing-hero__trust">
              <span>
                <FaShieldAlt />
                Role-Based Access
              </span>
              <span>
                <FaCheckCircle />
                PDF Dossier Generation
              </span>
              <span>
                <FaHeartbeat />
                Doctor & Patient Portals
              </span>
            </div>
          </div>

          {/* Realistic Clinical Preview UI */}
          <div className="landing-hero__preview" aria-hidden="true">
            <div className="preview-card preview-card--metric">
              <span className="preview-card__label">Real-Time Clinical Status</span>
              <strong>Today&apos;s Schedule Overview</strong>
              <p>Active consultations, diagnostic reviews, and patient registry metrics.</p>
            </div>

            <div className="preview-card preview-card--list">
              <div className="preview-card__row">
                <div>
                  <strong>Sarah Jenkins</strong>
                  <span>Cardiology Consultation • 10:00 AM</span>
                </div>
                <span className="preview-status preview-status--success">Confirmed</span>
              </div>
              <div className="preview-card__row">
                <div>
                  <strong>Michael Chen</strong>
                  <span>Neurology Follow-up • 11:30 AM</span>
                </div>
                <span className="preview-status preview-status--warning">Pending</span>
              </div>
              <div className="preview-card__row">
                <div>
                  <strong>Elena Rodriguez</strong>
                  <span>Pediatrics Assessment • 01:15 PM</span>
                </div>
                <span className="preview-status preview-status--success">Confirmed</span>
              </div>
            </div>

            <div className="preview-card">
              <span className="preview-card__label">EHR Statistics</span>
              <div className="preview-grid">
                <div>
                  <span>Patients</span>
                  <strong>128</strong>
                </div>
                <div>
                  <span>Records</span>
                  <strong>342</strong>
                </div>
                <div>
                  <span>Physicians</span>
                  <strong>14</strong>
                </div>
                <div>
                  <span>Completed</span>
                  <strong>98%</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Standard Compliance Band */}
        <section className="trust-band">
          <div>Role-Based Permissions</div>
          <div>Encrypted Electronic Health Records</div>
          <div>Physician & Patient Portals</div>
          <div>PDF Clinical Exporting</div>
        </section>

        {/* Features Section */}
        <section id="features" className="landing-section">
          <div className="section__header">
            <span className="section__eyebrow">Platform Capabilities</span>
            <h2>Complete Clinical Workflow Management</h2>
            <p>Designed to support the day-to-day requirements of practitioners, clinic administrators, and patients.</p>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="feature-card">
                  <div className="feature-card__top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <Icon />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Workflow Section */}
        <section id="workflow" className="landing-section landing-section--split">
          <div className="section__header">
            <span className="section__eyebrow">Operational Flow</span>
            <h2>Structured for Rapid Clinical Handoffs</h2>
            <p>
              From patient intake to post-consultation diagnosis filing, the platform maintains a continuous, documented audit trail.
            </p>
          </div>

          <div className="step-list">
            {steps.map((step, index) => (
              <div key={step.title} className="step-card">
                <span>{index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why HealthCare+ Section */}
        <section id="why" className="landing-section landing-section--why">
          <div className="section__header">
            <span className="section__eyebrow">Clinical Reliability</span>
            <h2>Why Healthcare Facilities Trust HealthCare+</h2>
            <p>
              Built specifically for clinical environments requiring clear information architecture, high legibility, and dependable access controls.
            </p>
          </div>

          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="benefit-card">
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-panel">
          <div>
            <span className="section__eyebrow">Get Started</span>
            <h2>Empower Your Medical Practice Today</h2>
            <p>Set up your account to start managing patients, appointments, and electronic medical dossiers.</p>
          </div>

          <Link to="/register" className="button button--primary">
            Register Medical Account
            <FaArrowRight />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
