const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const User = require('../models/user');
const Project = require('../models/project');
const Task = require('../models/task');

router.get('/', async (req, res) => {
    try {
    const currentUser = await User.findById(req.headers.accessid)
    if (currentUser.role == 'supervisor') {
      console.log(currentUser)
      const projects = await Project.find({ supervisor: currentUser.id }).lean();

    for (const project of projects) {
      const totalTasks = await Task.countDocuments({ project: project._id });
      
      project.totalTasks = totalTasks;
    }
    res.json({
      projects
    });
    } else {
    const totalUsers = await User.countDocuments({});
    const totalProjects = await Project.countDocuments({});
    const projectsUploadedByAdmin = await Project.countDocuments({ supervisor: currentUser._id });
    const totalTasksCompleted = await Task.countDocuments({ status: 'completed' });

    res.json({
      totalUsers,
      totalProjects,
      projectsUploadedByAdmin,
      totalTasksCompleted,
    });
  }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;