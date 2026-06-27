import styles from "../dashboardStyles";
import { formatDateTime } from "../dashboardUtils";

export default function RecentWinsPanel({ recentlyCompleted }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>Recent Wins</h2>
      <p style={styles.panelText}>
        Your latest completed tasks to keep momentum visible.
      </p>
      {recentlyCompleted.length ? (
        <div style={styles.timeline}>
          {recentlyCompleted.map((task) => (
            <div key={task._id} style={styles.timelineItem}>
              <div style={styles.timelineTitle}>{task.title}</div>
              <div style={styles.timelineMeta}>
                Completed around {formatDateTime(task.updatedAt)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          Complete a task to see wins here.
        </div>
      )}
    </div>
  );
}
