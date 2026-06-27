import styles, { statusOptions } from "../dashboardStyles";

export default function TaskForm({
  editingTaskId,
  taskForm,
  submitting,
  user,
  onInputChange,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <aside style={styles.panel}>
      <h2 style={styles.panelTitle}>
        {editingTaskId ? "Edit Task" : "Create Task"}
      </h2>
      <p style={styles.panelText}>
        Manage the task details that already exist in your task model:
        title, description, status, and deadline.
      </p>

      <form style={styles.form} onSubmit={onSubmit}>
        <label style={styles.label}>
          Title
          <input
            style={styles.input}
            type="text"
            name="title"
            value={taskForm.title}
            onChange={onInputChange}
            placeholder="Finish profile page"
            required
          />
        </label>

        <label style={styles.label}>
          Description
          <textarea
            style={styles.textarea}
            name="description"
            value={taskForm.description}
            onChange={onInputChange}
            placeholder="Add notes, context, or the next action."
          />
        </label>

        <label style={styles.label}>
          Status
          <select
            style={styles.select}
            name="status"
            value={taskForm.status}
            onChange={onInputChange}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Deadline
          <input
            style={styles.input}
            type="date"
            name="deadline"
            value={taskForm.deadline}
            onChange={onInputChange}
          />
        </label>

        <div style={styles.buttonRow}>
          <button
            style={styles.primaryButton}
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? editingTaskId
                ? "Saving..."
                : "Creating..."
              : editingTaskId
                ? "Save changes"
                : "Add task"}
          </button>

          {editingTaskId ? (
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={onCancelEdit}
            >
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>

      <div style={styles.quickGrid}>
        <div style={styles.quickCard}>
          <div style={styles.quickTitle}>User Snapshot</div>
          <div style={styles.quickText}>Name: {user?.name || "-"}</div>
          <div style={styles.quickText}>Email: {user?.email || "-"}</div>
          <div style={styles.quickText}>Role: {user?.role || "-"}</div>
        </div>
        <div style={styles.quickCard}>
          <div style={styles.quickTitle}>Dashboard Notes</div>
          <div style={styles.quickText}>
            Search tasks, sort them, edit existing work, and track recent
            activity without leaving the dashboard.
          </div>
        </div>
      </div>
    </aside>
  );
}
