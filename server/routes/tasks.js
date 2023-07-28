const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Group = require('../models/group');

router.get('/all', async (req, res) => {
    try {
        let result = await Task.find();
        res.status(200).json({ result, message: 'Success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/find', async (req, res) => {
    try {
        let result = await Task.find(req.body);
        res.status(200).json({ result, message: 'Success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post("/create", async (req, res) => {
    try {
        // Task is made unique by title, supervisor, group and project
        let task = req.body;
        let result = null;
        let message = 'Task Created Successfully!';
        if(!!task.group){
            result = await Task.create(task);
        } else {
            delete task.group;
            groups = await Group.find({project: task.project})
            let tasks = groups.map((g) => {return {group: g._id.toString(), ...task}});
            result = await Task.create(tasks);
        }
        
        res.status(200).json({result, message});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        let result = await Task.deleteOne(req.params.id);
        res.status(200).json({ result, message: 'Task Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        let body = req.body;
        let result = await Task.findByIdAndUpdate(req.params.id, {
            $set: body
        }, { new: true });
        res.status(200).json({ result, message: 'Task Updated Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        let result = await Task.findOne({ _id: req.params.id });
        res.status(200).json({ result, message: 'Success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;