// Schema for user
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String
    }
},
{
    timestamps: true,
});


// Password hash generation function
userSchema.methods.generateHash = function(password) {
    const saltRounds = 10;
    bcrypt.hash(password, 10)
}


// Password validation function
userSchema.methods.validPassword = function(password) {
    bcrypt.compare(password, this.password, function(err, res) {
        return res;
    });
}

const User = mongoose.model('User', userSchema);
module.exports = User;