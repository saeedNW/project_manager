/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define user database model schema
 */
const UserSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    profile_image: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    roles: {
        type: [String],
        default: ["USER"]
    },
    skills: {
        type: [String],
        default: []
    },
}, {
    timestamps: true
});

/**
 * create mongoose model from user schema
 */
const userModel = mongoose.model("user", UserSchema);

/**
 * export user model
 */
module.exports = {
    userModel
}