const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const Task = require("../models/task");

router.get('/all', async (req, res) => {
    let result = await Group.find({status: 1})
    res.status(200).json({ groups: result})
});

router.get('/:id', async (req, res) => {
    let result = await Group.findOne({ _id: req.params.id })
    res.json({ group: result})
});

router.post("/create", async (req, res) => {
    try {
        let task = req.body.task
        let result = await Task.findOne({ title: task.title });
        task["supervisorId"] = req.body.user._id;
        let message = '';
        if (result) {
            message = "Task already exists"
        } else {
            message = 'Task Created Successfully!';
            result = await Task.create(task);
        }
        res.status(200).json({result, message});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        let result = await Group.findByIdAndUpdate(req.params.id, { $set: { status: 2 } }, { new: true });
        res.status(200).json({ result, message: 'Group Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        let body = req.body;
        let result = await Group.findByIdAndUpdate(req.params.id, {
            $set: body
        }, { new: true });
        res.status(200).json({ result, message: 'Group Updated Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;