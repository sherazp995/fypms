const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Project = new Schema({
    title: String,
    description: String,
    skills: String,
    domain: String,
    languages: String,
    tools: String,
    supervisorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    maxStudents: {
        default: 1,
        type: Number
    }
}, { timestamps: true })

// Export Model
module.exports = mongoose.model('Project', Project);