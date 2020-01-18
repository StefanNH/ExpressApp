const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

//passport middleware
module.exports = (passport)=>{
    passport.use(new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
        User.findOne({email:email})
        .then(user=> {
            if(!user){
                return done(null, false, {message:'Email not registered'});
            }
            else{
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    return done(null,user);
                }
                else {
                    return done(null,false,{message:'Wrong password'});
                }
            });
            }
        });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};