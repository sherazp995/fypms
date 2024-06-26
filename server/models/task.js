// Task Model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Task = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    questionDocument: {
        type: Schema.Types.ObjectId,
        ref: 'Document',
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
        required: true,
        index: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        index: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
        index: true
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    },
    totalMarks: {
        type: Number,
        required: true,
        default: 0
    },
});

// Export Model
module.exports = mongoose.model('Task', Task);
