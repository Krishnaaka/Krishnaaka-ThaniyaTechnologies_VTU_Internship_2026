// ═══════════════════════════════════════════════════════════
//  src/pages/Tasks.jsx
//  Day 8: Tasks Page with Kanban Board and Create Form
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import API from "../api/axios";
import KanbanBoard from "../components/KanbanBoard";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium" });

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/tasks");
      // ensure we just get tasks. If the backend returns { count, data: tasks } handle it:
      const taskList = Array.isArray(data.data) ? data.data : data; 
      setTasks(taskList);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle Drag-and-Drop Task Move
  const handleTaskMove = async (taskId, newStatus) => {
    // Optimistic UI Update
    setTasks((prev) => 
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await API.patch(`/tasks/${taskId}/status`, { status: newStatus });
    } catch (err) {
      console.error("Failed to update status:", err);
      // Revert if failed
      fetchTasks();
    }
  };

  // Handle Form Submission for New Task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", newTask);
      setIsModalOpen(false);
      setNewTask({ title: "", description: "", priority: "medium" });
      fetchTasks();
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  return (
    <div className="tasks-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Task Board</h1>
          <p className="page-subtitle">Manage your project tasks</p>
        </div>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>+</span> Add Task
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px", color: "var(--primary)" }}>
          Loading tasks...
        </div>
      ) : (
        <KanbanBoard tasks={tasks} onTaskMove={handleTaskMove} />
      )}

      {/* ── Add Task Modal ── */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Task</h2>
            <form onSubmit={handleCreateTask} className="modal-form">
              <div className="auth-field">
                <label className="auth-label">Title</label>
                <input 
                  type="text" 
                  className="auth-input"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                  autoFocus
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
              <div className="auth-field">
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
              
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
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
