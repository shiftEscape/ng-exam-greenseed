// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var UserSchemaObject = {
    username: String,
    first_name: String, 
    last_name: String, 
    password: String,
    salt: String,
    email: String 
};

var UserSchema = new Schema(UserSchemaObject);

UserSchema.pre('save', function(next) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64).toString('hex');
    next();
});

UserSchema.methods.validatePassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.password === hash;
};

var User = mongoose.model('User', UserSchema);
module.exports.model = User;

module.exports.createUser = function(obj, callback) {
    if (obj === null || typeof obj !== "object") {
        return callback('Params should be an object and not null!', null);
    }

    var user = new User();
    
    for (var prop in obj) {
      if (UserSchemaObject[prop] != null) {
        user[prop] = obj[prop];
      }
    }

    return user.save(function(err, savedUser) {
      return callback(err?err:null , err?null:savedUser);
    });
}