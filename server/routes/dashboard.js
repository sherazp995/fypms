const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const User = require('../models/user');
const Project = require('../models/project');
const Task = require('../models/task');
const Meeting = require('../models/meeting');

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.headers.accessid);
    let projects = null;
    let totalUsers = null;
    let totalProjects = null;
    let projectsUploadedByAdmin = null;
    let totalTasksCompleted = null;
    let upcomingMeetings = null;
    if (currentUser.role == 'supervisor' || currentUser.role == 'admin') {
      projects = await Project.find({ supervisor: currentUser._id }).lean();
      const currentDate = new Date();
      const tenDaysFromNow = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000); 
  
      upcomingMeetings = await Meeting.find({
        supervisor: currentUser._id, 
        startDate: { $gte: currentDate, $lte: tenDaysFromNow },
      }).sort('startDate');
  
      for (const project of projects) {
        const totalTasks = await Task.countDocuments({ project: project._id });
        const totalGroups = await Group.countDocuments({ project: project._id });
        project.totalGroups = totalGroups;
        project.totalTasks = totalTasks;
      }
    }
    if (currentUser.role == 'admin') {
      totalUsers = await User.countDocuments({});
      totalProjects = await Project.countDocuments({});
      projectsUploadedByAdmin = await Project.countDocuments({ supervisor: currentUser._id });
      totalTasksCompleted = await Task.countDocuments({ status: 'completed' });
    }
    res.json({
      upcomingMeetings,
      projects,
      totalUsers,
      totalProjects,
      projectsUploadedByAdmin,
      totalTasksCompleted,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;