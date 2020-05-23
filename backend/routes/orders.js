const router = require('express').Router();
let Order = require('../models/order');

router.route('/').get((req, res) => {
    Order.find()
         .then(orders => res.json(orders))
         .catch(err => res.status(400).json(`Error: ${err}`))
});


router.route('/add').post((req, res) => {
    const email = req.body.email;
    const total = req.body.total;
    const items = req.body.items;
    const date = new Date(req.body.date);

    const order = new Order({
        email: email,
        date: date,
        total: total,
        items: items
    });

    order.save()
    .then(() => {
        res.json('Order added!')
    })
    .catch(err => {
        res.status(400).json(`Error: ${err}`)
    });
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
    const date = new Date(req.params.date);
    Order.find({date: date})
    .then(orders => {
        res.json(orders.length < 2)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(`Error: ${err}`);
    })
});


module.exports = router;