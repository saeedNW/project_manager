/** import express validator body method */
const {body} = require("express-validator");

/**
 * project creation validation
 * @returns {ValidationChain[]}
 */
function createProjectValidator() {
    return [
        /**
         * title validation
         */
        body("title")
            /**
             * make it required
             */
            .notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        /**
         * tags validation
         */
        body("tags")
            /**
             * it should be an array with minimum of 0
             * and maximum of 10 elements
             */
            .isArray({min: 0, max: 10}).withMessage("حداکثر استفاده از هشتگ ها 10 عدد میباشد"),
        /**
         * description validation
         */
        body("description")
            /**
             * make it required and set a minimum of 10 characters
             */
            .notEmpty().isLength({min: 20}).withMessage(" توضیحات پروژه نمیتواند خالی باشد و حداقل باید 25 کاراکتر باشد"),
    ]
}

module.exports = {
    createProjectValidator
}