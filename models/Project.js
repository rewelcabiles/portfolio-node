const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Project Name Required"]},
    description: String,
    banner: String,
    tags: [String],
    creationDate: {
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.model('Projects', projectSchema);
