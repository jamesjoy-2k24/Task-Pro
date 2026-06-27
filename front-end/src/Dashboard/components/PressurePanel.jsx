import styles from "../dashboardStyles";

export default function PressurePanel({ dueTodayTasks, overdueTasks }) {
  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>Today&apos;s Pressure</h2>
      <p style={styles.panelText}>
        Quick view of the tasks that are most time-sensitive.
      </p>
      <div style={styles.quickGrid}>
        <div style={styles.quickCard}>
          <div style={styles.quickTitle}>Due Today</div>
          <div style={styles.quickText}>
            {dueTodayTasks.length
              ? dueTodayTasks.map((task) => task.title).join(", ")
              : "No tasks due today."}
          </div>
        </div>
        <div style={styles.quickCard}>
          <div style={styles.quickTitle}>Overdue Work</div>
          <div style={styles.quickText}>
            {overdueTasks.length
              ? overdueTasks.map((task) => task.title).join(", ")
              : "Nothing is overdue right now."}
          </div>
        </div>
      </div>
    </div>
  );
}
