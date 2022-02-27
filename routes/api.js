const express = require('express')
const router = express.Router()
const Project = require('../models/Project')

// Routes
router.get('/projects', (req, res) => {  
    //get all projects from database
    Project.find({}, (err, projects) => {
        if (err) {
            console.log(err)
        } else {
            res.send(projects)
        }
    })
});

router.get('/project_tags', (req, res) => {  
    //get all distinct tags from projects
    Project.distinct("tags", (err, tags) => {
        if (err) {
            console.log(err)
        }
        res.send(tags)
    })
});




module.exports = router