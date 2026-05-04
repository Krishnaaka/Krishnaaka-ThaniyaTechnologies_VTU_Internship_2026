// ═══════════════════════════════════════════════════════════
//  src/App.jsx — Root App Component
//  Day 8: AuthProvider + Router + ProtectedRoute + Auth pages + Layout
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider }  from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute    from "./components/ProtectedRoute";
import Layout            from "./components/Layout";

// ─── Pages ───────────────────────────────────────────────
import Login     from "./pages/Login";
import Register  from "./pages/Register";
import Tasks     from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Projects  from "./pages/Projects";
import Team      from "./pages/Team";

// ─── App with Router ──────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
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
              <Route index          element={<Dashboard />} />
              <Route path="projects" element={<Projects  />} />
              <Route path="tasks"    element={<Tasks     />} />
              <Route path="team"     element={<Team      />} />
            </Route>

            {/* ── 404 Fallback ──────────────────────────── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
