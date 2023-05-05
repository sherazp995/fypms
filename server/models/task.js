// Task Model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Task = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    },
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    },
});

// Export Model
module.exports = mongoose.model('Task', Task);
