/** import user model */
const {userModel} = require("../../models/user");
/** import bcryptjs module */
const bcrypt = require("bcryptjs");
/** import helper functions */
const {hashString, checkUserExistence, fixNumbers, throwNewError, tokenGenerator} = require("../../modules/functions");

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
    async register(req, res, next) {
        /** extract data from request */
        let {username, email, phone, password} = req.body;

        try {
            /** hash user password */
            password = hashString(password);
            /** change user email to lower case */
            email = email.toLowerCase();
            /** fix phone number persian or  arabic numbers */
            phone = fixNumbers(phone);

            /**
             * check user email existence.
             * return error if email exists
             */
            if (await checkUserExistence(email))
                throwNewError("کاربری با این آدرس ایمیل از پیش وجود دارد", 400);

            /**
             * check user phone existence.
             * return error if phone exists
             */
            if (await checkUserExistence(phone))
                throwNewError("کاربری با این شماره تماس از پیش وجود دارد", 400);

            /**
             * check user username existence.
             * return error if username exists
             */
            if (await checkUserExistence(username))
                throwNewError("کاربری با این نام کاربری از پیش وجود دارد", 400);

            /** create user */
            const user = await userModel.create({username, email, phone, password});

            /** return success response */
            return res.status(201).json({
                status: 201,
                success: true,
                message: "کاربر با موفقیت ایجاد شد",
                data: user
            })
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
    async login(req, res, next) {
        /** extract data from request */
        const {username, password} = req.body;

        try {
            /** get user data from database */
            const user = await userModel.findOne({username});

            /** return error if user was not found */
            if (!user)
                throwNewError("کاربری با این اطلاعات وجود ندارد", 401);

            /** compare user password with given password */
            const comparePassword = bcrypt.compareSync(password, user.password);

            /** return error if password was incorrect */
            if (!comparePassword)
                throwNewError("کاربری با این اطلاعات وجود ندارد", 401);

            /** create user json web token */
            const token = tokenGenerator({username});

            /** save token in user data */
            user.token = token;
            /** update user data in database */
            await user.save();

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "شما با موفقیت وارد حساب خود شدید",
                token
            })
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