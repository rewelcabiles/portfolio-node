const express = require('express')
const router = express.Router()

const Project = require('../models/Project')

// Routes
router.get('/', (req, res) => { 
    // get 6 random projects from database
    Project.aggregate([
        { $sample: { size: 6 } }
    ], (err, projects) => {
        if (err) {
            console.log(err)
        } else {
            res.render('index', {
                projects: projects
            })
        }
    })
});

router.get('/contact', (req, res) => {
    res.render('partials/contacts', {solo_page: true});
});




module.exports = router