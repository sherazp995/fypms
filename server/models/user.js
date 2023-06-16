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
        enum: ["admin", "supervisor", "student"],
        default: "student",
        required: true
    }, // admin, supervisor or student
    status: {
        type: Number,
        default: 1 // 1 for active 2 for deleted 0 for inactive
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        index: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        index: true
    },
    image: {
        type: String
    }
}, { timestamps: true })

// Export Model
module.exports = mongoose.model('User', User);