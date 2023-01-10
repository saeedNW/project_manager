/** import express validator validationResult method */
const {validationResult} = require("express-validator");

/**
 * remap express validator errors and changes its structure
 */
function expressValidatorMapper(req, res, next) {
    /**
     * define a variable to restore validation errors
     * @type {{}}
     */
    const error = {};

    /** get validation result */
    const validation = validationResult(req);

    /** return error if there was any validation error */
    if (validation?.errors?.length > 0) {
        /** loop over errors */
        for (const err of validation?.errors) {
            /**
             * add error message to message variable
             */
            error[err.param] = err.msg;
        }

        /** return error messages */
        return res.status(422).json({
            status: 422,
            success: false,
            message: "validation error",
            error
        });
    }

    /** continue with process if there wasn't any validation error */
    next();
}

module.exports = {
    expressValidatorMapper
}