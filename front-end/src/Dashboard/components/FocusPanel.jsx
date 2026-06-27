import styles from "../dashboardStyles";
import { formatDate, getDeadlineMeta } from "../dashboardUtils";

export default function FocusPanel({ focusTask }) {
  const renderBadge = (meta) => {
    if (meta.tone === "danger") return <span style={styles.dangerBadge}>{meta.label}</span>;
    if (meta.tone === "warning") return <span style={styles.warningBadge}>{meta.label}</span>;
    return <span style={styles.badge}>{meta.label}</span>;
  };

  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>Focus Area</h2>
      <p style={styles.panelText}>
        The next task most likely to need your attention.
      </p>
      {focusTask ? (
        <div style={styles.activityCard}>
          <div style={styles.quickTitle}>{focusTask.title}</div>
          <div style={styles.quickText}>
            {focusTask.description || "No description for this task yet."}
          </div>
          <div style={styles.quickText}>
            Deadline: {formatDate(focusTask.deadline)}
          </div>
          <div>{renderBadge(getDeadlineMeta(focusTask))}</div>
        </div>
      ) : (
        <div style={styles.emptyState}>No active focus task yet.</div>
      )}
    </div>
  );
}
