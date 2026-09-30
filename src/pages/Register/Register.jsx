import { useState } from "react";
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
  role: yup.string().required("Choose a role"),
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
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError("");

    const registerData = {
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      const response = await api.post("/auth/register", registerData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("profileId", response.data.profileId);

      navigate("/login");
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
            <span className="section__eyebrow">Join the platform</span>
            <h1>Start with a clean, secure healthcare workspace.</h1>
            <p>
              Create your account and begin managing care information in a simple, professional environment.
            </p>
          </div>

          <ul className="auth-proof">
            <li>
              <FaCheckCircle /> Professional onboarding flow
            </li>
            <li>
              <FaCheckCircle /> Protected account setup
            </li>
            <li>
              <FaCheckCircle /> Built for healthcare teams
            </li>
          </ul>

          <div className="auth-metrics">
            <div className="auth-metric">
              <strong>Instant</strong>
              <span>Account creation</span>
            </div>
            <div className="auth-metric">
              <strong>Role-based</strong>
              <span>Access controls</span>
            </div>
            <div className="auth-metric">
              <strong>Encrypted</strong>
              <span>Sign-up flow</span>
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

            <div className="field-grid">
              <div className="field-group">
                <label htmlFor="role">Role</label>
                <select id="role" {...register("role")}>
                  <option value="">Choose a role</option>
                  <option value="PATIENT">Patient</option>
                  <option value="MEDECIN">Doctor</option>
                </select>
                {errors.role?.message && <small className="field-error">{errors.role.message}</small>}
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
