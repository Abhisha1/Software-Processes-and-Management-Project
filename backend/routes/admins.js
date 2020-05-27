const router = require('express').Router();
let Admin = require('../models/admin');
router.route('/add').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new Admin({
        email: email,
        password: password
    });
    newUser.save()
        .then(() => {
            res.status(200).json({msg: "Admin added!", id: newUser._id});
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Admin.findOne({ email: email }).then(user =>  {
        // Validate the password
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                res.status(400).json({msg: "Signin Failed: Please check your details"});
                return;
            }
            if (isMatch) {
                res.status(200).json({msg: "Login successful", id: user._id});
                return;
            } else {
                res.status(400).json({msg: "Signin Failed: Please check your details"});
                return;
            }
        });
    }).catch(err => {
        res.status(400).json({msg: "Signin Failed: Please check your details"});
    });
});
module.exports = router;