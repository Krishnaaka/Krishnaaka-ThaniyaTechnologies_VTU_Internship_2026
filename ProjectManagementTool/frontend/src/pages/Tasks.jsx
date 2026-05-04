// ═══════════════════════════════════════════════════════════
//  src/pages/Tasks.jsx
//  Day 8: Tasks Page with Kanban Board and Create Form
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useToast } from "../context/ToastContext";
import KanbanBoard from "../components/KanbanBoard";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  const navigate = useNavigate();

  const [newTask, setNewTask] = useState({ 
    title: "", 
    description: "", 
    priority: "medium",
    project: projectId || ""
  });

  // ─── Fetch Data ──────────────────────────────────────────
  const fetchData = async () => {
    try {
      setLoading(true);
      const [taskRes, projRes] = await Promise.all([
        API.get(projectId ? `/tasks?project=${projectId}` : "/tasks"),
        API.get("/projects")
      ]);

      setTasks(taskRes.data.data || []);
      setProjects(projRes.data.data || []);

      if (projectId) {
        const found = projRes.data.data.find(p => p._id === projectId);
        setCurrentProject(found);
      } else {
        setCurrentProject(null);
      }
    } catch (err) {
      addToast("Error", "Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      setNewTask(prev => ({ ...prev, project: projectId }));
    }
  }, [projectId]);

  // ─── Handlers ──────────────────────────────────────────
  const handleTaskMove = async (taskId, newStatus) => {
    setTasks((prev) => 
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );
    try {
      await API.patch(`/tasks/${taskId}/status`, { status: newStatus });
      addToast("Status Updated", `Task moved to ${newStatus}`, "info");
    } catch (err) {
      addToast("Error", "Failed to update status", "error");
      fetchData();
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.project) {
      addToast("Required", "Please select a project", "error");
      return;
    }
    try {
      await API.post("/tasks", newTask);
      addToast("Success", "Task created successfully!", "success");
      setIsModalOpen(false);
      setNewTask({ title: "", description: "", priority: "medium", project: projectId || "" });
      fetchData();
    } catch (err) {
      addToast("Error", "Failed to create task", "error");
    }
  };

  return (
    <div className="tasks-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {currentProject ? `Tasks: ${currentProject.title}` : "All Tasks"}
          </h1>
          <p className="page-subtitle">
            {currentProject ? currentProject.description : "Manage tasks across all projects"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {!projectId && (
            <select 
              className="auth-input" 
              style={{ width: "200px", marginBottom: 0 }}
              onChange={(e) => e.target.value ? navigate(`/tasks?project=${e.target.value}`) : navigate("/tasks")}
            >
              <option value="">Filter by Project...</option>
              {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
            </select>
          )}
          <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
            <span>+</span> Add Task
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px", color: "#6366f1" }}>
          Loading tasks...
        </div>
      ) : (
        <KanbanBoard tasks={tasks} onTaskMove={handleTaskMove} />
      )}

      {/* ── Add Task Modal ── */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ color: "#fff", margin: 0 }}>Create New Task</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: "1.5rem", cursor: "pointer" }}>&times;</button>
            </div>
            <form onSubmit={handleCreateTask} className="modal-form">
              <div className="auth-field">
                <label className="auth-label">Title</label>
                <input 
                  type="text" 
                  className="auth-input"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">Description</label>
                <textarea 
                  className="auth-input"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows="3"
                ></textarea>
              </div>
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div className="auth-field" style={{ marginBottom: 0 }}>
                  <label className="auth-label">Priority</label>
                  <select 
                    className="auth-input"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="auth-field" style={{ marginBottom: 0 }}>
                  <label className="auth-label">Project</label>
                  <select 
                    className="auth-input"
                    value={newTask.project}
                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                    required
                    disabled={!!projectId}
                  >
                    <option value="">Select Project...</option>
                    {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="modal-footer" style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
