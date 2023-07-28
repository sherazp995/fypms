const express = require('express');
const router = express.Router();
const TaskResult = require('../models/taskResult');

// Create a Task Result
router.post('/create', async (req, res) => {
  try {
    const taskResult = new TaskResult(req.body);
    const savedTaskResult = await taskResult.save();
    res.json({result: savedTaskResult});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Task Results
router.get('/all', async (req, res) => {
  try {
    const taskResults = await TaskResult.find();
    res.json({result: taskResults});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/find', async (req, res) => {
  try {
    const taskResults = await TaskResult.find(req.body);
    res.json({result: taskResults});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a Task Result by ID
router.get('/:id', async (req, res) => {
  try {
    const taskResult = await TaskResult.findById(req.params.id);
    if (!taskResult) {
      return res.status(404).json({ message: 'Task Result not found' });
    }
    res.json({result: taskResult});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Task Result
router.post('/update/:id', async (req, res) => {
  try {
    const taskResult = await TaskResult.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!taskResult) {
      return res.status(404).json({ message: 'Task Result not found' });
    }
    res.json({result: taskResult});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Task Result
router.post('/delete/:id', async (req, res) => {
  try {
    const taskResult = await TaskResult.findByIdAndDelete(req.params.id);
    if (!taskResult) {
      return res.status(404).json({ message: 'Task Result not found' });
    }
    res.json({ message: 'Task Result deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
