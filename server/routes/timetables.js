const express = require('express');
const router = express.Router();
const Timetable = require('../models/timetable');
const TimetableEvent = require('../models/timetableEvent');

// Get all timetable events for the logged-in user
router.get('/all', async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ user: req.headers.accessid }).populate('events');
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }
    return res.json({result: timetable.events});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new timetable event for the logged-in user
router.post('/create', async (req, res) => {
  try {
    const { title, description, startTime, endTime } = req.body;
    const newEvent = new TimetableEvent({
      title,
      description,
      startTime,
      endTime,
      user: req.headers.accessid,
    });
    await newEvent.save();

    const timetable = await Timetable.findOne({ user: req.headers.accessid });
    if (!timetable) {
      // If user's timetable does not exist, create one
      const newTimetable = new Timetable({
        user: req.headers.accessid,
        events: [newEvent._id],
      });
      await newTimetable.save();
    } else {
      // If user's timetable already exists, add the new event to it
      timetable.events.push(newEvent._id);
      await timetable.save();
    }

    return res.json({result: newEvent});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Update an existing timetable event for the logged-in user
router.post('/update/:id', async (req, res) => {
  try {
    const { title, description, startTime, endTime } = req.body;
    const event = await TimetableEvent.findById(req.params.id);
    if (!event || event.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Event not found' });
    }
    event.title = title;
    event.description = description;
    event.startTime = startTime;
    event.endTime = endTime;
    await event.save();

    return res.json({result: event});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a timetable event for the logged-in user
router.post('/delete', async (req, res) => {
  try {
    const event = await TimetableEvent.findById(req.params.id);
    if (!event || event.user.toString() !== req.headers.accessid) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.remove();

    const timetable = await Timetable.findOne({ user: req.headers.accessid });
    if (timetable) {
      timetable.events.pull(req.params.id);
      await timetable.save();
    }

    return res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
