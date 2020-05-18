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



router.route('/bookings').get((req, res) => {
    const date = req.body.date;
    const email = req.body.email;
    const time = req.body.time;

    console.log("Date: " + req.date);


    //var query = { email: "manny@gmail.com" };
    //var query = { date: "2020-05-22T14:00:00.000+00:00"};
    var query = { date: date };


    Order.find(query, function(err, result) {
        if (err) {
            res.status(400).json(`Error: ${err}`);
            throw err;
        }
        console.log(result);
        res.json(result);
    });
});

// Get available times for a specific date and time
/*
router.route('/bookings/:date').get((req, res) => {
    const date = req.params.date;
    console.log("Original date: " + date);

    var availableTimes = {
        "4:00PM - 5:00PM": 2,
        "5:00PM - 6:00PM": 2,
        "6:00PM - 7:00PM": 2
    }
    const query = { date: date };
    Order.find(query, function(err, results) {
        if (err) {
            res.status(400).json(`Error: ${err}`);
            throw err;
        }
        var dateObject = new Date(date);
        console.log("Date:   " + dateObject);
        console.log("Hours:  " + dateObject.getHours());
        console.log("Minutes:" + dateObject.getMinutes());
        console.log(results.length);

        
        results.forEach(result => {
            const time = result.time;
            availableTimes[time] -= 1;
        });

        var response = {};
        for (var time in availableTimes) {
            if (availableTimes[time] > 0) {
                response[time] = true;
            } else {
                response[time] = false;
            }
        }
        res.json(response);
    });
});
*/

router.route('/bookings/:date').get((req, res) => {
    const date = new Date(req.params.date);
    console.log(typeof date);
    console.log("Date:   " + date);
    console.log("Hours:  " + date.getHours());
    console.log("Minutes:" + date.getMinutes());

    const hours = [16, 17, 18];
    var response = {};
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
               /*
               var availableTimes = times.map((time, i) => {
                   return { [time]: orders[i].length < 2 }
               });
               */
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


    // This waits for all promsies to finish

    // Promise.all([LIST_OF_PROMISES])
    //        .then(values => console.log(values))
    





        /*
        Order.find(query, (err, results) => {
            if (err) {
                res.status(400).json(`Error: ${err}`);
                throw err
            }
            console.log("Results length: " + results.length);
            if (results.length < 2) {
                response[hour] = true;
                //console.log("Results less than two");
                //console.log(JSON.stringify(response));
            } else {
                response[hour] = false;
                //console.log("Results greater than two");
            }

            if (hour == 18) {
                res.json(response);
                console.log("Final repsonse: " + JSON.stringify(response));
            }
        });
        
    });
    */



module.exports = router;