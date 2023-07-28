const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TimetableEvent = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('TimetableEvent', TimetableEvent);
