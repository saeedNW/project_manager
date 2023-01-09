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
    createTeam(req, res, next) {
        try {

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
}

/** export class controller */
module.exports = {
    TeamController: new TeamController()
}