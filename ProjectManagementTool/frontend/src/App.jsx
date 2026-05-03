// ═══════════════════════════════════════════════════════════
//  src/App.jsx — Root App Component
//  Day 8: AuthProvider + Router + ProtectedRoute + Auth pages + Layout
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute  from "./components/ProtectedRoute";
import Layout          from "./components/Layout";

// ─── Pages ───────────────────────────────────────────────
import Login    from "./pages/Login";
import Register from "./pages/Register";
import Tasks    from "./pages/Tasks";

// ─── Coming Soon Placeholder ─────────────────────────────
function ComingSoon({ page }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      background: "#0f1117",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      gap: "16px",
      borderRadius: "16px"
    }}>
      <h1 style={{ fontSize: "2.2rem", fontWeight: 800 }}>⚡ ProjectIQ</h1>
      <p style={{ color: "#6366f1", fontSize: "1rem" }}>{page} — Coming Soon</p>
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

          {/* ── Protected App Routes (Wrapped in Layout) ─ */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index          element={<ComingSoon page="Dashboard" />} />
            <Route path="projects" element={<ComingSoon page="Projects" />} />
            <Route path="tasks"    element={<Tasks />} />
            <Route path="team"     element={<ComingSoon page="Team" />} />
          </Route>

          {/* ── 404 Fallback ──────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
