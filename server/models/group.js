const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Group = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
}, { timestamps: true })

// Export Model
module.exports = mongoose.model('Group', Group);