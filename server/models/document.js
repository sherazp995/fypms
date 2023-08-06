const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Document = new Schema({
    name: String,
    path: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        // enum: ["group", "project", "task", "result", "message"],
        required: true
    }, // group, project, task, result or message
    reference: {
        type: Schema.Types.ObjectId,
        ref: 'type',
        index: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }
}, { timestamps: true })

// Export Model
module.exports = mongoose.model('Document', Document);