//import mongoose
var mongoose = require('mongoose');
// create mongoose schema
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var userSchema = new Schema({
    Email:{type: String, required: true},
    Password:{type: String, required: true}
});

userSchema.methods.encryptPassword = function(Password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(Password){
    return bcrypt.compareSync(Password, this.Password);
};

module.exports = mongoose.model('user', userSchema);