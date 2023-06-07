const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Project = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    skills: String,
    domain: String,
    languages: String,
    tools: String,
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    maxStudents: {
        default: 1,
        type: Number
    },
    enrolledStudents: {
        default: 0,
        type: Number
    },
    project_file: String
}, { timestamps: true })

// Export Model
module.exports = mongoose.model('Project', Project);