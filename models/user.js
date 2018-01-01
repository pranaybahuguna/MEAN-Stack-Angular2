const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let passwordLengthChecker = (password) => {
    if(!password){
        return false;
    } else{
        if(password.length < 8 || password.length > 35){
            return false;
        } else{
            return true;
        }
    }
};

let validPasswordChecker = (password) => {
    if(!password){
        return false;
    } else{
        // Regular Expression to test if password is valid format
       const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
       return regExp.test(password); // Return regular expression test result (true or false)
    }
};

let usernameLengthChecker = (username) => {
    if(!username){
        return false;
    } else{
        if(username.length < 3 || username.length > 15){
            return false;
        } else{
            return true;
        }
    }
};

let validUsernameChecker = (username) => {
    if(!username){
        return false;
    } else{
         // Regular expression to test if username format is valid
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username); // Return regular expression test result (true or false)
    }
};

let emailLengthChecker = (email) => {
    if(!email){
        return false;
    } else{
        if(email.length < 5 || email.length > 30){
            return false;
        } else{
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if(!email){
        return false;
    } else{
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email); // Return regular expression test results (true or false)
    }
};

const emailValidators = [
    {
    validator : emailLengthChecker,
    message : 'Email must be atleast 5 characters long but no more than 30'},
    {
    validator : validEmailChecker,
    message : 'Must be a valid email'}    
];

const usernameValidators = [
    {
    validator : usernameLengthChecker,
    message : 'Username must be atleast 3 characters long but no more than 15'},
    {
    validator : validUsernameChecker,
    message : 'Username must be a valid Username'}    
];

const passwordValidators = [
    {
    validator : passwordLengthChecker,
    message : 'Password must be atleast 8 characters long but no more than 35'},
    {
    validator : validPasswordChecker,
    message : 'Password must be Alpha Numeric with uppercase character(s)'}    
];

const userSchema = new Schema({
    email : {type : String, required : true, unique : true, lowercase : true, validate : emailValidators},
    username : {type : String, required : true, unique : true, lowercase : true, validate : usernameValidators},
    password : {type : String, required : true,validate : passwordValidators}
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password'))
    return next();

    bcrypt.hash(this.password, null, null, (err,hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(pasword,this.password);
};


module.exports = mongoose.model('User', userSchema);