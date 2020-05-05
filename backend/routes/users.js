const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + error));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            throw err;
        }
        newUser = new User({
            username: username,
            password: hash,
        });
        newUser.save()
            .then(() => res.json('User added! username is ' + req.body.username + ', hashed password is ' + req.body.password))
            .catch(err => res.status(400).json('Error: ' + err));
    });
});


router.route('/login').post((req, res) => {
    User.findOne({ username: req.body.username });
    // Validate input password
    if (!user.validPassword()) {
        console.log('Invalid password!');
        res.json('Invalid password');
    } else {
        console.log('Successfully logged in!');
        res.json('Successfully logged in');
    }

});

module.exports = router;