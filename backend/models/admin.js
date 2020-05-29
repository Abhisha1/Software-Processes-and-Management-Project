// Schema for user
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true
    }
},
{
    strict:false,
    timestamps: true,
});


adminSchema.pre('save', function(next) {
    var admin = this;
    
    // Only hash the password if it has been modified (or is new)
    if (!admin.isModified('password')) {
        return next();
    }
    // Generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        // Hash the password along with our new salt
        bcrypt.hash(admin.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            // Override the plaintext password with the hashed one
            admin.password = hash;
            next();
        });
    });
});


adminSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;