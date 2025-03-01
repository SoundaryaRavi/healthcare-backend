const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new mongoose.Schema({
    userId: {
         type: Schema.Types.ObjectId, ref: 'User', required: true // Reference to User model
    },
    date: {
       type: Date
    },
    content: {
       type: String
    }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;