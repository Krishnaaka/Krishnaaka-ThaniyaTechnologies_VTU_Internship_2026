// ═══════════════════════════════════════════════════════════
//  src/App.jsx — Root App Component
//  Day 1: Basic structure — React Router setup (routes added Day 6)
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { BrowserRouter, Routes, Route } from "react-router-dom";

// ─── Pages (to be built Day 6, 7, 8, 9) ─────────────────────
// Placeholder component for Day 1
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
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        padding: "3px",
        borderRadius: "20px",
        marginBottom: "24px"
      }}>
        <div style={{
          background: "#0f1117",
          borderRadius: "18px",
          padding: "40px 60px",
          textAlign: "center"
        }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "8px" }}>
            🚀 ProjectIQ
          </h1>
          <p style={{ color: "#6366f1", fontSize: "1.1rem", fontWeight: 600 }}>
            {page} — Coming Soon
          </p>
          <p style={{ color: "#64748b", marginTop: "12px", fontSize: "0.9rem" }}>
            Day 1 Setup Complete ✅
          </p>
          <p style={{ color: "#64748b", fontSize: "0.85rem" }}>
            VTU Internship 2026 | Krishna
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── App with Router ──────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login"    element={<ComingSoon page="Login" />} />
        <Route path="/register" element={<ComingSoon page="Register" />} />

        {/* App Routes */}
        <Route path="/"          element={<ComingSoon page="Dashboard" />} />
        <Route path="/projects"  element={<ComingSoon page="Projects" />} />
        <Route path="/tasks"     element={<ComingSoon page="Tasks (Kanban)" />} />
        <Route path="/team"      element={<ComingSoon page="Team" />} />

        {/* 404 */}
        <Route path="*"          element={<ComingSoon page="404 — Page Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
