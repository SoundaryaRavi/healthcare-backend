const mongoose = require('mongoose');

const goalTrackerSchema = new mongoose.Schema({
    activityName: { 
        type: String,
        enum: ['steps', 'waterIntaken', 'sleep'],
        required: true
    },
    activityValue: {
        type: Number, required: true, default: 0
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
});

const GoalTracker = mongoose.model('GoalTracker', goalTrackerSchema);

module.exports = GoalTracker;