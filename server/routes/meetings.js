// routes/meetings.js

const express = require('express');
const router = express.Router();
const Meeting = require('../models/meeting');

// Route to create a new meeting
router.post('/create', async (req, res) => {
  try {
    const { title, description, startDate, endDate, location, participants, supervisor } = req.body;

    const meeting = new Meeting({
      title,
      description,
      startDate,
      endDate,
      location,
      participants,
      supervisor,
    });

    const savedMeeting = await meeting.save();
    res.status(201).json({ message: 'Meeting created successfully', result: savedMeeting });
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ error: 'An error occurred while creating the meeting' });
  }
});

// Route to get all meetings
router.get('/all', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json({ result: meetings });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'An error occurred while fetching meetings' });
  }
});

// Route to update a meeting
router.post('/update/:id', async (req, res) => {
  try {
    const meetingId = req.params.id;
    const { title, description, startDate, endDate, location, participants, supervisor } = req.body;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      {
        title,
        description,
        startDate,
        endDate,
        location,
        participants,
        supervisor,
      },
      { new: true }
    );

    res.status(200).json({ message: 'Meeting updated successfully', result: updatedMeeting });
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ error: 'An error occurred while updating the meeting' });
  }
});

// Route to delete a meeting
router.post('/delete/:id', async (req, res) => {
  try {
    const meetingId = req.params.id;

    const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);

    if (!deletedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.status(200).json({ message: 'Meeting deleted successfully', result: deletedMeeting });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ error: 'An error occurred while deleting the meeting' });
  }
});

module.exports = router;
