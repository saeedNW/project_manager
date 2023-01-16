/** import helper functions */
const {
    hashString,
    checkUserExistence,
    fixNumbers,
    throwNewError
} = require("../../modules/functions");
/** import user model */
const {userModel} = require("../../models/user");
/** import team model */
const {teamModel} = require("../../models/team");

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
    async updateProfileImage(req, res, next) {
        /** get user data from request */
        const user = req.user;

        try {
            /** throw error if file didn't found */
            if (Object.keys(req.file).length <= 0)
                throwNewError("شما باید یک فابل به جهت آپلود انتخاب کنید", 422);

            /**
             * get file path
             */
            const filePath = req.protocol + "://" + req.get("host") + "/" + req.file?.path.replaceAll("\\", "/").substring(7);

            /** update user profile pic */
            const updateUser = await userModel.updateOne({_id: user._id}, {
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
     * get user's teams' invitations
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    getUserInvitations(req, res, next) {
        /** get user from request */
        const user = req.user;

        try {
            /** get user invitations from user data */
            const invitations = user.inviteRequests;

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست شما با موفقیت انجام شد",
                data: {invitations}
            });
        } catch (err) {
            next(err)
        }
    }

    /**
     * get user's teams' invitations by status
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    async getUserInvitationsByStatus(req, res, next) {
        /** get user id from request */
        const userId = req.user._id;
        /** get status from request */
        const status = req.params.status.toLowerCase();

        try {
            /** get user invitations by status from database */
            let invitations = await userModel.aggregate([
                {
                    /**
                     * match option
                     * search for a user that has the same _id as "userId"
                     */
                    $match: {
                        _id: userId
                    }
                },
                {
                    /**
                     * project option
                     */
                    $project: {
                        /** remove user "_id" field */
                        _id: 0,
                        /** get user "inviteRequests" field */
                        inviteRequests: 1,
                        /** create new field with tha name of invitations */
                        invitations: {
                            /** filter "inviteRequests" field data and store them in "invitations" */
                            $filter: {
                                /** define filter input (the field that you want to filter its data) */
                                input: "$inviteRequests",
                                /** set a variable name for filter output */
                                as: "invitation",
                                /** define a condition for filter */
                                cond: {
                                    /** get data that has status equal to "status" */
                                    $eq: ["$$invitation.status", status]
                                }
                            }
                        }
                    }
                }
            ]);

            /** change invitation result structure */
            invitations = invitations?.[0]?.invitations || [];

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست شما با موفقیت انجام شد",
                data: {invitations}
            });
        } catch (err) {
            next(err)
        }
    }

    /**
     * update team invitation status
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    async updateInvitationStatus(req, res, next) {
        /** get data from request params */
        const {id: invitationId, status} = req.params;
        /** get user id from request */
        const userId = req.user;

        try {
            /** return error if status has an invalid value */
            if (!["accepted", "rejected"].includes(status.toLowerCase()))
                throwNewError("اطلاعات ارسالی صحیح نمی باشند", 400);

            /** get user whom invitation belongs to */
            const invitedUser = await userModel.findOne({"inviteRequests._id": invitationId, _id: userId});

            /** return error if user was not found */
            if (!invitedUser)
                throwNewError("درخواستی با این مشخصات پیدا نشد", 404);

            /** extract invitation from user data */
            const findRequest = invitedUser.inviteRequests.find(item => item.id.toString() === invitationId.toString());

            /** return error if invitation was already accepted or rejected */
            if (findRequest.status.toLowerCase() !== "pending")
                throwNewError("دعوتنامه مورد نظر قبلا پردازش شده است", 400);

            /** update user invitation */
            const updatedInvitation = await userModel.updateOne({"inviteRequests._id": invitationId}, {
                $set: {"inviteRequests.$.status": status.toLowerCase()}
            });

            /** return error if invitation update was not successful */
            if (updatedInvitation.modifiedCount === 0)
                throwNewError("درخواست با مشکل مواجه شد لطفا مجددا تلاش نمایید", 400);

            /** proceed with adding suer to team data if user has accepted the invitation */
            if (status.toLowerCase() === "accepted") {
                /** add user to team users */
                const updatedTeam = await teamModel.updateOne({_id: findRequest.teamId}, {
                    $push: {
                        users: userId
                    }
                });

                /** proceed if team update was not successful */
                if (updatedTeam.modifiedCount === 0) {
                    /** revert user invitation status to pending */
                    await userModel.updateOne({"inviteRequests._id": invitationId}, {
                        $set: {"inviteRequests.$.status": "pending"}
                    });

                    /** return error if team update was not successful */
                    throwNewError("درخواست با مشکل مواجه شد لطفا مجددا تلاش نمایید", 400);
                }
            }

            /** return success message */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست با موفقیت به انجام رسید "
            });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {
    UserController: new UserController()
}