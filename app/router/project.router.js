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

/** define project creation router */
projectRouter.post("/create", createProjectValidator, expressValidatorMapper, ProjectController.createProject);

/** export project router */
module.exports = {
    projectRouter
}