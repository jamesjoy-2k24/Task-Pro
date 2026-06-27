export const createInitialTaskForm = () => ({
  title: "",
  description: "",
  status: "pending",
  deadline: "",
});

export const formatDate = (value) => {
  if (!value) return "No deadline";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No deadline";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (value) => {
  if (!value) return "Unknown time";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const normalizeDateInput = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
};

export const getDeadlineMeta = (task) => {
  if (!task.deadline) {
    return { label: "No deadline", tone: "neutral" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(task.deadline);
  deadline.setHours(0, 0, 0, 0);

  const difference = Math.round((deadline - today) / 86400000);

  if (task.status !== "completed" && difference < 0) {
    return { label: "Overdue", tone: "danger" };
  }

  if (difference === 0) {
    return { label: "Due today", tone: "warning" };
  }

  if (difference === 1) {
    return { label: "Due tomorrow", tone: "warning" };
  }

  return {
    label: `Due in ${difference} day${difference === 1 ? "" : "s"}`,
    tone: "neutral",
  };
};

export const buildActivityFeed = (tasks) => {
  const entries = [];

  tasks.forEach((task) => {
    if (task.createdAt) {
      entries.push({
        id: `${task._id}-created`,
        title: `Created "${task.title}"`,
        time: task.createdAt,
        detail: task.description || "New task added to your workspace.",
      });
    }

    if (
      task.updatedAt &&
      task.createdAt &&
      new Date(task.updatedAt).getTime() !== new Date(task.createdAt).getTime()
    ) {
      entries.push({
        id: `${task._id}-updated`,
        title:
          task.status === "completed"
            ? `Completed "${task.title}"`
            : `Updated "${task.title}"`,
        time: task.updatedAt,
        detail: `Current status: ${task.status || "pending"}`,
      });
    }
  });

  return entries
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 8);
};

export const sortTasks = (tasks, sortBy) => {
  const items = [...tasks];

  if (sortBy === "newest") {
    return items.sort(
      (a, b) =>
        new Date(b.createdAt || b.updatedAt || 0).getTime() -
        new Date(a.createdAt || a.updatedAt || 0).getTime(),
    );
  }

  if (sortBy === "oldest") {
    return items.sort(
      (a, b) =>
        new Date(a.createdAt || a.updatedAt || 0).getTime() -
        new Date(b.createdAt || b.updatedAt || 0).getTime(),
    );
  }

  if (sortBy === "status") {
    const order = { pending: 0, "in progress": 1, completed: 2 };
    return items.sort(
      (a, b) => (order[a.status] ?? 99) - (order[b.status] ?? 99),
    );
  }

  return items.sort((a, b) => {
    const aTime = a.deadline
      ? new Date(a.deadline).getTime()
      : Number.MAX_SAFE_INTEGER;
    const bTime = b.deadline
      ? new Date(b.deadline).getTime()
      : Number.MAX_SAFE_INTEGER;

    if (aTime !== bTime) return aTime - bTime;

    return (
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
    );
  });
};
