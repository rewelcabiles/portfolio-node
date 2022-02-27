const express = require('express')
const router = express.Router()

// Models
var Project = require('../models/Project')

// Requests and stuff
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// Multer - File storage
const multer = require("multer");
const fs = require('fs')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = "public/projects/" + req.body.project_name.replace(/\s/g, "_")
        fs.access(dest, function (error) {
            if (error) {
                console.log("Directory does not exist.");
                return fs.mkdir(dest, (error) => cb(error, dest));
            } else {
                console.log("Directory exists.");
                return cb(null, dest);
            }
        });
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        const folder_name = req.body.project_name.replace(/\s/g, "_");
        cb(null, `banner.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
      cb(null, true);
    } else {
      cb(new Error("Not a valid image file"), false);
    }
  };

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});


router.get('/', (req, res) => {
    // get all distinct tags from Projects and get all projects
    Project.distinct("tags", (err, tags) => {
        if (err) {
            console.log(err)
        } else {
            console.log(tags)
            Project.find({}, (err, projects) => {
                if (err) {
                    console.log(err)
                } else {
                    res.render('projects/projects', {
                        all_projects: projects,
                        tags: tags
                    })
                }
            })
        }
    });
});

router.get('/add', (req, res) => {
    //check if user is logged in
    if (req.session.user) {
        res.render('projects/add_project');
    } else {
        res.sendStatus(404);
    }
}); 

router.post('/add', upload.single("project_image"), urlencodedParser, (req, res) => {
    if (!req.session.user) {
        res.sendStatus(404);
    } 

    // check if exists in database
    Project.findOne({ name: req.body.project_name }, (err, project) => {
        if (err) {
            console.log(err);
        } else {
            if (project) {
                console.log("Already exists!")
                res.render('add_project', { error: "Project already exists" });
            } else {
                const project_name = req.body.project_name.replace(/\s/g, "_");
                var newProject = new Project({
                    name: req.body.project_name,
                    safe_name: req.body.project_name.replace(/\s/g, "_"),
                    description: req.body.project_description,
                    banner: project_name + "/banner." + req.file.mimetype.split("/")[1],
                    projectLink: req.body.project_link,
                    tags: req.body.project_tags.split(", "),
                    creationDate: Date.now()
                });
                //save project to database
                newProject.save();
                
                res.redirect('/projects');
            }
        }
    });
});

// route to delete a project
router.get('/delete/:safe_name', (req, res) => {
    if (!req.session.user) {
        res.sendStatus(404);
    }
    // delete a project from database
    Project.deleteOne({ safe_name: req.params.safe_name }, (err, project) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/projects');
    });
});

// route to view a project
router.get('/view/:project_name', (req, res) => {
    // get project from database
    Project.findOne({ safe_name: req.params.project_name }, (err, project) => {
        if (err) {
            console.log(err);
        } else {
            if (project) {
                res.render('projects/view_project', {
                    project: project
                });
            } else {
                res.sendStatus(404);
            }
        }
    });
});

    



module.exports = router