// ═══════════════════════════════════════════════════════════
//  src/pages/Team.jsx — Team Directory View
//  Day 9: List of registered users / collaborators
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import API from "../api/axios";
import "./Projects.css"; // Reuse card styles

export default function Team() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await API.get("/users");
        if (res.data.success) {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error("Team fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="projects-page">Loading Team...</div>;

  return (
    <div className="projects-page">
      <header className="projects-header">
        <div className="projects-title">
          <h1>Team Members</h1>
          <p>There are {users.length} registered collaborators in ProjectIQ.</p>
        </div>
      </header>

      <div className="projects-grid">
        {users.map((u) => (
          <div key={u._id} className="project-card" style={{ cursor: "default" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div 
                className="avatar-large" 
                style={{ 
                  width: "60px", 
                  height: "60px", 
                  borderRadius: "16px", 
                  background: "#6366f1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: "#fff",
                  fontWeight: "bold"
                }}
              >
                {u.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="project-title" style={{ margin: 0 }}>{u.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{u.role || "Member"}</p>
              </div>
            </div>
            
            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "0.85rem" }}>
                <span>📧</span> {u.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
