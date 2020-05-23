// Schema for order
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Schema = mongoose.Schema;

require('dotenv').config();


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


orderSchema.pre('save', async () => {
    var order = this;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: order.email,
        subject: 'New order from JJFresh',
        text: 'hell yeah brother new order from jjfresh'
    }

    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);

});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;