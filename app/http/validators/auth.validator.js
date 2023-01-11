/** import express validator body method */
const {body} = require("express-validator");

/**
 * register validation
 * @returns {ValidationChain[]}
 */
function registerValidator() {
    return [
        /**
         * username validation
         */
        body("username")
            /**
             * custom validator
             */
            .custom((value, ctx) => {
                /** return error if value is undefined */
                if (!value)
                    throw "نام کاربری معتبر نمی باشد";

                /**
                 * define valid username regex
                 * @type {RegExp}
                 */
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi

                /** return error if username is not valid */
                if (!usernameRegex.test(value))
                    throw "نام کاربری معتبر نمی باشد";

                /** return true if username was valid */
                return true;
            }),
        /**
         * email validation
         */
        body("email")
            /**
             * check if it's a valid email
             */
            .isEmail().withMessage("ایمیل وارد شده صحیح نمی باشد"),
        /**
         * phone validation
         */
        body("phone")
            /**
             * check if it's a valid Iran phone number
             */
            .isMobilePhone("fa-IR").withMessage("شماره تماس وارد شده معتبر نمی باشد"),
        /**
         * password validation
         */
        body("password")
            /**
             * check password length
             */
            .isLength({min: 6}).withMessage("رمز عبور باید حداقل 6 کاراکتر باشد")
            /**
             * check if password and confirm password are equal
             */
            .custom((value, ctx) => {
                /** return error if value is undefined */
                if (!value)
                    throw "رمز عبور نمی تواند خالی باشد";

                /** check if password and confirm password are equal */
                if (value !== ctx?.req?.body?.confirmPassword)
                    throw "عدم تطابق رمز عبور و تکرار آن";

                return true;
            })
    ]
}

/**
 * login validation
 * @returns {ValidationChain[]}
 */
function loginValidator() {
    return [
        /**
         * username validation
         */
        body("username")
            .notEmpty().withMessage("نام کاربری نباید خالی باشد"),
        /**
         * password validation
         */
        body("password")
            /**
             * check password length
             */
            .isLength({min: 6}).withMessage("رمز عبور باید حداقل 6 کاراکتر باشد")
    ]
}

module.exports = {
    registerValidator,
    loginValidator
}