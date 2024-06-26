const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskResult = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  supervisor: {
    type: Schema.Types.ObjectId,
    ref: 'Supervisor',
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  remarks: {
    type: String,
  },
  markedDocument: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
  },
  score: {
    type: Number,
  }
}, { timestamps: true });



module.exports = mongoose.model('TaskResult', TaskResult);
