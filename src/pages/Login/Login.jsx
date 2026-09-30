import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaHeartbeat,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import api from "../../services/api";

const schema = yup.object({
  email: yup.string().email("Enter a valid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(8, "Minimum 8 characters"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError("");

    try {
      const response = await api.post("/auth/login", {
        email: data.email.trim(),
        password: data.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("profileId", response.data.profileId);

      const role = response.data.role;

      if (role === "ADMIN") {
        navigate("/dashboard");
      } else if (role === "MEDECIN") {
        navigate("/appointments");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setAuthError(
        (typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message) || "Unable to sign in. Check your credentials and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-card auth-card--split">
        <aside className="auth-panel auth-panel--brand">
          <div className="brand brand--auth">
            <span className="brand__mark">
              <FaHeartbeat />
            </span>
            <div>
              <span className="brand__name">HealthCare+</span>
              <span className="brand__caption">Secure care operations</span>
            </div>
          </div>

          <div className="auth-panel__copy">
            <span className="section__eyebrow">Professional access</span>
            <h1>Work faster, with less friction.</h1>
            <p>
              Sign in to manage patients, appointments, and records in a workspace designed for clear clinical
              operations.
            </p>
          </div>

          <ul className="auth-proof">
            <li>
              <FaCheckCircle /> Centralized patient and appointment workflows
            </li>
            <li>
              <FaCheckCircle /> Clear role-based access for teams
            </li>
            <li>
              <FaCheckCircle /> Fast, focused interface with subtle interactions
            </li>
          </ul>

          <div className="auth-illustration">
            <div className="mini-card mini-card--primary">
              <strong>Secure login</strong>
              <span>Protected authentication and clean session management.</span>
            </div>
            <div className="mini-card">
              <FaShieldAlt />
              <span>Built for privacy-first healthcare teams</span>
            </div>
          </div>

          <div className="auth-metrics">
            <div className="auth-metric">
              <strong>99.9%</strong>
              <span>Session integrity</span>
            </div>
            <div className="auth-metric">
              <strong>24/7</strong>
              <span>Workspace access</span>
            </div>
            <div className="auth-metric">
              <strong>3 sec</strong>
              <span>Typical sign in</span>
            </div>
          </div>
        </aside>

        <main className="auth-panel auth-panel--form">
          <div className="auth-form-header">
            <span className="section__eyebrow">Welcome back</span>
            <h2>Sign in to your workspace</h2>
            <p>Use your account credentials to continue.</p>
          </div>

          {authError && (
            <div className="auth-error" role="alert">
              {authError}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field-group">
              <label htmlFor="email">Email address</label>
              <div className="input-shell">
                <FaEnvelope />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email")}
                />
              </div>
              {errors.email?.message && <small className="field-error">{errors.email.message}</small>}
            </div>

            <div className="field-group">
              <div className="field-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="text-link">
                  Forgot password?
                </Link>
              </div>
              <div className="input-shell input-shell--password">
                <FaLock />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

            <div className="form-row form-row--split">
              <label className="checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            <button type="submit" className="button button--primary button--full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
              {!isSubmitting && <FaArrowRight />}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </main>
      </div>
    </div>
  );
}

export default Login;
