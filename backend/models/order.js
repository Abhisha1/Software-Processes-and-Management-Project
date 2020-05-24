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

function fillTable(items) {
    const types = ["Fruit", "Vegetable", "Mixed"];
    const sizes = ["Small", "Medium", "Large"];

    var rows = '';
    for (const type of types) {
        for (const size of sizes) {
            var quantity = items[type][size];
            if (quantity > 0) {
                var row = getRow(quantity, size, type);
                rows += row;
            }
        }
    }
    return rows;
}

function getRow(quantity, size, type) {
    var subtotal = getSubtotal(quantity, size, type);
    return (
        `<tr>
            <td>${quantity}</td>
            <td>${type} Box (${size})</td>
            <td>${'$' + subtotal}</td>
        </tr>`
    );
}

function getSubtotal(quantity, size, type) {
    const price = { "Fruit": 20, "Vegetable": 15, "Mixed": 18 };
    const factor = { "Small": 1, "Medium": 2, "Large": 3 };
    return quantity * price[type] * factor[size];
}

function getTotal(items) {
    const types = ["Fruit", "Vegetable", "Mixed"];
    const sizes = ["Small", "Medium", "Large"];

    var total = 0;
    for (const type of types) {
        for (const size of sizes) {
            var quantity = items[type][size];
            if (quantity > 0) {
                total += getSubtotal(quantity, size, type);
            }
        }
    }
    return '$' + total;
}

orderSchema.pre('save', function(next) {
    // When the booking is final, the system should send a confirmation email 
    // to the customer with the date, time, type and size of box; along with 
    // the price of the box chosen.
    var order = this;
    
    /* DEBUGGING
    console.log(Object.keys(order));
    console.log("Order email: " + order.email);
    console.log('Date: ' + order.date);
    console.log("ID: " + order._id);
    */

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    var dateAEST = new Date(order.date).toLocaleString("en-AU", {timeZone: "Australia/Melbourne"});

    var mailOptions = {
        from: process.env.EMAIL,
        to: order.email,
        subject: `Your JJFresh Order Confirmation (#${order._id})`,
 
        html: `<!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    max-width: 500px;
                    margin: auto;
                }
        
                p {
                    font-size: 16px;
                    font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
                }
        
                h4 {
                    font-size: 24px;
                    font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
                }
        
                #order-details {
                    width: 75%;
                }
        
                h3 {
                    font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
                    text-align: right;
                    font-size: 20px;
                    font-weight: bold;
                }
                
                #items {
                    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }
        
                #items td, #items th {
                    border: 1px solid #ddd;
                    padding: 4px;
                }
        
                #items tr:nth-child(even) {background-color: #f2f2f2;}
        
                #items tr:hover {background-color: #ddd;}
        
                #items th {
                    padding-top: 12px;
                    padding-bottom: 12px;
                    text-align: left;
                    background-color: #4CAF50;
                    color: white;
                }
            </style>
        </head>
        
        <body>
            <div class="message">
                <p>Hey there! Thanks for placing your order with JJFresh. By 
                    purchasing your fresh produce from us, you've helped
                    support an Australian company employing hardworking Australians.</p>
                                       
                <p>We're just processing your order, then your products will be
                delivered to you on the scheduled date.</p>
        
                <p>Before you go! Are your order details listed below correct? If there’s an 
                issue with the details, please get in touch asap and our friendly Customer Service Team 
                will be there to help in a jiffy.
                </p>
            </div>
            
            <div class="order-details">
                <h4>Order Details</h4>
                <p>Your <strong>order ID is #${order._id}</strong> and contains</p>
                <table id="items">
                    <tr>
                        <th>Qty</th>
                        <th>Item</th>
                        <th>Subtotal</th>
                    </tr>
                    ${fillTable(order.items)}
                </table>
                <h3>Total: AUD ${getTotal(order.items)}</h3>
            </div>
        
            <div class="delivery-details">
                <h4>Delivery Date & Time</h4>
                <p>Your order will be delivered on ${dateAEST}.</p>
                <p>Please give us up to an hour starting from the specified time to deliver your order.</p>
            </div>
            <br/>
            <div>
                <p>Until next time, the team at JJFresh.</p>
            </div>
        </body>
        </html>`
    }

    transporter.sendMail(mailOptions)
    .then(res => console.log(res))
    .catch(err => console.log(err));

    next();
});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;