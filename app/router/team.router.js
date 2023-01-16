/**
 * import express router
 * define team router
 */
const teamRouter = require("express").Router();
/** import team controller */
const {TeamController} = require("../http/controllers/team.controller");
/** import user login checker middleware */
const {checkLogin} = require("../http/middlewares/check.login");
/** import team creation validation */
const {createTeamValidation} = require("../http/validators/team.validator");
/** import express error mapper middleware */
const {expressValidatorMapper} = require("../http/middlewares/express.validator.mapper");
/** import mongodb ObjectId validation */
const {mongoIDValidator} = require("../http/validators/public.validator");

/** define team creation router */
teamRouter.post("/create", checkLogin, createTeamValidation(), expressValidatorMapper, TeamController.createTeam);
/** define get all teams router */
teamRouter.get("/list-all", checkLogin, TeamController.getAllTeams);
/** define get single team by id router */
teamRouter.get("/single/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.getTeamById);
/** define get all teams router */
teamRouter.get("/user-teams", checkLogin, TeamController.getTeamsByUser);
/** define single team remove router */
teamRouter.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.removeTeam);
/** define team user invitation router */
teamRouter.get("/invite/:teamId/:username", checkLogin, TeamController.inviteUserToTeam)

/** export team router */
module.exports = {
    teamRouter
}