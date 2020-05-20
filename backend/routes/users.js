const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        email: email,
        password: password,
        mobile: req.body.mobile,
        home:req.body.home,
        work:req.body.work
    });
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email }).then(user =>  {
        // Validate the password
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                res.status(400).json({msg: "Signin Failed: Please check your details"});
                return;
            }
            if (isMatch) {
                res.status(200).json({msg: "Login successful"});
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
router.route('/update').post((req, res) => {
    //const oldEmail = req.body.oldEmail;
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const password = req.body.password;
    // bcrypt.genSalt(10, function(err, salt) {
    //     if (err) {
    //         return next(err);
    //     }
    //     // Hash the password along with our new salt
    //     bcrypt.hash(password, salt, function(err, hash) {
    //         if (err) {
    //             return next(err);
    //         }
    //         // Override the plaintext password with the hashed one
    //         password = hash;
    //     });
    // });
    User.findOne({ email: email }).then(user =>  {
        // Validate the password
        user.comparePassword(oldPassword, function(err, isMatch) {
            if (err) {
                res.status(400).json({msg: "Signin Failed: Please check your details"});
                return;
            }
            if (isMatch) {
                user.password = password;

                console.log(req.body)
                if(req.body.mobile !== ''){
                    user.mobile = req.body.mobile;
                }
                if(req.body.home !== ''){
                    user.mobile = req.body.home;
                }
                if(req.body.work !== ''){
                    user.mobile = req.body.work;
                }
                user.save()
                    .then(() => res.json('User updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));

            } else {
                res.status(400).json({msg: "old password is incorrect: Please check your details"});
                return;
            }
        });
    }).catch(err => {
        res.status(400).json({msg: "Username/email is incorrect: Please check your details"});
    });

});
module.exports = router;