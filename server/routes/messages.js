// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const User = require('../models/user');
// Add any required middlewares for authentication and authorization
router.get('/all', async (req, res) => {
    try {
        const usersWithMessages = await User.aggregate([
            {
              $lookup: {
                from: 'messages', // The collection name for messages
                localField: '_id',
                foreignField: 'sender',
                as: 'messages'
              }
            },
            {
              $unwind: '$messages' // Unwind the messages array
            },
            {
              $sort: { 'messages.createdAt': -1 } // Sort messages by createdAt in descending order (latest first)
            },
            {
              $group: {
                _id: '$_id',
                name: { $first: '$name' }, // Keep the user's name
                id: { $first: '$_id' }, // Keep the user's _id
                latestMessage: { $first: '$messages' } // Get the first (latest) message in each group
              }
            },
            {
              $project: {
                _id: 0,
                id: 1,
                name: 1,
                latestMessage: {
                  _id: 1,
                  sender: 1,
                  content: 1,
                  createdAt: 1
                }
              }
            }
          ]);

        res.status(200).json({ result: usersWithMessages });
    } catch (error) {
        console.error('Error fetching users with messages:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Send a new message
router.post('/send', async (req, res) => {
    try {
        const { sender, receiver, content, attachments } = req.body;

        const message = new Message({
            sender,
            receiver,
            content,
            attachments,
        });

        const savedMessage = await message.save();

        res.status(201).json({ result: savedMessage });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to send the message' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('_id firstName lastName');
        res.status(200).json({result: users});
    } catch (error) {
        console.error('Error fetching users without messages:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all messages for a user
router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const perPage = 20;

        // Find and paginate messages where the user is either the sender or the receiver
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }],
        })
            .sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate('attachment');

        res.status(200).json({ result: messages });
    } catch (error) {
        console.error('Error fetching users without messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

module.exports = router;
