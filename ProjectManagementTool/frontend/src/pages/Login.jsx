/* ═══════════════════════════════════════════════════════════
   src/pages/Login.jsx — Login Page
   Day 6: Premium dark auth form with animations
   Project: ProjectIQ Management Tool
   Author:  Krishna | VTU Internship 2026
══════════════════════════════════════════════════════════ */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const { login, user, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [localErr, setLocalErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  // Clear server error when typing
  useEffect(() => {
    if (error) clearError();
    setLocalErr("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.email.trim())    return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email address.";
    if (!form.password)        return "Password is required.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErr = validate();
    if (validationErr) { setLocalErr(validationErr); return; }

    setSubmitting(true);
    const result = await login({ email: form.email, password: form.password });
    setSubmitting(false);

    if (result.success) {
      navigate("/", { replace: true });
    }
  };

  const displayError = localErr || error;

  return (
    <div className="auth-page">
      {/* ── Ambient background blobs ── */}
      <div className="auth-blob auth-blob--purple" />
      <div className="auth-blob auth-blob--blue"   />

      <div className="auth-card" role="main">
        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo__icon">⚡</span>
          <span className="auth-logo__text">Project Management</span>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your workspace</p>

        {/* Error Banner */}
        {displayError && (
          <div className="auth-error" role="alert" id="login-error-banner">
            <span className="auth-error__icon">⚠</span>
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate id="login-form">
          {/* Email */}
          <div className="auth-field">
            <label htmlFor="login-email" className="auth-label">Email address</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">✉</span>
              <input
                id="login-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="auth-input"
                placeholder="you@example.com"
                autoComplete="email"
                autoFocus
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <div className="auth-label-row">
              <label htmlFor="login-password" className="auth-label">Password</label>
              <button type="button" className="auth-forgot" tabIndex={-1}>
                Forgot password?
              </button>
            </div>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">🔒</span>
              <input
                id="login-password"
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="auth-input auth-input--pad-right"
                placeholder="••••••••"
                autoComplete="current-password"
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
          </div>

          {/* Submit */}
          <button
            id="login-submit-btn"
            type="submit"
            className="auth-btn"
            disabled={submitting || loading}
          >
            {submitting ? (
              <span className="auth-btn__spinner" />
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link" id="go-to-register">
            Create one free
          </Link>
        </p>

        <p className="auth-badge">VTU Internship 2026 · Day 10</p>
      </div>
    </div>
  );
}
