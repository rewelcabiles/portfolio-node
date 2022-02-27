const express = require('express')
const router = express.Router()


// Routes
router.get('/', (req, res) => {  
    res.render('index');
});

router.get('/contact', (req, res) => {
    res.render('partials/contacts', {solo_page: true});
});




module.exports = router