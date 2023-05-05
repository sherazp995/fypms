const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Project = new Schema({
    title: String,
    description: String,
    skills: String,
    domain: String,
    languages: String,
    tools: String,
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    maxStudents: {
        default: 1,
        type: Number
    },
    file: String
}, { timestamps: true })

// Export Model
module.exports = mongoose.model('Project', Project);