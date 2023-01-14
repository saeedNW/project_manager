/** import helper functions */
const {
    hashString,
    checkUserExistence,
    fixNumbers,
    throwNewError
} = require("../../modules/functions");
/** import user model */
const {userModel} = require("../../models/user");

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
    async editUserProfile(req, res, next) {
        /** extract data from request */
        const data = req.body;
        /** extract user from request */
        const user = req.user;
        /**
         * define an array of the name of the fields that user can edit
         * @type {string[]}
         */
        const fields = ["first_name", "last_name", "phone", "email", "password"];
        /**
         * define an array of the invalid values
         * @type {(string|number|number)[]}
         */
        const invalidValues = ["", " ", null, undefined, 0, -1, NaN]

        try {
            /** loop over data entries */
            Object.entries(data).forEach(([key, value]) => {
                /** remove entry from data if user is not allow to edit it */
                if (!fields.includes(key)) delete data[key];

                /** remove entry from data if it has a bad value */
                if (invalidValues.includes(value)) delete data[key];
            });

            /** hash user password */
            data.password = hashString(data.password);
            /** change user email to lower case */
            data.email = data.email.toLowerCase();
            /** fix phone number persian or  arabic numbers */
            data.phone = fixNumbers(data.phone);

            /**
             * check user email existence.
             * return error if email exists
             */
            if (await checkUserExistence(data.email))
                throwNewError("کاربری با این آدرس ایمیل از پیش وجود دارد", 400);

            /**
             * check user phone existence.
             * return error if phone exists
             */
            if (await checkUserExistence(data.phone))
                throwNewError("کاربری با این شماره تماس از پیش وجود دارد", 400);

            /** update user data */
            const updateUser = await userModel.updateOne({_id: user._id}, {$set: {...data}});

            /** throw error if update wasn't successful */
            if (updateUser.modifiedCount <= 0)
                throwNewError("بروزرسانی انجام نشد", 400);

            /** return success response */
            res.status(200).json({
                status: 200,
                success: true,
                message: "اطلاعات با موفقیت بروزرسانی شد",
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
    updateProfileImage(req, res, next) {
        /** get user data from request */
        const user = req.user;

        try {
            /** throw error if file didn't found */
            if (Object.keys(req.file).length <= 0)
                throwNewError("شما باید یک فابل به جهت آپلود انتخاب کنید", 422);

            /**
             * get file path
             */
            const filePath = req.file?.path.replaceAll("\\", "/").substring(7);

            /** update user profile pic */
            const updateUser = userModel.updateOne({_id: user._id}, {
                $set: {
                    profile_image: filePath
                }
            });

            /** throw error if update was unsuccessful */
            if (updateUser.modifiedCount <= 0)
                throwNewError("بروزرسانی انجام نشد", 400);

            res.status(200).json({
                status: 200,
                success: true,
                message: "بروزرسانی با موفقیت انجام شد",
                data: {image: filePath}
            });
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