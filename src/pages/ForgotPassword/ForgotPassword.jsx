import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaEnvelope, FaHeartbeat, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (!data.email) return;
    setSubmitted(true);
    toast.info("Password reset workflow is not connected yet.");
  };

  return (
    <div className="auth-page auth-page--simple">
      <div className="auth-card auth-card--simple">
        <div className="brand brand--auth">
          <span className="brand__mark">
            <FaHeartbeat />
          </span>
          <div>
            <span className="brand__name">HealthCare+</span>
            <span className="brand__caption">Account recovery</span>
          </div>
        </div>

        <div className="auth-form-header">
          <span className="section__eyebrow">Reset access</span>
          <h2>Forgot your password?</h2>
          <p>Enter your email and we&apos;ll guide you through the recovery flow.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field-group">
            <label htmlFor="email">Email address</label>
            <div className="input-shell">
              <FaEnvelope />
              <input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            </div>
          </div>

          <button type="submit" className="button button--primary button--full">
            <FaPaperPlane />
            Send reset link
          </button>
        </form>

        {submitted && <p className="success-note">If the email exists, a reset message will be sent.</p>}

        <p className="auth-switch">
          <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );
}
