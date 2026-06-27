import styles from "../dashboardStyles";

export default function HeroBanner({
  user,
  workloadLabel,
  completionRate,
  stats,
  focusTask,
  onRefresh,
  onLogout,
}) {
  return (
    <section style={styles.hero}>
      <div>
        <h1 style={styles.heroTitle}>
          Welcome back, {user?.name || "User"}
        </h1>
        <p style={styles.heroText}>
          This is your full activity dashboard. You can create work, update
          progress, track deadlines, review recent actions, and stay focused
          on the next most important task.
        </p>

        <div style={styles.chipRow}>
          <span style={styles.chip}>{user?.email || "No email"}</span>
          <span style={styles.chip}>{user?.role || "user"}</span>
          <span style={styles.chip}>{workloadLabel}</span>
        </div>

        <div style={{ ...styles.buttonRow, marginTop: "22px" }}>
          <button style={styles.secondaryButton} onClick={onRefresh}>
            Refresh dashboard
          </button>
          <button style={styles.ghostButton} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.heroSide}>
        <div style={styles.sideTitle}>Completion rate</div>
        <div style={styles.sideMetric}>{completionRate}%</div>
        <div style={styles.progressBarTrack}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${Math.min(completionRate, 100)}%`,
            }}
          />
        </div>
        <p style={styles.sideText}>
          {stats.completed} of {stats.allTasks} tasks are completed.
        </p>
        <p style={styles.sideText}>
          {focusTask
            ? `Current focus: ${focusTask.title}`
            : "Create a task to start building momentum."}
        </p>
      </div>
    </section>
  );
}
