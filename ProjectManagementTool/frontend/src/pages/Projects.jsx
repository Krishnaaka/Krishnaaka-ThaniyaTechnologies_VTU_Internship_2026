// ═══════════════════════════════════════════════════════════
//  src/pages/Projects.jsx — Project Management View
//  Day 9: Full CRUD for Projects + Premium UI
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useToast } from "../context/ToastContext";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    deadline: "",
    color: "#6366f1",
  });
  const navigate = useNavigate();

  // ─── Fetch Projects ───────────────────────────────────────
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get("/projects");
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      addToast("Error", "Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ─── Handle Create ────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/projects", formData);
      if (res.data.success) {
        addToast("Success", `Project "${formData.title}" created!`, "success");
        setShowModal(false);
        setFormData({ title: "", description: "", priority: "medium", deadline: "", color: "#6366f1" });
        fetchProjects();
      }
    } catch (err) {
      addToast("Failed", err.response?.data?.message || "Creation failed", "error");
    }
  };

  // ─── Handle Delete ────────────────────────────────────────
  const handleDelete = async (e, id, title) => {
    e.stopPropagation(); 
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    
    try {
      const res = await API.delete(`/projects/${id}`);
      if (res.data.success) {
        addToast("Deleted", `Project "${title}" removed.`, "info");
        fetchProjects();
      }
    } catch (err) {
      addToast("Error", "Failed to delete project", "error");
    }
  };

  // ─── Render Helpers ───────────────────────────────────────
  const getProgress = (p) => {
    if (!p.taskCount) return 0;
    return Math.round((p.doneTasks / p.taskCount) * 100);
  };

  if (loading) {
    return (
      <div className="projects-page">
        <div className="loading-shimmer">Loading Projects...</div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <header className="projects-header">
        <div className="projects-title">
          <h1>My Projects</h1>
          <p>You have {projects.length} active projects in your workspace.</p>
        </div>
        <button className="add-project-btn" onClick={() => setShowModal(true)}>
          <span>+</span> New Project
        </button>
      </header>

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <h2>No projects found</h2>
          <p>Start by creating your first project to organize your tasks.</p>
          <button className="add-project-btn" style={{ margin: "20px auto" }} onClick={() => setShowModal(true)}>
            Create First Project
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div 
              key={project._id} 
              className="project-card"
              onClick={() => navigate(`/tasks?project=${project._id}`)}
            >
              <div className="project-card-header">
                <span className={`project-badge badge-${project.priority}`}>
                  {project.priority}
                </span>
                <button 
                  className="project-options-btn" 
                  onClick={(e) => handleDelete(e, project._id, project.title)}
                >
                  🗑️
                </button>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description || "No description provided."}</p>

              <div className="project-stats">
                <span className="stats-label">Progress</span>
                <span className="stats-value">{getProgress(project)}%</span>
              </div>
              
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${getProgress(project)}%`,
                    background: project.color || "#6366f1"
                  }}
                />
              </div>

              <div className="project-footer">
                <div className="team-avatars">
                  <div className="avatar-mini" style={{ background: project.color }}>
                    {project.owner?.name?.charAt(0).toUpperCase()}
                  </div>
                  {project.members?.slice(0, 2).map(m => (
                    <div key={m._id} className="avatar-mini">
                      {m.name?.charAt(0).toUpperCase()}
                    </div>
                  ))}
                  {project.members?.length > 2 && (
                    <div className="avatar-mini">+{project.members.length - 2}</div>
                  )}
                </div>
                <div className="deadline-info">
                  <span>📅</span>
                  {project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add Project Modal ── */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Website Redesign"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Briefly describe the project goals..."
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    className="form-input"
                    value={formData.priority}
                    onChange={e => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Accent Color</label>
                  <input 
                    type="color" 
                    className="form-input" 
                    style={{ height: "45px", padding: "4px" }}
                    value={formData.color}
                    onChange={e => setFormData({...formData, color: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Deadline</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={formData.deadline}
                  onChange={e => setFormData({...formData, deadline: e.target.value})}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
