import styles, { statusOptions } from "../dashboardStyles";
import { formatDate, formatDateTime, getDeadlineMeta } from "../dashboardUtils";

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const deadlineMeta = getDeadlineMeta(task);

  const renderBadge = () => {
    if (deadlineMeta.tone === "danger")
      return <span style={styles.dangerBadge}>{deadlineMeta.label}</span>;
    if (deadlineMeta.tone === "warning")
      return <span style={styles.warningBadge}>{deadlineMeta.label}</span>;
    return <span style={styles.badge}>{deadlineMeta.label}</span>;
  };

  return (
    <article
      style={{
        ...styles.taskCard,
        borderColor:
          deadlineMeta.tone === "danger"
            ? "#fecaca"
            : deadlineMeta.tone === "warning"
              ? "#fde68a"
              : "#dbe5f1",
        background:
          deadlineMeta.tone === "danger"
            ? "#fff7f7"
            : deadlineMeta.tone === "warning"
              ? "#fffbeb"
              : "#f8fbff",
      }}
    >
      <div style={styles.taskTop}>
        <div>
          <h3 style={styles.taskTitle}>{task.title}</h3>
          <p style={styles.taskMeta}>Status: {task.status || "pending"}</p>
          <p style={styles.taskMeta}>Deadline: {formatDate(task.deadline)}</p>
          <p style={styles.taskMeta}>
            Last activity: {formatDateTime(task.updatedAt)}
          </p>
        </div>
        <div>{renderBadge()}</div>
      </div>

      <p style={styles.taskDescription}>
        {task.description || "No description provided for this task."}
      </p>

      <div style={styles.taskActions}>
        <select
          style={styles.select}
          value={task.status || "pending"}
          onChange={(event) => onStatusChange(task._id, event.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          type="button"
          style={styles.actionButton}
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          type="button"
          style={styles.deleteButton}
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
