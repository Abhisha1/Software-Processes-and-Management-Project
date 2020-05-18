const setHours = require("date-fns/setHours");
const router = require('express').Router();
let Order = require('../models/order');


router.route('/').get((req, res) => {
    Order.find()
         .then(orders => res.json(orders))
         .catch(err => res.status(400).json(`Error: ${err}`))
});


router.route('/add').post((req, res) => {
    const email = req.body.email;
    const date = req.body.date;
    const time = req.body.time;
    const total = req.body.total;
    const items = req.body.items;

    console.log("New order incoming");
    var dateObject=  new Date(date);
    console.log("Date: " + dateObject);
    console.log("Hours: " + dateObject.getHours());
    console.log("Minutes: " + dateObject.getMinutes());

    const order = new Order({
        email: email,
        date: date,
        time: time,
        total: total,
        items: items
    });

    order.save()
         .then(() => res.json('Order added!'))
         .catch(err => res.status(400).json(`Error: ${err}`));
});


router.route('/bookings/:date').get((req, res) => {
    const date = new Date(req.params.date);
    console.log(typeof date);
    console.log("Date:   " + date);
    console.log("Hours:  " + date.getHours());
    console.log("Minutes:" + date.getMinutes());

    const hours = [16, 17, 18];
    var queries = [];
    hours.forEach(hour => {
        const dateTime = new Date(date).setHours(hour);
        const query = Order.find({ date: dateTime });
        queries.push(query);
    });

    Promise.all(queries)
           .then(orders => {
               console.log(orders);
               const times = [16, 17, 18]
               var availableTimes = {};
               for (var i = 0; i < orders.length; i++) {
                   var time = times[i];
                   availableTimes[time] = orders[i].length < 2;
               }
               console.log(JSON.stringify(availableTimes));
               res.json(availableTimes);
           })
           .catch(error => console.log(error));
});


module.exports = router;