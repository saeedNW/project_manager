/** import team model */
const {teamModel} = require("../../models/team");
/** import error sender function */
const {throwNewError} = require("../../modules/functions");
/** import auto-bind module */
const autoBind = require("auto-bind");
/** import user model */
const {userModel} = require("../../models/user");

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
    async inviteUserToTeam(req, res, next) {
        /** get chosen user's username and team id from request */
        const {username, id: teamId} = req.params;
        /** get user _id as team owner */
        const owner = req.user._id;
        /** get user's username as inviterName */
        const {username: inviterName} = req.user;

        try {
            /** get team data from database */
            await this.findTeams("_id", teamId, false, owner);

            /** get user data from database */
            const invitedUser = await userModel.findOne({username});

            /** return error if user was not found */
            if (!invitedUser)
                throwNewError("کاربری با این اطلاعات پیدا نشد", 404);

            /** check if user already has been added to the team */
            const findUserInTeam = await teamModel.findOne({
                $or: [
                    {owner: invitedUser._id},
                    {users: invitedUser._id},
                ],
                _id: teamId
            });

            /** return error if user already has been added to the team */
            if (findUserInTeam)
                throwNewError("کاربر قبلا به این تیم افزوده شده است", 400);

            /**
             * define invitation data
             * @type {{caller, teamId: *, requestDate: Date, status: string}}
             */
            const invitationData = {
                caller: inviterName,
                requestDate: new Date(),
                teamId,
                status: "pending",
            };

            /** loop over user invitations */
            for (const invitation of invitedUser.inviteRequests)
                /** check if invitation already has been sent to user */
                if (invitation.teamId.toString() === invitationData.teamId.toString())
                    /** return error if there is an invitation to this team in user's invitations */
                    throwNewError("کاربر قبلا به این تیم دعوت شده است", 400);

            /** add invitation to user's data */
            const updatedUser = await userModel.updateOne({username}, {
                $push: {
                    inviteRequests: invitationData
                },
            });

            /** throw error if update wasn't successful */
            if (updatedUser.modifiedCount <= 0)
                throwNewError("ارسال دعوت نامه با شکست مواجه شد، لطفا مجددا تلاش نمایید", 400);

            /** send success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "ثبت درخواست با موفقیت انجام شد",
            });
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
    async updateTeam(req, res, next) {
        /** get user _id as team owner */
        const owner = req.user._id;
        /** get team id from request */
        const {id: teamId} = req.params;
        /** extract data from request  body */
        const data = {...req.body};
        /**
         * define an array of the name of the fields that user can edit
         * @type {string[]}
         */
        const fields = ["title", "description"];
        /**
         * define an array of the invalid values
         * @type {(string|number|number)[]}
         */
        const invalidValues = ["", " ", null, undefined, 0, -1, NaN]

        try {
            /** check team existence */
            await this.findTeams("_id", teamId, false, owner);

            /** loop over data entries */
            Object.entries(data).forEach(([key, value]) => {
                /** remove entry from data if user is not allow to edit it */
                if (!fields.includes(key)) delete data[key];

                /** remove entry from data if it has a bad value */
                if (invalidValues.includes(value)) delete data[key];
            });

            /** update team data */
            const updateTeam = await teamModel.updateOne({_id: teamId}, {$set: {...data}});

            /** throw error if update wasn't successful */
            if (updateTeam.modifiedCount <= 0)
                throwNewError("بروزرسانی انجام نشد", 500);

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "اطلاعات با موفقیت بروزرسانی شد",
            });
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
            const teams = await teamModel.aggregate([
                {
                    $match: {
                        $or: [{owner: userId}, {users: userId}]
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner"
                    }
                },
                {
                    $project: {
                        "owner.roles": 0,
                        "owner.password": 0,
                        "owner.token": 0,
                        "owner.teams": 0,
                        "owner.skills": 0,
                        "owner.inviteRequests": 0,
                        "owner.createdAt": 0,
                        "owner.updatedAt": 0,
                        "owner.team": 0,
                        "owner.__v": 0,
                    }
                },
                {
                    $unwind: "$owner"
                }
            ]);

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