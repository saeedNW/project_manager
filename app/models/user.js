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
    roles: {
        type: String,
        default: ["USER"]
    },
    skulls: {
        type: String,
        default: []
    },
    team: {
        type: String,
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