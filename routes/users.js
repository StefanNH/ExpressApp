const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');
const { forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');
const Message = require('../models/Message');

//rendering registration page
router.get('/register', forwardAuthenticated, (req,res) => res.render('register'));
//rendering login page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/msgbox', ensureAuthenticated, (req,res)=> res.render('msgbox'));

router.get('/inbox', ensureAuthenticated, (req,res)=> {
  Message.find({sendTo: req.user.email}).sort('-date').exec((err, messages)=>{
  if(err) throw err;
  else{
    res.render('inbox',{resMesseges:messages})
  }
})
});

router.get('/outbox', ensureAuthenticated, (req,res)=>{
  Message.find({sendBy: req.user.email}).sort('-date').exec((err, messages)=>{
    if(err) throw err;
    else{
      res.render('outbox',{sentMesseges:messages})
    }
  })
});

router.post('/msgbox',(req,res)=>{
  const {email, message, cipher} = req.body;
  if(!User.findOne({ email: email})){
    let errors = [];
      errors.push({msg: 'Email not found in our database'});
      res.render('msgbox',{errors: errors});
  }else{
    let newMesage = new Message({
      sendBy: req.user.email,
      sendTo: email,
      msg: message,
      cipher: cipher
    })
    newMesage.save();
    req.flash('success_msg','Message sent');
    res.redirect('/users/msgbox');
  }
});

//register handler
router.post('/register',(req,res)=>{
    const { uname, email, psw, psw2 } = req.body;
    let errors = [];
    
    if (psw != psw2) {
      errors.push({ msg: 'Passwords do not match' });
      res.render('register',{errors:errors});
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({msg: 'Email already exists'});
          res.render('register',{errors: errors});
        } else {
          const newUser = new User({
            uname: uname,
            email: email,
            password: psw
          });
          bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err){
                  console.log(err)
                } else {
                  newUser.password = hash;
                  newUser.save()
                  .then(user => {
                  req.flash('success_msg','You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            }
            });
          });
        }
      });
    }
});
  

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/msgbox',
    failureRedirect: '/users/register',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout',(req,res)=> {
  req.logout();
  req.flash('success_msg','You logged out');
  res.redirect('/');
})

module.exports = router;