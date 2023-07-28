const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Meeting = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: String,
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  supervisor: {
    type: Schema.Types.ObjectId,
    ref: 'Supervisor',
    required: true,
  },
});

// Export Model
module.exports = mongoose.model('Meeting', Meeting);
