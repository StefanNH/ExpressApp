const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sendBy:{
        type: String,
        required: true
    },
    sendTo:{
        type: String,
        required: true
    },
    msg:{
        type: String,
        required: true
    },
    cipher:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
    
});

const Message = mongoose.model('Message',MessageSchema);

module.exports = Message;