const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Message = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        default: false
    },
    attachment: {
        type: Schema.Types.ObjectId,
        ref: 'Document',
    },
}, { timestamps: true });

module.exports = mongoose.model('Message', Message);
