const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Timetable = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  events: [{ type: Schema.Types.ObjectId, ref: 'TimetableEvent' }],
});

module.exports = mongoose.model('Timetable', Timetable);
