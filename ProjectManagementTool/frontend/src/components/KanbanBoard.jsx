// ═══════════════════════════════════════════════════════════
//  src/components/KanbanBoard.jsx
//  Day 10: Drag-and-drop Kanban Board with Edit/Delete
//  Project: Project Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import { useState } from "react";
import TaskCard from "./TaskCard";

const COLUMNS = [
  { id: "todo", title: "To Do", dotClass: "status-todo" },
  { id: "inprogress", title: "In Progress", dotClass: "status-inprogress" },
  { id: "done", title: "Done", dotClass: "status-done" },
];

export default function KanbanBoard({ tasks, onTaskMove, onEdit, onDelete }) {
  const [draggedOverCol, setDraggedOverCol] = useState(null);

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    setDraggedOverCol(colId);
  };

  const handleDragLeave = () => {
    setDraggedOverCol(null);
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    setDraggedOverCol(null);
    const taskId = e.dataTransfer.getData("taskId");
    const sourceStatus = e.dataTransfer.getData("sourceStatus");

    if (taskId && sourceStatus !== colId) {
      onTaskMove(taskId, colId);
    }
  };

  return (
    <div className="kanban-board">
      {COLUMNS.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.id);
        const isDragOver = draggedOverCol === col.id;

        return (
          <div 
            key={col.id} 
            className={`kanban-column ${isDragOver ? "drag-over" : ""}`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="column-header">
              <div className="column-title">
                <span className={`status-dot ${col.dotClass}`}></span>
                {col.title}
              </div>
              <div className="column-count">{colTasks.length}</div>
            </div>
            <div className="column-body">
              {colTasks.map((task) => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {colTasks.length === 0 && (
                <div style={{ color: "var(--text-muted)", textAlign: "center", padding: "20px" }}>
                  No tasks here.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
