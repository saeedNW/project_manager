/** import express validator body method */
const {body} = require("express-validator");
/** import team model */
const {teamModel} = require("../../models/team");

function createTeamValidation() {
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
         * description validation
         */
        body("description")
            /**
             * make it required and set a minimum of 10 characters
             */
            .notEmpty().withMessage(" توضیحات پروژه نمیتواند خالی باشد"),
        /**
         * team unique id validation
         */
        body("team_id")
            /**
             * check team id validation and unique status
             */
            .custom(async (team_id) => {
                /**
                 * define valid team id regex
                 * @type {RegExp}
                 */
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim;

                /** return error if user input was an invalid team id */
                if (!usernameRegex.test(team_id))
                    throw "شناسه تیم را به طور صحیح وارد کنید";

                /** check if there is already a team with this team id */
                const team = await teamModel.findOne({team_id});

                /** return error if there is a team with this id */
                if (team) throw "شناسه قبلا توسط تیم دیگری استفاده شده است";

                return true;
            })
    ]
}

module.exports = {
    createTeamValidation
}