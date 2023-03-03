const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: Number,
    role: {
        type: String,
        enum: ["Admin", "Supervisor", "Student"],
        default: "Student", 
        required: true
    }, // Admin, Supervisor or Student
    roleId: { type: mongoose.Schema.Types.ObjectId, refPath: 'role' },
    status: {
        type: Number,
        default: 0
    },
    fcmToken: [String],
}, { timestamps: true })

// Export Model
module.exports = mongoose.model('User', User);