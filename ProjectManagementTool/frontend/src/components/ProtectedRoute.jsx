// ═══════════════════════════════════════════════════════════
//  src/components/ProtectedRoute.jsx — Auth Guard
//  Day 6: Redirect unauthenticated users to /login
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wraps any route that requires authentication.
 * Shows a loading spinner while the auth state resolves.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // While restoring session from localStorage
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-base)",
        flexDirection: "column",
        gap: "20px",
      }}>
        <div style={{
          width: "44px", height: "44px",
          border: "3px solid rgba(99,102,241,0.3)",
          borderTop: "3px solid #6366f1",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "#6366f1", fontFamily: "Inter, sans-serif", fontSize: "0.9rem" }}>
          Loading ProjectIQ…
        </p>
      </div>
    );
  }

  // Not authenticated → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
