/**
 * import express router
 * define project router
 */
const projectRouter = require("express").Router();
/** import project controller */
const {ProjectController} = require("../http/controllers/project.controller");
/** import project creation validator */
const {createProjectValidator} = require("../http/validators/project.validator");
/** import express validator mapper */
const {expressValidatorMapper} = require("../http/middlewares/express.validator.mapper");
/** import user login checker middleware */
const {checkLogin} = require("../http/middlewares/check.login");
/** import image uploader */
const {uploadFile} = require("../modules/express.fileupload");
/** import express file upload module */
const expressFileUpload = require("express-fileupload");
/** import mongodb ObjectId validator */
const {mongoIDValidator} = require("../http/validators/public.validator");

/** define project creation router */
projectRouter.post("/create", expressFileUpload(), checkLogin, uploadFile, createProjectValidator(), expressValidatorMapper, ProjectController.createProject);
/** define get all projects' data router */
projectRouter.get("/all", checkLogin, ProjectController.getAllProjects);
/** define get single project's data router */
projectRouter.get("/single/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.getProjectById);
/** define remove single project router */
projectRouter.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject);
/** define edit project router */
projectRouter.patch("/edit/:id", checkLogin, mongoIDValidator(), createProjectValidator(), expressValidatorMapper, ProjectController.updateProject);

/** export project router */
module.exports = {
    projectRouter
}