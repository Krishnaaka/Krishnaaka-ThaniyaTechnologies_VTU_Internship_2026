/* ═══════════════════════════════════════════════════════════
   src/pages/Register.jsx — Register Page
   Day 6: Premium dark registration form
   Project: ProjectIQ Management Tool
   Author:  Krishna | VTU Internship 2026
══════════════════════════════════════════════════════════ */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Register() {
  const { register, user, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [localErr, setLocalErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState(0); // 0-4

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  // Clear errors when typing
  useEffect(() => {
    if (error) clearError();
    setLocalErr("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "password") calcStrength(value);
  };

  // Password strength meter
  const calcStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8)           score++;
    if (/[A-Z]/.test(pw))         score++;
    if (/[0-9]/.test(pw))         score++;
    if (/[^A-Za-z0-9]/.test(pw))  score++;
    setStrength(score);
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthClass = ["", "weak", "fair", "good", "strong"][strength];

  const validate = () => {
    if (!form.name.trim())   return "Full name is required.";
    if (form.name.trim().length < 2) return "Name must be at least 2 characters.";
    if (!form.email.trim())  return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email address.";
    if (!form.password)      return "Password is required.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErr = validate();
    if (validationErr) { setLocalErr(validationErr); return; }

    setSubmitting(true);
    const result = await register({
      name:     form.name.trim(),
      email:    form.email.trim(),
      password: form.password,
    });
    setSubmitting(false);

    if (result.success) {
      navigate("/", { replace: true });
    }
  };

  const displayError = localErr || error;

  return (
    <div className="auth-page">
      {/* Ambient blobs */}
      <div className="auth-blob auth-blob--purple" />
      <div className="auth-blob auth-blob--blue"   />

      <div className="auth-card auth-card--wide" role="main">
        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo__icon">⚡</span>
          <span className="auth-logo__text">ProjectIQ</span>
        </div>

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start managing projects smarter</p>

        {/* Error Banner */}
        {displayError && (
          <div className="auth-error" role="alert" id="register-error-banner">
            <span className="auth-error__icon">⚠</span>
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate id="register-form">
          {/* Full Name */}
          <div className="auth-field">
            <label htmlFor="reg-name" className="auth-label">Full name</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">👤</span>
              <input
                id="reg-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="auth-input"
                placeholder="Krishna Rao"
                autoComplete="name"
                autoFocus
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-field">
            <label htmlFor="reg-email" className="auth-label">Email address</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">✉</span>
              <input
                id="reg-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="auth-input"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label htmlFor="reg-password" className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">🔒</span>
              <input
                id="reg-password"
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="auth-input auth-input--pad-right"
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="auth-toggle-pass"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
            {/* Strength meter */}
            {form.password.length > 0 && (
              <div className="strength-wrap" aria-label={`Password strength: ${strengthLabel}`}>
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`strength-bar ${strength >= n ? `strength-bar--${strengthClass}` : ""}`}
                  />
                ))}
                <span className={`strength-label strength-label--${strengthClass}`}>
                  {strengthLabel}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="auth-field">
            <label htmlFor="reg-confirm" className="auth-label">Confirm password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">🔒</span>
              <input
                id="reg-confirm"
                type={showPass ? "text" : "password"}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                className={`auth-input ${
                  form.confirm && form.confirm !== form.password ? "auth-input--error" : ""
                }`}
                placeholder="Re-enter password"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            id="register-submit-btn"
            type="submit"
            className="auth-btn"
            disabled={submitting || loading}
          >
            {submitting ? (
              <span className="auth-btn__spinner" />
            ) : (
              "Create Account →"
            )}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-link" id="go-to-login">
            Sign in
          </Link>
        </p>

        <p className="auth-badge">VTU Internship 2026 · Day 6</p>
      </div>
    </div>
  );
}
