const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


const User = require('../models/User.js')
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//login post router
router.post('/register', urlencodedParser, (req, res) => {
    const { username, password } = req.body;

    //has password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(username)
    //create new user
    const newUser = new User({
        username: username,
        password: hashedPassword
    });

    newUser.save();

    console.log(newUser)
    res.redirect('/login')
});

router.post('/login', urlencodedParser, (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                console.log('password match')
                res.redirect('/')
            } else {
                console.log('password does not match')
                res.redirect('/login')
            }
        }
    });
});

router.get('/login', (req, res) => { 
    res.render('login', {
        "isRegister": false
    });
});


router.get('/register', (req, res) => {
   res.render('login', {
       "isRegister": true
   });
});

module.exports = router