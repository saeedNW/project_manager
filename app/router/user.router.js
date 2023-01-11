/**
 * import express router
 * define user router
 */
const userRouter = require("express").Router();
/** import user login checker middleware */
const {checkLogin} = require("../http/middlewares/check.login");
/** import user controller */
const {UserController} = require("../http/controllers/user.controller");

/** define user profile router */
userRouter.get("/profile", checkLogin, UserController.getUserProfile);

/** export user router */
module.exports = {
    userRouter
}