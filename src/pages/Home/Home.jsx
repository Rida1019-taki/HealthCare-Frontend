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
  { title: "Patient profiles", text: "Keep contact details, history, and context in one reliable record.", icon: FaUsers },
  { title: "Scheduling", text: "Coordinate visits, status changes, and follow-ups without clutter.", icon: FaCalendarCheck },
  { title: "Medical records", text: "Review diagnoses, notes, and treatment history from a single place.", icon: FaFileAlt },
  { title: "Secure access", text: "Protect the workspace with role-aware authentication and sessions.", icon: FaLock },
  { title: "Notifications", text: "Surface reminders and updates that teams can act on quickly.", icon: FaBell },
  { title: "Reporting", text: "Check the current activity level of the practice at a glance.", icon: FaChartLine },
];

const steps = [
  {
    title: "Set up the workspace",
    text: "Register your account and choose the role that matches your responsibilities.",
  },
  {
    title: "Organize the care flow",
    text: "Track patients, appointments, and records in a structured workspace.",
  },
  {
    title: "Keep everyone aligned",
    text: "Use notifications and dashboards to keep handoffs clear across the team.",
  },
];

const benefits = [
  { title: "Governed", text: "Access is structured so the right people see the right information." },
  { title: "Focused", text: "The interface keeps attention on tasks, not on visual noise." },
  { title: "Consistent", text: "Navigation, spacing, and hierarchy stay predictable across screens." },
  { title: "Fast", text: "Important actions stay within a short reach from anywhere in the app." },
];

function Home() {
  return (
    <div className="landing-page">
      <Navbar variant="public" />

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <span className="section__eyebrow">Clinical operations platform</span>
            <h1>Built for the rhythm of a real clinic.</h1>
            <p className="landing-hero__lede">
              A calm, professional workspace for patient coordination, scheduling, records, and secure team access.
            </p>

            <div className="landing-hero__actions">
              <Link to="/register" className="button button--primary">
                Get Started
                <FaArrowRight />
              </Link>
              <a href="#features" className="button button--ghost">
                Explore Features
              </a>
            </div>

            <div className="landing-hero__trust">
              <span>
                <FaShieldAlt />
                Protected access
              </span>
              <span>
                <FaCheckCircle />
                Role-based control
              </span>
              <span>
                <FaCheckCircle />
                Clear daily workflow
              </span>
            </div>
          </div>

          <div className="landing-hero__preview" aria-hidden="true">
            <div className="preview-stack preview-stack--top">
              <div className="preview-card preview-card--metric">
                <span className="preview-card__label">Operations today</span>
                <strong>24 appointments</strong>
                <p>3 confirmed, 2 pending, and 1 urgent follow-up waiting review.</p>
              </div>

              <div className="preview-card preview-card--list">
                <div className="preview-card__row">
                  <div>
                    <strong>Sarah Jenkins</strong>
                    <span>Cardiology • 10:00 AM</span>
                  </div>
                  <span className="preview-status preview-status--success">Confirmed</span>
                </div>
                <div className="preview-card__row">
                  <div>
                    <strong>Michael Chen</strong>
                    <span>Neurology • 11:30 AM</span>
                  </div>
                  <span className="preview-status preview-status--warning">Pending</span>
                </div>
                <div className="preview-card__row">
                  <div>
                    <strong>Elena Rodriguez</strong>
                    <span>Pediatrics • 01:15 PM</span>
                  </div>
                  <span className="preview-status preview-status--danger">Urgent</span>
                </div>
              </div>
            </div>

            <div className="preview-card preview-card--workflow">
              <div className="preview-card__header">
                <div>
                  <span className="preview-card__label">Clinical control</span>
                  <strong>Workspace snapshot</strong>
                </div>
                <FaHeartbeat />
              </div>

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
                  <span>Doctors</span>
                  <strong>09</strong>
                </div>
                <div>
                  <span>Unread</span>
                  <strong>06</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-band">
          <div>Encrypted records</div>
          <div>Team-ready access</div>
          <div>Appointment visibility</div>
          <div>Dashboard reporting</div>
        </section>

        <section id="features" className="landing-section">
          <div className="section__header">
            <span className="section__eyebrow">Features</span>
            <h2>Everything important, organized with restraint.</h2>
            <p>The product stays quiet and structured so the care workflow feels under control.</p>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="feature-card feature-card--numbered">
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

        <section id="workflow" className="landing-section landing-section--split">
          <div className="landing-panel">
            <span className="section__eyebrow">How it works</span>
            <h2>Three steps to a clearer clinical workflow.</h2>
            <p>
              The product is designed to feel immediate: sign in, organize data, and keep the team aligned around the
              same source of truth.
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

        <section id="why" className="landing-section landing-section--why">
          <div className="landing-panel">
            <span className="section__eyebrow">Why HealthCare+</span>
            <h2>A professional interface that helps the system feel under control.</h2>
            <p>
              The design focuses on hierarchy, readable data tables, and low-friction navigation. It should feel like
              a real product used in a clinic, not a demo.
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

        <section className="cta-panel">
          <div>
            <span className="section__eyebrow">Ready to begin</span>
            <h2>Create your HealthCare+ account.</h2>
            <p>Set up the workspace and start managing care with clarity and confidence.</p>
          </div>

          <Link to="/register" className="button button--primary">
            Get Started
            <FaArrowRight />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
