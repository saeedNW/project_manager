/** import bcrypt module */
const bcrypt = require('bcryptjs');
/** import mongoose module */
const {default: mongoose} = require("mongoose");
/** import user model */
const {userModel} = require("../models/user");
/** import JsonWebToken module */
const jwt = require("jsonwebtoken");

/**
 * hash a string
 * @param {string} str the string that we plan to hash
 * @returns {*}
 */
function hashString(str) {
    /**
     * create bcrypt salt
     */
    const bcryptSalt = bcrypt.genSaltSync(10);

    /**
     * return hashed string
     */
    return bcrypt.hashSync(str, bcryptSalt);
}

/**
 * check database for user existence.
 * return true if user exists and false if it's not
 * @param {string} searchOption search option, it can be username, email and phone
 * @returns {Promise<boolean>}
 */
async function checkUserExistence(searchOption) {
    /**
     * define search query
     * @type {{}}
     */
    const query = {};

    /**
     * user search query
     * @type {[*]}
     */
    query["$or"] = [
        {username: searchOption},
        {phone: searchOption},
        {email: searchOption},
    ]

    /** add _id to search query is search option was a valid mongodb ObjectId */
    if (mongoose.Types.ObjectId.isValid(searchOption))
        query["$or"].push({_id: searchOption});

    /**
     * check database for user existence
     */
    return userModel.findOne({...query});
}

/**
 * convert Persian and Arabic numbers to English numbers
 * @param num the number that should be fixed
 * @return {string|string}
 */
function fixNumbers(num) {
    let
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    if (typeof num === 'string') {
        for (let i = 0; i < 10; i++) {
            num = num.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }

    return num
}

/**
 * create and throw errors
 * @param {string} message error message
 * @param {number} status error status
 */
function throwNewError(message, status = 500) {
    const error = new Error(message);
    error.status = status
    throw error
}

/**
 * create json web token based on given payload
 * @param {Object} payload data that you want to use in json web token
 * @returns {*}
 * @constructor
 */
function jwtTokenGenerator(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "365 days"});
}

/**
 * verify json web token
 * @param {string} token json web token
 * @param {string} verificationField the field that should exist in token
 * @param {string} errorMessage invalid token error message
 * @param {number} errorStatus invalid token error status code
 * @returns {*}
 */
function jwtTokenVerification(token, verificationField, errorMessage, errorStatus) {
    try {
        /**
         * verify jwt token
         * @type {*}
         */
        const verificationResult = jwt.verify(token, process.env.JWT_SECRET_KEY);

        /** return error if username wasn't define in token */
        if (!verificationResult?.[verificationField])
            throwNewError(errorMessage, errorStatus);

        /** return verification result */
        return verificationResult;
    } catch (err) {
        throwNewError(errorMessage, errorStatus);
    }
}

module.exports = {
    hashString,
    checkUserExistence,
    fixNumbers,
    throwNewError,
    jwtTokenGenerator,
    jwtTokenVerification
}