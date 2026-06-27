import styles from "../dashboardStyles";
import { formatDateTime } from "../dashboardUtils";

export default function ActivityTimeline({ recentActivity }) {
  return (
    <section style={styles.panel}>
      <h2 style={styles.panelTitle}>Recent Activity Timeline</h2>
      <p style={styles.panelText}>
        A running feed built from task creation and update timestamps.
      </p>

      {recentActivity.length ? (
        <div style={styles.timeline}>
          {recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              style={{
                ...styles.timelineItem,
                borderBottom:
                  index === recentActivity.length - 1
                    ? "none"
                    : styles.timelineItem.borderBottom,
              }}
            >
              <div style={styles.timelineTitle}>{activity.title}</div>
              <div style={styles.timelineMeta}>
                {activity.detail} • {formatDateTime(activity.time)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          No activity yet. Add a task or update one to build your timeline.
        </div>
      )}
    </section>
  );
}
