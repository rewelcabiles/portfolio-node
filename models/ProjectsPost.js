const mongoose = require('mongoose');

const projectPostSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Post Title Required"]},
    content: String,
    creationDate: {
        type: Date,
        default: Date.now,
    },
    images:[{String}],
    projectId: { type: Schema.Types.ObjectId, ref: 'Projects' }
});

module.exports = mongoose.model('projectPost', projectPostSchema);
