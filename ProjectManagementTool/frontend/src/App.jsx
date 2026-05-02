// ═══════════════════════════════════════════════════════════
//  src/App.jsx — Root App Component
//  Day 6: AuthProvider + Router + ProtectedRoute + Auth pages
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute  from "./components/ProtectedRoute";

// ─── Auth Pages (Day 6) ───────────────────────────────────
import Login    from "./pages/Login";
import Register from "./pages/Register";

// ─── Coming Soon Placeholder (Days 7-9) ──────────────────
function ComingSoon({ page }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#0f1117",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      gap: "16px",
    }}>
      <div style={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        padding: "3px",
        borderRadius: "20px",
      }}>
        <div style={{
          background: "#0f1117",
          borderRadius: "18px",
          padding: "40px 60px",
          textAlign: "center",
        }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "8px" }}>
            ⚡ ProjectIQ
          </h1>
          <p style={{ color: "#6366f1", fontSize: "1rem", fontWeight: 600 }}>
            {page} — Coming Day 7
          </p>
          <p style={{ color: "#64748b", marginTop: "12px", fontSize: "0.85rem" }}>
            Day 6 Auth Complete ✅
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── App with Router ──────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Public Auth Routes ────────────────────── */}
          <Route path="/login"    element={<Login    />} />
          <Route path="/register" element={<Register />} />

          {/* ── Protected App Routes ──────────────────── */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ComingSoon page="Dashboard" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ComingSoon page="Projects" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <ComingSoon page="Tasks (Kanban)" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <ComingSoon page="Team" />
              </ProtectedRoute>
            }
          />

          {/* ── 404 Fallback ──────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
