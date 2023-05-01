const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const UserSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

UserSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        console.log(this, "this");
        document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) =>{
            if(err){
                next(err)
            }
            else{
                document.password = hashedPassword;
                next()
            }
        })
    }else{
        next()
    }
})

UserSchema.methods.isCorrectPassword = function (password, callback){
    console.log(password, this, "hh");
    bcrypt.compare(password, this.password, (err, same) => {
        if(err){
            // console.log(err, "password");
            callback(err)
        }else{
            callback(err, same)
        }
    })
}

// UserSchema.methods.isCorrectPassword = function(password, callback) {
//     bcrypt.compare(password, this.password, function(err, same) {
//       if (err) {
//         callback(err);
//       } else {
//         callback(err, same);
//       }
//     });
//   }

module.exports = mongoose.model('User', UserSchema);