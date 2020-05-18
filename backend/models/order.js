// Schema for order
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    email: { type: String, required: true },
    date: { type: Date, required: true },
    total: { type: Number, required: true },
    items: {
        Fruit: {
            Small: Number, 
            Medium: Number, 
            Large: Number
        },
        Vegetable: {
            Small: Number,
            Medium: Number,
            Large: Number
        },
        Mixed: {
            Small: Number,
            Medium: Number, 
            Large: Number
        }
    }
},
{
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;