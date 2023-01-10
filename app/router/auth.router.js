/**
 * import express router
 * define auth router
 */
const authRouter = require("express").Router();
/** import auth controller */
const {AuthController} = require("../http/controllers/auth.controller");
/** import validators */
const {registerValidator} = require("../http/validators/auth.validator");
/** import express validator mapper middleware */
const {expressValidatorMapper} = require("../http/middlewares/express.validator.mapper");

/** define register router */
authRouter.post("/register", registerValidator(), expressValidatorMapper, AuthController.register)

/** export auth router */
module.exports = {
    authRouter
}