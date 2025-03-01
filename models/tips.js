const mongoose = require('mongoose');

const tipsSchema = new mongoose.Schema({
    healthTip: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['steps', 'waterIntaken', 'sleep'],
        required: true
    }
});

const Tips = mongoose.model('Tips', tipsSchema);

module.exports = Tips;