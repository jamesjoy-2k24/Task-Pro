import styles from "../dashboardStyles";

export default function StatsGrid({ stats }) {
  const cards = [
    { label: "All Tasks", value: stats.allTasks, hint: "Everything in your workspace" },
    { label: "Pending", value: stats.pending, hint: "Still waiting to be started" },
    { label: "In Progress", value: stats.inProgress, hint: "Currently active work" },
    { label: "Completed", value: stats.completed, hint: "Finished and closed out" },
    { label: "Due Today", value: stats.dueToday, hint: "Tasks needing attention today" },
    { label: "Overdue", value: stats.overdue, hint: "Past deadline and not completed" },
  ];

  return (
    <section style={styles.statsGrid}>
      {cards.map((card) => (
        <div key={card.label} style={styles.statCard}>
          <div style={styles.statLabel}>{card.label}</div>
          <div style={styles.statValue}>{card.value}</div>
          <div style={styles.statHint}>{card.hint}</div>
        </div>
      ))}
    </section>
  );
}
