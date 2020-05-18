// Schema for order
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    email: String,
    date: Date,
    time: String,
    total: Number,
    items: {
        fruit: {
            small: Number, 
            medium: Number, 
            large: Number
        },
        vegetable: {
            small: Number,
            medium: Number,
            large: Number
        },
        mixed: {
            small: Number,
            medium: Number, 
            large: Number
        }
    }
},
{
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;