// ═══════════════════════════════════════════════════════════
//  src/components/Layout.jsx — App Layout Wrapper
//  Day 8: Basic layout with Sidebar & Topbar for the Dashboard
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Layout.css";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo-icon">⚡</span>
          <span className="sidebar-logo-text">ProjectIQ</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end>
            <span className="nav-icon">📊</span> Dashboard
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <span className="nav-icon">📁</span> Projects
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <span className="nav-icon">📋</span> Tasks (Kanban)
          </NavLink>
          <NavLink to="/team" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <span className="nav-icon">👥</span> Team
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.charAt(0).toUpperCase() || "U"}</div>
            <div className="user-details">
              <span className="user-name">{user?.name || "User"}</span>
              <span className="user-role">{user?.role || "Member"}</span>
            </div>
          </div>
          <button onClick={logout} className="logout-btn" title="Sign out">
            🚪
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-search">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search tasks, projects..." className="search-input" />
          </div>
          <div className="topbar-actions">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">⚙️</button>
          </div>
        </header>

        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
