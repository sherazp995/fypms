const express = require('express');
var router = express.Router();
var Task = require('../models/task');

router.get('/all', async (req, res) => {
    try {
        let result = await Task.find();
        res.status(200).json({ result, message: 'Success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
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
        res.status(200).json({ result, message: 'User Updated Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        let result = await Task.findOne({ _id: req.params.id });
        console.log(result)
        res.status(200).json({ result, message: 'Success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;