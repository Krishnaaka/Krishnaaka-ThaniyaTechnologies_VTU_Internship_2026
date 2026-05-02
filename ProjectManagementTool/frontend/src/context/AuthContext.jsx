// ═══════════════════════════════════════════════════════════
//  src/context/AuthContext.jsx — Global Auth State
//  Day 6: JWT-based auth context with login/register/logout
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../api/axios";

// ─── Create Context ────────────────────────────────────────
const AuthContext = createContext(null);

// ─── Auth Provider ─────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);   // resolving stored session
  const [error, setError]     = useState(null);

  // ── Restore session from localStorage on mount ────────────
  useEffect(() => {
    const storedUser  = localStorage.getItem("projectiq_user");
    const storedToken = localStorage.getItem("projectiq_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ── Clear auth error helper ────────────────────────────────
  const clearError = useCallback(() => setError(null), []);

  // ── Register ───────────────────────────────────────────────
  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("projectiq_token", data.token);
      localStorage.setItem("projectiq_user",  JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Try again.";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Login ──────────────────────────────────────────────────
  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("projectiq_token", data.token);
      localStorage.setItem("projectiq_user",  JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password.";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Logout ─────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem("projectiq_token");
    localStorage.removeItem("projectiq_user");
    setUser(null);
    setError(null);
  }, []);

  // ── Expose context value ──────────────────────────────────
  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export default AuthContext;
