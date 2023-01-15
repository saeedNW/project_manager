/** import team model */
const {teamModel} = require("../../models/team");
/** import error sender function */
const {throwNewError} = require("../../modules/functions");

/**
 * team class controller
 * @class TeamController
 */
class TeamController {
    /**
     * team creation controller
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    async createTeam(req, res, next) {
        /** get user _id as team owner */
        const owner = req.user._id;

        try {
            /** create team */
            const team = await teamModel.create({...req.body, owner});

            /** return error if team creation wasn't successful */
            if (!team)
                throwNewError('ایجاد تیم با شکست مواجه شد', 500);

            /** return success response */
            return res.status(201).json({
                status: 201,
                success: true,
                message: "تیم با موفقیت ایجاد شد",
                data: {team}
            })
        } catch (err) {
            next(err)
        }
    }

    /**
     * invite user to team / add user to team
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    inviteUserToTeam(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * remove user from team
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    removeUserFromTeam(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * update team info
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    updateTeam(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * remove team
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    removeTeam(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * get all teams
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    async getAllTeams(req, res, next) {
        try {
            /** get all teams data from database */
            const teams = await teamModel.find({});

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست شما با موفقیت به اتمام رسید",
                data: {teams}
            })
        } catch (err) {
            next(err)
        }
    }

    /**
     * get a single team by id
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    getTeamById(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * get a single user teams
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    getTeamsByUser(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * get a single project teams
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    getTeamsByProject(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }
}

/** export class controller */
module.exports = {
    TeamController: new TeamController()
}