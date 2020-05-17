const router = require('express').Router();
let Order = require('../models/order');


router.route('/').get((req, res) => {
    Booking.find()
           .then(orders => res.json(orders))
           .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const date = req.body.date;
    const time = req.body.time;
    const total = req.body.total;
    const items = req.body.items; 

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

module.exports = router;