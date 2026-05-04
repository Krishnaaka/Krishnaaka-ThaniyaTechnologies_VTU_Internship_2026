// ═══════════════════════════════════════════════════════════
//  src/pages/Dashboard.jsx — Main Analytics View
//  Day 9: Statistical Overview & Recent Activity
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completedTasks: 0,
    team: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [projRes, taskRes, userRes] = await Promise.all([
          API.get("/projects"),
          API.get("/tasks"),
          API.get("/users")
        ]);

        if (projRes.data.success && taskRes.data.success) {
          const allTasks = taskRes.data.data;
          setStats({
            projects: projRes.data.count,
            tasks: allTasks.length,
            completedTasks: allTasks.filter(t => t.status === "done").length,
            team: userRes.data.success ? userRes.data.count : 1
          });
          setRecentProjects(projRes.data.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="dashboard-page">Loading Dashboard...</div>;

  return (
    <div className="dashboard-page">
      <header className="dashboard-welcome">
        <h1>Welcome back, {user?.name.split(' ')[0]}! 👋</h1>
        <p>Here's what's happening with your projects today.</p>
      </header>

      {/* ── Stats Overview ── */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(99, 102, 241, 0.1)", color: "#6366f1" }}>📁</div>
          <div className="stat-info">
            <h3>Active Projects</h3>
            <div className="stat-number">{stats.projects}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(168, 85, 247, 0.1)", color: "#a855f7" }}>📋</div>
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <div className="stat-number">{stats.tasks}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>✅</div>
          <div className="stat-info">
            <h3>Completed</h3>
            <div className="stat-number">{stats.completedTasks}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>👥</div>
          <div className="stat-info">
            <h3>Team Members</h3>
            <div className="stat-number">{stats.team}</div>
          </div>
        </div>
      </section>

      <div className="dashboard-content">
        {/* ── Recent Projects ── */}
        <section className="dashboard-card">
          <div className="card-header">
            <h2>Recent Projects</h2>
            <Link to="/projects" className="view-all">View All</Link>
          </div>
          <div className="activity-list">
            {recentProjects.map(p => (
              <div key={p._id} className="activity-item">
                <div className="activity-dot" style={{ background: p.color || "#6366f1", width: "4px" }} />
                <div className="activity-text">
                  <p><strong>{p.title}</strong></p>
                  <span>{p.taskCount || 0} tasks • {p.priority} priority</span>
                </div>
              </div>
            ))}
            {recentProjects.length === 0 && <p style={{ color: "#64748b" }}>No projects yet.</p>}
          </div>
        </section>

        {/* ── Quick Actions ── */}
        <section className="dashboard-card">
          <div className="card-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="activity-list" style={{ gap: "12px" }}>
            <Link to="/projects" className="add-project-btn" style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}>
              New Project
            </Link>
            <Link to="/tasks" className="btn-secondary" style={{ width: "100%", textAlign: "center", textDecoration: "none" }}>
              My Tasks
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
