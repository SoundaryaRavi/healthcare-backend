const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activityLogsSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    logType: {
        type: Number
    },
    logContent: {
        type: String
    }
});

const Activitylogs = mongoose.model('Reminder', activityLogsSchema);

module.exports = Activitylogs;