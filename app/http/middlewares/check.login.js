/** import helper functions */
const {throwNewError, jwtTokenVerification} = require("../../modules/functions");
/** import user model */
const {userModel} = require("../../models/user");

/**
 * check if user is logged in
 * @param req express request
 * @param res express response
 * @param next express next function
 * @returns {Promise<void>}
 */
const checkLogin = async (req, res, next) => {
    try {
        /**
         * get authorization token from request headers
         * @type {string | boolean | undefined}
         */
        const authorization = req?.headers?.authorization;

        /** return error if authorization was not defined */
        if (!authorization)
            throwNewError("لطفا وارد حساب کاربری خود شوید", 401);

        /**
         * split authorization to get jwt.
         * authorization is a Bearer token, so in order to
         * get the JWT we need to split it.
         * Bearer token => [Bearer, token]
         * @type {string}
         */
        const token = authorization.split(" ")?.[1];

        /** return error if token was not defined */
        if (!token)
            throwNewError("لطفا وارد حساب کاربری خود شوید", 401);

        /**
         * verify token
         * @type {*}
         */
        const tokenVerification = jwtTokenVerification(token, "username", "لطفا وارد حساب کاربری خود شوید", 401);

        /**
         * extract username from verified token
         */
        const {username} = tokenVerification;

        /** get user data from database */
        const user = await userModel.findOne({username}, {password: 0});

        /** return error if user was not found */
        if (!user)
            throwNewError("لطفا وارد حساب کاربری خود شوید", 401);

        /** save user in request */
        req.user = user;

        next();
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkLogin
}