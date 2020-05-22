const router = require('express').Router();
let Order = require('../models/order');

router.route('/').get((req, res) => {
    Order.find()
         .then(orders => res.json(orders))
         .catch(err => res.status(400).json(`Error: ${err}`))
});


router.route('/add').post((req, res) => {
    console.log("New order incoming");
    const email = req.body.email;
    const total = req.body.total;
    const items = req.body.items;
    const dateUTC = new Date(req.body.date);
    const timeAEST = dateUTC.toLocaleString("en-US", {timeZone: "Australia/Melbourne"});
    const dateAEST = new Date(timeAEST);
    console.log("Date:    " + dateAEST);
    console.log("Hours:   " + dateAEST.getHours());
    console.log("Minutes: " + dateAEST.getMinutes());

    const order = new Order({
        email: email,
        date: dateAEST,
        total: total,
        items: items
    });

    order.save()
         .then(() => res.json('Order added!'))
         .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:email').get((req,res) => {
    const email = req.params.email
    console.log(email);
    Order.find({email: email})
    .then(orders => {
        console.log(orders);
        res.json(orders);
    })
    .catch(err => {
        console.log(err);
        res.send({});
    })
})

router.route('/delete/:id').get((req, res) => {
    const orderId = req.params.id;
    console.log(orderId);
    Order.findOneAndRemove({"_id": orderId})
    .then(status => {
        console.log(status);
        res.json(status);
    })
    .catch(err => {
        console.log(err);
        res.json({msg: "Could not delete the order, please try again later"})
    })
})


router.route('/bookings/:date').get((req, res) => {
    const dateUTC = new Date(req.params.date);
    const timeAEST = dateUTC.toLocaleString("en-US", {timeZone: "Australia/Melbourne"});
    const dateAEST = new Date(timeAEST);
    //console.log(typeof date);
    //console.log("Date:   " + date);
    //console.log("Hours:  " + date.getHours());
    //console.log("Minutes:" + date.getMinutes());

    const hours = [16, 17, 18];
    var queries = [];
    hours.forEach(hour => {
        const dateTime = new Date(dateAEST).setHours(hour);
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