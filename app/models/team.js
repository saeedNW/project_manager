/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define team database model schema
 */
const TeamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
}, {
    timestamps: true
});

/**
 * create mongoose model from team schema
 */
const teamModel = mongoose.model("team", TeamSchema);

/**
 * export team model
 */
module.exports = {
    teamModel
}