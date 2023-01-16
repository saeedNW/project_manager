/**
 * import express router
 * define user router
 */
const userRouter = require("express").Router();
/** import user login checker middleware */
const {checkLogin} = require("../http/middlewares/check.login");
/** import user controller */
const {UserController} = require("../http/controllers/user.controller");
/** import file uploader */
const {upload_multer} = require("../modules/multer");
/** import image validator */
const {imageValidator} = require("../http/validators/user.validator");
/** import express validator mapper middleware */
const {expressValidatorMapper} = require("../http/middlewares/express.validator.mapper");

/** define user profile router */
userRouter.get("/profile", checkLogin, UserController.getUserProfile);
/** define user profile update router */
userRouter.patch("/profile", checkLogin, UserController.editUserProfile);
/** define user profile image upload router */
userRouter.patch("/profile-image", checkLogin, upload_multer.single("image"), imageValidator(), expressValidatorMapper, UserController.updateProfileImage);
/** define user git invitations router */
userRouter.get("/invitations", checkLogin, UserController.getUserInvitations);
/** define user git invitations by status router */
userRouter.get("/invitations/:status", checkLogin, UserController.getUserInvitationsByStatus);

/** export user router */
module.exports = {
    userRouter
}