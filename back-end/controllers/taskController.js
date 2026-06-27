import Task from '../models/Task.js';  
import asyncHandler from 'express-async-handler';

  export const createTask = asyncHandler(async (req, res) => {
  const { title, description,status,deadline} = req.body;
  const task = await Task.create({ title, description,status,deadline,user: req.user._id });
  res.status(201).json(task);
});

 export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

  export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) { 
    res.status(404);
     throw new Error('Task not found'); }
  if (task.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error('Not authorized'); }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.status(200).json(updatedTask);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) { res.status(404); throw new Error('Task not found'); }
  if (task.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error('Not authorized'); }
  await task.deleteOne();
  res.status(200).json({ message: 'Task removed' });
});
export const getTaskStats = async (req, res) => {
  const userId = req.user._id;
  const today = new Date();
  today.setHours(0, 0, 0, 0); //today time

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const stats = await Promise.all([
    Task.countDocuments({ user: userId }), // All Tasks
    Task.countDocuments({ user: userId, status: 'pending' }), // Pending
    Task.countDocuments({ user: userId, status: 'completed' }), // Completed
    Task.countDocuments({ user: userId, status: 'in progress' }), // In Progress
    Task.countDocuments({
      user: userId,
      status: { $ne: 'completed' },
      deadline: { $exists: true, $ne: null, $lt: today }
    }),
    Task.countDocuments({
      user: userId,
      deadline: null // No Deadline
    }),
    Task.countDocuments({
      user: userId,
      deadline: { $gte: today, $lt: tomorrow } // Due Today
    })
  ]);

  res.json({
    allTasks: stats[0],
    pending: stats[1],
    completed: stats[2],
    inProgress: stats[3],
    overdue: stats[4],
    noDeadline: stats[5],
    dueToday: stats[6]
  });
};
