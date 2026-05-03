// ═══════════════════════════════════════════════════════════
//  src/components/TaskCard.jsx
//  Day 8: Kanban Draggable Task Card
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

export default function TaskCard({ task, onDragStart }) {
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
        // Pass task id and current status to the dataTransfer
        e.dataTransfer.setData("taskId", task._id);
        e.dataTransfer.setData("sourceStatus", task.status);
        if (onDragStart) onDragStart(task);
      }}
    >
      <div className={`task-priority ${priorityClass}`}>
        {task.priority || "medium"}
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
