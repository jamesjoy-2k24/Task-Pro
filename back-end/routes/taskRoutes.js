import express from 'express';
import Task from '../models/Task.js';
import User from '../models/User.js';
import { createTask, getTasks,updateTask,deleteTask,getTaskStats} from '../controllers/taskController.js';
const router = express.Router();
import protect from '../middleware/authMiddleware.js';


router.get('/stats',protect,getTaskStats);
router.route('/').post(protect,createTask).get(protect,getTasks);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);


// Dashboard data
router.get('/dashboard', async (req, res) => {
  const employees = await User.countDocuments({});
  const allTasks = await Task.countDocuments({});
  const pending = await Task.countDocuments({ status: 'pending' });
  const inProgress = await Task.countDocuments({ status: 'in progress' });
  const completed = await Task.countDocuments({ status: 'completed' });
  const today = new Date();
  today.setHours(0,0,0,0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dueToday = await Task.countDocuments({ deadline: { $gte: today, $lt: tomorrow } });
  const overdue = await Task.countDocuments({ deadline: { $lt: today }, status: { $ne: 'completed' } });
  
  res.json({ employees, allTasks, pending, inProgress, completed, dueToday, overdue, noDeadline: 0, notifications: 0 });
});



export default router;