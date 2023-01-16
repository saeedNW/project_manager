/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define user teams invitation model schema
 */
const InviteRequest = new mongoose.Schema({
    teamId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    caller: {
        type: String,
        required: true,
        lowercase: true
    },
    requestDate: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        default: "pending" /** pending, accepted, rejected */
    }
})

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
        unique: true,
        lowercase: true
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
    inviteRequests: {
        type: [InviteRequest]
    }
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