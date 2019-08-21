const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemDesc: {
        type: String,
        required: true
    },
    itemMaxValue: {
        type: Number,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

// {category: "Cleanliness", items:[{itemDesc: "Tables clean", itemMaxValue:69}, {itemDesc: "Crows present", itemMaxValue:6}]},
const checkListSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    items: [itemSchema]
});

module.exports = mongoose.model('checkList', checkListSchema);