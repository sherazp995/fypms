const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const User = require('../models/user');
const Task = require('../models/task');

router.get('/all', async (req, res) => {
    let result = await Group.find()
    res.status(200).json({result})
});

router.get('/:id', async (req, res) => {
    let result = await Group.findOne({ _id: req.params.id }).populate('project').exec();
    let students = await User.find({group: req.params.id});
    let tasks = await Task.find({group: req.params.id});
    res.json({result, students, tasks})
});

router.post("/create", async (req, res) => {
    try {
        let group = req.body
        let result = await Group.findOne({ title: group.name });
        let message = '';
        if (result) {
            message = "Group already exists"
        } else {
            message = 'Group Created Successfully!';
            result = await Group.create(group);
        }
        await User.updateMany({_id: {$in: group.students}}, { $set: { group: result._id } }, {multi: true})
        res.status(200).json({result, message});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        await Group.deleteOne(id);
        await User.updateMany({ group: id }, { $set: { group: null }})
        res.status(200).json({ message: 'Group Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        let group = req.body.group;
        let result = await Group.findByIdAndUpdate(req.params.id, {
            $set: group
        }, { new: true });
        res.status(200).json({ result, message: 'Group Updated Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;