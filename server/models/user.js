const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: String,
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
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
}, { timestamps: true })

// Export Model
module.exports = mongoose.model('User', User);