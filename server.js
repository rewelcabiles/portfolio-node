// Express and EJS
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Database
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, () => console.log("MongoDB Connected"))

// Sessions
const session = require("express-session")
const MongoStore = require("connect-mongo")

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(mongoose.connection)
}))





// Template
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname+'public/css'));


// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
app.use('/', authRouter);
app.use('/', indexRouter);


app.listen(5000)