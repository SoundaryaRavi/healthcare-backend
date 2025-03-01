const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    userId: {

    },
    date: {

    },
    content: {
        
    }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;