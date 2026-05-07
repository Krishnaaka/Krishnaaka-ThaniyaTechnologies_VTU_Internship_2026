// ═══════════════════════════════════════════════════════════
//  src/components/TaskCard.jsx
//  Day 10: Kanban Draggable Task Card with Edit & Delete
//  Project: Project Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

export default function TaskCard({ task, onDragStart, onEdit, onDelete }) {
  const priorityClass = `priority-${task.priority || "medium"}`;
  
  // Format deadline if exists
  let deadlineStr = "";
  let isOverdue = false;
  if (task.deadline) {
    const d = new Date(task.deadline);
    deadlineStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (d < new Date() && task.status !== "done") {
      isOverdue = true;
    }
  }

  return (
    <div 
      className="task-card"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task._id);
        e.dataTransfer.setData("sourceStatus", task.status);
        if (onDragStart) onDragStart(task);
      }}
    >
      <div className="task-card-top">
        <div className={`task-priority ${priorityClass}`}>
          {task.priority || "medium"}
        </div>
        <div className="task-actions">
          <button className="task-action-btn" title="Edit" onClick={() => onEdit && onEdit(task)}>✏️</button>
          <button className="task-action-btn task-action-delete" title="Delete" onClick={() => onDelete && onDelete(task)}>🗑️</button>
        </div>
      </div>
      <h3 className="task-title">{task.title}</h3>
      {task.description && <p className="task-desc">{task.description}</p>}
      
      <div className="task-footer">
        <div className={`task-date ${isOverdue ? "overdue" : ""}`}>
          <span title={isOverdue ? "Overdue!" : "Deadline"}>🗓️</span>
          {deadlineStr || "No date"}
        </div>
        <div className="task-assignee" title={task.assignedTo?.name || "Unassigned"}>
          {task.assignedTo?.name ? task.assignedTo.name.charAt(0).toUpperCase() : "?"}
        </div>
      </div>
    </div>
  );
}
