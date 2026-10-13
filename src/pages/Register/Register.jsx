import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaHeartbeat,
  FaLock,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";

const schema = yup.object({
  username: yup.string().required("Full name is required").min(3, "Minimum 3 characters"),
  email: yup.string().email("Enter a valid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(8, "Minimum 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  role: yup.string().default("PATIENT"),
  terms: yup.boolean().oneOf([true], "Please accept the terms"),
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "PATIENT",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rawRole = localStorage.getItem("role") || "";
    const normalizedRole = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();

    if (token) {
      if (normalizedRole === "ADMIN") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/appointments", { replace: true });
      }
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError("");

    const registerData = {
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role || "PATIENT",
    };

    try {
      const response = await api.post("/auth/register", registerData);

      const rawRole = response.data?.role || "";
      const normalizedRole = rawRole.replace(/^ROLE_/, "").trim().toUpperCase();

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("role", normalizedRole);
      localStorage.setItem("profileId", response.data.profileId);

      if (normalizedRole === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/appointments");
      }
    } catch (error) {
      setAuthError(
        (typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message) || "Unable to create your account. Review the details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-card auth-card--stacked">
        <aside className="auth-panel auth-panel--brand auth-panel--compact">
          <div className="brand brand--auth">
            <span className="brand__mark">
              <FaHeartbeat />
            </span>
            <div>
              <span className="brand__name">HealthCare+</span>
              <span className="brand__caption">Create your secure account</span>
            </div>
          </div>

          <div className="auth-panel__copy">
            <span className="section__eyebrow">Patient Registration</span>
            <h1>Register for HealthCare+</h1>
            <p>
              Join the healthcare network to manage appointments, access clinical dossiers, and consult with doctors.
            </p>
          </div>

          <ul className="auth-proof">
            <li>
              <FaCheckCircle /> Verified Patient Account Provisioning
            </li>
            <li>
              <FaCheckCircle /> Protected Health Information (PHI) Compliant
            </li>
            <li>
              <FaCheckCircle /> Instant Access to Scheduling & Health Records
            </li>
          </ul>

          <div className="auth-metrics">
            <div className="auth-metric">
              <strong>Patient</strong>
              <span>Self-Care Portal</span>
            </div>
            <div className="auth-metric">
              <strong>24/7</strong>
              <span>Online Booking</span>
            </div>
            <div className="auth-metric">
              <strong>Secure</strong>
              <span>End-to-End SSL</span>
            </div>
          </div>
        </aside>

        <main className="auth-panel auth-panel--form">
          <div className="auth-form-header">
            <span className="section__eyebrow">Create account</span>
            <h2>Register your HealthCare+ account</h2>
            <p>Enter your details to continue.</p>
          </div>

          {authError && (
            <div className="auth-error" role="alert">
              {authError}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field-group">
              <label htmlFor="username">Full name</label>
              <div className="input-shell">
                <FaUser />
                <input id="username" type="text" placeholder="Jane Doe" {...register("username")} />
              </div>
              {errors.username?.message && <small className="field-error">{errors.username.message}</small>}
            </div>

            <div className="field-group">
              <label htmlFor="email">Email address</label>
              <div className="input-shell">
                <FaEnvelope />
                <input id="email" type="email" placeholder="jane@example.com" {...register("email")} />
              </div>
              {errors.email?.message && <small className="field-error">{errors.email.message}</small>}
            </div>

            <div className="role-picker">
              <div className="role-picker__label">
                <label>Account Type</label>
                <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 500 }}>
                  Patient Portal
                </span>
              </div>

              <div className="role-option role-option--active" style={{ cursor: "default" }}>
                <input type="hidden" value="PATIENT" {...register("role")} />
                <div className="role-option__icon">
                  <FaUser />
                </div>
                <div className="role-option__content">
                  <span className="role-option__title">Patient</span>
                  <span className="role-option__desc">Appointments & personal health records</span>
                </div>
                <div className="role-option__check">
                  <div className="role-option__check-dot" />
                </div>
              </div>
            </div>

            <div className="field-grid">
              <div className="field-group">
                <label htmlFor="password">Password</label>
                <div className="input-shell input-shell--password">
                  <FaLock />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="icon-button icon-button--inline"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password?.message && <small className="field-error">{errors.password.message}</small>}
              </div>

              <div className="field-group">
                <label htmlFor="confirmPassword">Confirm password</label>
                <div className="input-shell input-shell--password">
                  <FaLock />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="icon-button icon-button--inline"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirmPassword((current) => !current)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword?.message && <small className="field-error">{errors.confirmPassword.message}</small>}
              </div>
            </div>

            <label className="checkbox">
              <input type="checkbox" {...register("terms")} />
              <span>I agree to the terms of use and privacy policy.</span>
            </label>
            {errors.terms?.message && <small className="field-error">{errors.terms.message}</small>}

            <button type="submit" className="button button--primary button--full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
              {!isSubmitting && <FaArrowRight />}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
            <span>
              <FaShieldAlt /> Secure onboarding and protected access.
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;
