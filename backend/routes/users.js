const router = require('express').Router();
const bcrypt = require('bcrypt');
let ObjectId = require('mongodb').ObjectID;
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
        password: password
    });
    newUser.save()
        .then(() => {
            res.status(200).json({msg: "User added!", id: newUser._id});
        })
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

router.route('/getCurrUser').post((req,res) => {
    User.findOne({"_id": ObjectId(req.body.id)})
    .then(user => {
        console.log(user);
        res.status(200).json({data: user});
    })
    .catch(err => {
        console.log(err);
        res.status(200).json({msg: "Could not find that user, please try again"})
    })
})


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
                user.save()
                    .then(() => res.json('User updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
                // User.findOneAndUpdate({email:email},{password:password}).then(user =>  {
                //     // Validate the password
                //     res.status(200).json({msg: "Update successful"});
                //     return;
                // }).catch(err => {
                //     res.status(400).json({msg: "Update Failed: Please check your details"});
               // });
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