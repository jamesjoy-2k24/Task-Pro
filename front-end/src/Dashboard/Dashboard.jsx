import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createTask,
  deleteTask,
  getTaskStats,
  getTasks,
  updateTask,
} from "../services/taskService";

import styles, { emptyStats } from "./dashboardStyles";
import {
  buildActivityFeed,
  createInitialTaskForm,
  normalizeDateInput,
  sortTasks,
} from "./dashboardUtils";

import HeroBanner from "./components/HeroBanner";
import StatsGrid from "./components/StatsGrid";
import FocusPanel from "./components/FocusPanel";
import PressurePanel from "./components/PressurePanel";
import RecentWinsPanel from "./components/RecentWinsPanel";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ActivityTimeline from "./components/ActivityTimeline";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(emptyStats);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskForm, setTaskForm] = useState(createInitialTaskForm());

  const loadDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const [taskItems, taskSummary] = await Promise.all([
        getTasks(),
        getTaskStats(),
      ]);

      setTasks(Array.isArray(taskItems) ? taskItems : []);
      setStats({ ...emptyStats, ...taskSummary });
    } catch (err) {
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // ---------- Derived data ----------

  const derivedTasks = useMemo(() => sortTasks(tasks, sortBy), [tasks, sortBy]);

  const filteredTasks = useMemo(() => {
    return derivedTasks.filter((task) => {
      const matchesFilter = filter === "all" ? true : task.status === filter;
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch = !query
        ? true
        : [task.title, task.description, task.status]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(query));
      return matchesFilter && matchesSearch;
    });
  }, [derivedTasks, filter, searchTerm]);

  const activeTasks = useMemo(
    () => tasks.filter((task) => task.status !== "completed"),
    [tasks],
  );

  const focusTask = useMemo(
    () => sortTasks(activeTasks, "deadline")[0] || null,
    [activeTasks],
  );

  const recentlyCompleted = useMemo(
    () =>
      sortTasks(
        tasks.filter((task) => task.status === "completed"),
        "newest",
      ).slice(0, 3),
    [tasks],
  );

  const dueTodayTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tasks.filter((task) => {
      if (!task.deadline || task.status === "completed") return false;
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);
      return deadline.getTime() === today.getTime();
    });
  }, [tasks]);

  const overdueTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tasks.filter((task) => {
      if (!task.deadline || task.status === "completed") return false;
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);
      return deadline.getTime() < today.getTime();
    });
  }, [tasks]);

  const recentActivity = useMemo(() => buildActivityFeed(tasks), [tasks]);

  const completionRate = useMemo(() => {
    if (!stats.allTasks) return 0;
    return Math.round((stats.completed / stats.allTasks) * 100);
  }, [stats.allTasks, stats.completed]);

  const workloadLabel = useMemo(() => {
    if (stats.overdue > 0) return "Needs attention";
    if (completionRate >= 70) return "On track";
    if (stats.pending + stats.inProgress > 0) return "In motion";
    return "Getting started";
  }, [completionRate, stats.inProgress, stats.overdue, stats.pending]);

  // ---------- Handlers ----------

  const resetComposer = () => {
    setEditingTaskId(null);
    setTaskForm(createInitialTaskForm());
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmitTask = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const payload = {
      title: taskForm.title.trim(),
      description: taskForm.description.trim(),
      status: taskForm.status,
      deadline: taskForm.deadline || null,
    };

    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, payload);
        setMessage("Task updated successfully.");
      } else {
        await createTask(payload);
        setMessage("Task created successfully.");
      }
      resetComposer();
      await loadDashboardData();
    } catch (err) {
      setError(err.message || "Failed to save task.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setTaskForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "pending",
      deadline: normalizeDateInput(task.deadline),
    });
    setMessage("");
    setError("");
  };

  const handleStatusChange = async (taskId, status) => {
    const task = tasks.find((item) => item._id === taskId);
    if (!task) return;

    try {
      await updateTask(taskId, {
        title: task.title,
        description: task.description || "",
        deadline: task.deadline || null,
        status,
      });
      setMessage(`Task moved to ${status}.`);
      await loadDashboardData();
    } catch (err) {
      setError(err.message || "Failed to update task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(taskId);
      if (editingTaskId === taskId) resetComposer();
      setMessage("Task deleted successfully.");
      await loadDashboardData();
    } catch (err) {
      setError(err.message || "Failed to delete task.");
    }
  };

  // ---------- Render ----------

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <HeroBanner
          user={user}
          workloadLabel={workloadLabel}
          completionRate={completionRate}
          stats={stats}
          focusTask={focusTask}
          onRefresh={loadDashboardData}
          onLogout={handleLogout}
        />

        {message ? <div style={styles.message}>{message}</div> : null}
        {error ? <div style={styles.error}>{error}</div> : null}

        <StatsGrid stats={stats} />

        <section style={styles.activityGrid}>
          <FocusPanel focusTask={focusTask} />
          <PressurePanel
            dueTodayTasks={dueTodayTasks}
            overdueTasks={overdueTasks}
          />
          <RecentWinsPanel recentlyCompleted={recentlyCompleted} />
        </section>

        <section style={styles.contentGrid}>
          <TaskForm
            editingTaskId={editingTaskId}
            taskForm={taskForm}
            submitting={submitting}
            user={user}
            onInputChange={handleInputChange}
            onSubmit={handleSubmitTask}
            onCancelEdit={resetComposer}
          />

          <TaskList
            filteredTasks={filteredTasks}
            totalCount={tasks.length}
            loading={loading}
            searchTerm={searchTerm}
            sortBy={sortBy}
            filter={filter}
            onSearchChange={setSearchTerm}
            onSortChange={setSortBy}
            onFilterChange={setFilter}
            onResetView={() => {
              setSearchTerm("");
              setFilter("all");
              setSortBy("deadline");
            }}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </section>

        <ActivityTimeline recentActivity={recentActivity} />
      </div>
    </div>
  );
}
