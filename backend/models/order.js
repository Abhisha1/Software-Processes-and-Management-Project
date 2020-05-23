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


orderSchema.pre('save', function(next) {
    // When the booking is final, the system should send a confirmation email 
    // to the customer with the date, time, type and size of box; along with 
    // the price of the box chosen.
    var order = this;

    console.log(Object.keys(order));
    console.log("Order email: " + order.email);
    console.log('Date: ' + order.date);
    console.log("ID: " + order._id);

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
        subject: `Your JJFresh Order Confirmation (#${order._id})`,
        text: `Hey there! Thanks for placing your order with us. By
               purchasing your fresh produce from JJFresh, you've helped
               support an Australian company employing hardworking Australians.
               
               We're just processing your order, then your products will be
               delivered to you on the scheduled date.
               
               <INSERT ORDER HERE>`
    }

    transporter.sendMail(mailOptions)
    .then(res => console.log(res))
    .catch(err => console.log(err));

    //console.log('Message sent: %s', info.messageId);

    next();
});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;