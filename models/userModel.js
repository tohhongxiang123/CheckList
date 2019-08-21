const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('checkListUser', userModel);