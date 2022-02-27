const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Project Name Required"]},
    safe_name: String,
    description: String,
    banner: String,
    tags: [String],
    projectLink: String,
    creationDate: {
        type: Date,
        default: Date.now,
    },
    last_update: {
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.model('Projects', projectSchema);
