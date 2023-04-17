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
    status: {
        type: Number,
        default: 1 // 1 for active 2 for deleted 0 for not verified
    },
    // fcmToken: [String],
}, { timestamps: true })

// Export Model
module.exports = mongoose.model('User', User);