const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/rewelcabiles_me", { useNewUrlParser: true })

// Template
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname+'public/css'));


// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
app.use('/', indexRouter);
app.use('/', authRouter);

app.listen(5000)