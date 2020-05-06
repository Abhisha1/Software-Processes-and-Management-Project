const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + error));
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        email: email,
        password: password
    });
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }, function(err, user) {
        if (err) {
            throw err;
        }
        // Validate the password
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                throw err;
            }
            if (isMatch) {
                res.json('Login successful!')
            } else {
                res.json('Invalid password');
            }
        });
    });
});

module.exports = router;