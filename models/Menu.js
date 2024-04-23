const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    teste: {
        type:String,
        enum:['sweet','sour','spicy'],
        required: true
 

    },
   
});

const MenuItem = mongoose.model('MenuItem',menuItemSchema);

module.exports = MenuItem;