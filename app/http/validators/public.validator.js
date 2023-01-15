/** import express validator param method */
const {param} = require("express-validator")

/**
 * mongodb ObjectId validation
 * @returns {ValidationChain[]}
 */
function mongoIDValidator() {
    return [
        /**
         * id validation
         */
        param("id")
            /**
             * check if it's a valid mongodb Object id
             */
            .isMongoId().withMessage("شناسه ی ارسال شده صحیح نمیباشد")
    ]
}

module.exports = {
    mongoIDValidator
}