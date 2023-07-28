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
        // enum: ["group", "project", "task"],
        required: true
    }, // group, project or task
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