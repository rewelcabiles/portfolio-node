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
                        projects: projects,
                        tags: tags
                    })
                }
            })
        }
    });
});

router.get('/add', (req, res) => {
    res.render('projects/add_project');
}); 

router.post('/add', upload.single("project_image"), urlencodedParser, (req, res) => {
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
                    description: req.body.project_description,
                    banner: project_name + "/banner." + req.file.mimetype.split("/")[1],
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




module.exports = router