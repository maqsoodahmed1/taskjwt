const dotenv = require('dotenv')
const mongoose = require('mongoose')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var authRouter  = require('./routes/auth')
var genreRouter = require('./routes/genre')
var moviesRouter = require('./routes/movies')

var app = express();
dotenv.config()

mongoose.connect('mongodb://localhost/taskjwt',{useNewUrlParser: true,useUnifiedTopology:true})
.then(() => console.log('db is connected'))
.catch(error => console.log(error.message))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/genre',genreRouter)
app.use('/api/movies',moviesRouter)

module.exports = app;
