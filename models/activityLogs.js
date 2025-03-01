const mongoose = require('mongoose');

const activityLogsSchema = new mongoose.Schema({
    userId: {

    },
    date: {

    },
    content: {
        
    }
});

const Activitylogs = mongoose.model('Reminder', activityLogsSchema);

module.exports = Activitylogs;