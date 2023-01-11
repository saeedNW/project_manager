/**
 * user class controller
 * @class UserController
 */
class UserController {
    /**
     * get user profile
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    getUserProfile(req, res, next) {
        /** get user data from request */
        const user = req.user;

        try {
            /** return user data */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست شما با موفقیت به انجام رسید",
                data: {user}
            })
        } catch (err) {
            next(err)
        }
    }

    /**
     * update user profile
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    editUserProfile(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * user add skill
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    addSkill(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * user edit skills
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    editSkills(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * accept team invitation
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    acceptTeamInvitation(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * reject team invitation
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    rejectTeamInvitation(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }
}

module.exports = {
    UserController: new UserController()
}