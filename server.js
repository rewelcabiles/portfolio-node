const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const http = require('http')

// Template
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname+'public/css'));


// Routes
app.get('/', (req, res) => {  
    res.render('index');

});

app.listen(5000)