/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define projects database model schema
 */
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: "/images/projectDefaultImage.jpg"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
    },
    privateStatus: {
        type: Boolean,
        default: true
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

/**
 * create mongoose model from project schema
 */
const projectModel = mongoose.model("project", ProjectSchema);

/**
 * export project model
 */
module.exports = {
    projectModel
}