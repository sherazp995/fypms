const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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
    project_file: String
}, { timestamps: true })

Project.pre('findByIdAndDelete', function(){
    console.log('fiiiiiiiileeeeeeeeeeeee', this.project_file)
    console.log('fiiiiiiiileeeeeeeeeeeee', this.project_file)
    console.log('fiiiiiiiileeeeeeeeeeeee', this.project_file)
    console.log('fiiiiiiiileeeeeeeeeeeee', this.project_file)
    console.log('fiiiiiiiileeeeeeeeeeeee', this.project_file)
    console.log('fiiiiiiiileeeeeeeeeeeee', this.project_file)
    console.log('fiiiiiiiileeeeeeeeeeeee', this.project_file)
    console.log('fiiiiiiiileeeeeeeeeeeee', this.project_file)
    console.log('fiiiiiiiileeeeeeeeeeeee', this.project_file)
    fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'projects', this.project_file))
});

// Export Model
module.exports = mongoose.model('Project', Project);