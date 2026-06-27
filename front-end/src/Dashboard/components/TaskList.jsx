import styles, { statusOptions, sortOptions } from "../dashboardStyles";
import TaskCard from "./TaskCard";

export default function TaskList({
  filteredTasks,
  totalCount,
  loading,
  searchTerm,
  sortBy,
  filter,
  onSearchChange,
  onSortChange,
  onFilterChange,
  onResetView,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  return (
    <section style={styles.panel}>
      <div style={styles.splitGrid}>
        <div>
          <h2 style={styles.panelTitle}>Task Activities</h2>
          <p style={styles.panelText}>
            Search, filter, edit, update status, and delete tasks from one
            place.
          </p>
        </div>
        <div style={styles.timeline}>
          <div style={styles.quickCard}>
            <div style={styles.quickTitle}>Visible Tasks</div>
            <div style={styles.quickText}>
              {filteredTasks.length} shown out of {totalCount} total
            </div>
          </div>
        </div>
      </div>

      <div style={styles.toolbar}>
        <input
          style={styles.input}
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title, description, or status"
        />
        <select
          style={styles.select}
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              Sort: {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          style={styles.secondaryButton}
          onClick={onResetView}
        >
          Reset view
        </button>
      </div>

      <div style={styles.filterRow}>
        {["all", ...statusOptions].map((item) => (
          <button
            key={item}
            type="button"
            style={
              filter === item
                ? styles.activeFilterButton
                : styles.filterButton
            }
            onClick={() => onFilterChange(item)}
          >
            {item === "all" ? "All" : item}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={styles.emptyState}>
          Loading your dashboard activities...
        </div>
      ) : filteredTasks.length === 0 ? (
        <div style={styles.emptyState}>
          No tasks match this view yet. Try another filter or create a new
          task.
        </div>
      ) : (
        <div style={styles.taskList}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
