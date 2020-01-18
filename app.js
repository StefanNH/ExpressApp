const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

const app = express();

//passport config
require('./config/passport')(passport);

//db connection
const db = require('./config/keys').MongoUR;
mongoose.connect(db, {useNewUrlParser: true})
    .then(()=> console.log('Database connected'))
    .catch(err => console.log(err));

//rendering pug views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//BodyParser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//connecting flash
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.user || null;
    next();
});

//static folder
app.use(express.static(path.join(__dirname,'public')));


//routes
app.use('/',require('./routes/main'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('server runing on port %d',PORT));