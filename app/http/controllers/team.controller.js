/** import team model */
const {teamModel} = require("../../models/team");
/** import error sender function */
const {throwNewError} = require("../../modules/functions");
/** import auto-bind module */
const autoBind = require("auto-bind");

/**
 * team class controller
 * @class TeamController
 */
class TeamController {
    /**
     * TeamController class constructor
     */
    constructor() {
        /**
         * use auto-bind module to bind "this"
         * to the TeamController class
         */
        autoBind(this);
    }

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
            /** add team owner in team users' */
            const users = [owner]

            /** create team */
            const team = await teamModel.create({...req.body, owner, users});

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
    async removeTeam(req, res, next) {
        /** get user _id as team owner */
        const owner = req.user._id;
        /** get team id from request */
        const {id: teamId} = req.params;

        try {
            /** get team data */
            await this.findTeams("_id", teamId, false, owner);

            /** remove team */
            const removedTeam = await teamModel.deleteOne({_id: teamId});

            /** return error if project didn't removed */
            if (removedTeam.deleteCount <= 0)
                throwNewError("درخواست ناموفق، لطفا مجددا تلاش نمایید", 500);

            /** todo@ send notify to team's users */

            /** todo@ remove team from projects */

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست شما با موفقیت به اتمام رسید",
                data: {removedTeam}
            });
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
    async getTeamById(req, res, next) {
        /** get user _id as project owner */
        const owner = req.user._id;
        /** get project id from request */
        const {id: teamId} = req.params;

        try {
            /** get team data */
            const team = await this.findTeams("_id", teamId, false, owner);

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست شما با موفقیت به اتمام رسید",
                data: {team}
            });
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
    async getTeamsByUser(req, res, next) {
        /** get user id from request */
        const userId = req.user._id;

        try {
            /** get user teams */
            const teams = await this.findTeams("$or", [
                {owner: userId},
                {users: userId},
            ], true);

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست شما با موفقیت به اتمام رسید",
                data: {teams}
            });
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

    /**
     * find and return team data based on given search options
     * @param {string} mainSearchFiledName the name of the main filed that you want to search based on. like "_id" or "user"
     * @param {string|object} mainSearchFiledValue the value of the main filed that you want to search based on.
     * @param {boolean} multiplyTeams checking whether to return multiple teams or just one team
     * @param {string|null} owner team owner ObjectId
     * @returns {Promise<*>}
     */
    async findTeams(mainSearchFiledName, mainSearchFiledValue, multiplyTeams = false, owner = null) {
        /** define search query */
        const query = {
            [mainSearchFiledName]: mainSearchFiledValue
        };

        /** add owner option to search query if it wasn't null */
        if (owner)
            query["owner"] = owner;

        /** get team from database */
        const team = !multiplyTeams ? await teamModel.findOne({...query}) : await teamModel.find({...query});

        /** return error if team was not found */
        if (!team)
            throwNewError("تیمی با این مشخصات یافت نشد", 404);

        /** return team data */
        return team;
    }
}

/** export class controller */
module.exports = {
    TeamController: new TeamController()
}