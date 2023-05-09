const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Group = new Schema({
    name: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    approved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// Export Model
module.exports = mongoose.model('Group', Group);