import Task from "../models/Task.js";
import User from "../models/User.js";
import { sendDeadlineEmail } from "./emailService.js";

const TWELVE_HOURS = 12 * 60 * 60 * 1000;

/**
 * Checks for tasks that are due today or overdue, groups them by user,
 * and sends a single reminder email per user.
 */
const checkDeadlines = async () => {
  try {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    // Tasks due today (not completed)
    const dueTodayTasks = await Task.find({
      status: { $ne: "completed" },
      deadline: { $gte: todayStart, $lt: todayEnd },
    });

    // Overdue tasks (deadline before today, not completed)
    const overdueTasks = await Task.find({
      status: { $ne: "completed" },
      deadline: { $exists: true, $ne: null, $lt: todayStart },
    });

    // Group by user ID
    const userTaskMap = new Map();

    const addToMap = (tasks, category) => {
      for (const task of tasks) {
        if (!task.user) continue;
        const uid = task.user.toString();
        if (!userTaskMap.has(uid)) {
          userTaskMap.set(uid, { dueTasks: [], overdueTasks: [] });
        }
        userTaskMap.get(uid)[category].push(task);
      }
    };

    addToMap(dueTodayTasks, "dueTasks");
    addToMap(overdueTasks, "overdueTasks");

    if (userTaskMap.size === 0) {
      console.log("🔔 Deadline check: no tasks due today or overdue.");
      return;
    }

    // Send emails
    for (const [userId, { dueTasks, overdueTasks }] of userTaskMap) {
      const user = await User.findById(userId).select("name email");
      if (!user || !user.email) continue;

      await sendDeadlineEmail(
        user.email,
        user.name || "User",
        dueTasks,
        overdueTasks,
      );
    }

    console.log(
      `🔔 Deadline check complete: notified ${userTaskMap.size} user(s).`,
    );
  } catch (err) {
    console.error("❌ Deadline notifier error:", err.message);
  }
};

/**
 * Start the deadline notification scheduler.
 * Runs immediately once, then every 12 hours.
 */
export const startDeadlineNotifier = () => {
  console.log("🔔 Deadline notifier started (runs every 12 hours)");

  // Run once on startup (slight delay to let server fully boot)
  setTimeout(checkDeadlines, 5000);

  // Then every 12 hours
  setInterval(checkDeadlines, TWELVE_HOURS);
};

export default startDeadlineNotifier;
