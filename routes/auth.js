const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User.js')

const router = express.Router()

// create application/json parser
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//login post router
router.post('/register', urlencodedParser, (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username }, (err, user) => {
        if (user) {
            res.render('auth/login', {error: "Username already exists", isRegister: true})
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({
                username: username,
                password: hashedPassword
            });
            newUser.save();
            console.log(newUser)
            res.redirect('login')
        }
    });
});

router.post('/login', urlencodedParser, (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.redirect('/')
            } else {
                res.render('auth/login', {
                    error: "Invalid username or password",
                    isRegister: false
                });
            }
        } else {
            res.render('auth/login', {
                error: "Invalid username or password",
                isRegister: false
            });
        }
    });
});

router.get('/login', (req, res) => { 
    res.render('auth/login', {
        "isRegister": false
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('login')
})

router.get('/register', (req, res) => {
   res.render('auth/login', {
       "isRegister": true
   });
});

module.exports = router