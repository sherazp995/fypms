const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const User = require('../models/user');

router.get('/all', async (req, res) => {
    try {
      const currentUserId = req.headers.accessid;
        const usersWithMessages = await User.aggregate([
          {
            $match: {
              status: 1,
              _id: { $ne: currentUserId } 
            }
          },
          {
            $lookup: {
              from: 'messages',
              let: { userId: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $or: [
                        { $eq: ['$sender', '$$userId'] },
                        { $eq: ['$receiver', '$$userId'] } 
                      ]
                    }
                  }
                },
                {
                  $sort: { createdAt: -1 }
                },
                {
                  $limit: 1
                }
              ],
              as: 'messages'
            }
          },
          {
            $project: {
              username: 1,
              firstName: 1,
              lastName: 1,
              email: 1,
              phoneNumber: 1,
              role: 1,
              status: 1,
              project: 1,
              group: 1,
              image: 1,
              messages: 1 
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

// Get all messages for a user
router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const currentUserId = req.headers.accessid;
        const page = parseInt(req.query.page) || 1;
        const perPage = 20;
        const user = await User.findOne({_id: userId})

        const messages = await Message.find({
            $or: [{ sender: userId, receiver: currentUserId }, { sender: currentUserId, receiver: userId }],
        }).sort({ createdAt: -1 })
          .skip((page - 1) * perPage)
          .limit(perPage)
          .populate('attachment');

        res.status(200).json({ result: messages, user });
    } catch (error) {
        console.error('Error fetching users without messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

module.exports = router;
