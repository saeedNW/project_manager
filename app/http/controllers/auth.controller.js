/**
 * auth class controller
 * @class AuthController
 */
class AuthController {
    /**
     * register controller
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    register(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * login controller
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    login(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * reset password controller
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    resetPassword(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }
}

/** export class controller */
module.exports = {
    AuthController: new AuthController()
}