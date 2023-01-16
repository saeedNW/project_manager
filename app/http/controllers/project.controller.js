/** import project model */
const {projectModel} = require("../../models/project");
/** import helper function */
const {throwNewError} = require("../../modules/functions");
/** import auto-bind module */
const autoBind = require("auto-bind");

/**
 * project class controller
 * @class ProjectController
 */
class ProjectController {
    /**
     * ProjectController class constructor
     */
    constructor() {
        /**
         * use auto-bind module to bind "this"
         * to the ProjectController class
         */
        autoBind(this);
    }

    /**
     * project creation controller
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    async createProject(req, res, next) {
        /** extract user data from request */
        const user = req.user;

        try {
            /** create project */
            const project = await projectModel.create({
                ...req.body,
                owner: user._id
            })

            /** return error if project creation wasn't successful */
            if (!project)
                throwNewError("ایجاد پروژه با مشکل مواجه شد، لطفا مجددا تلاش نمایید", 500);

            return res.status(201).json({
                status: 201,
                success: true,
                message: "پروژه با موفقیت ایجاد شد",
                data: {project}
            })
        } catch (err) {
            next(err)
        }
    }

    /**
     * get all projects
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    async getAllProjects(req, res, next) {
        try {
            /** get all projects from database */
            const projects = await projectModel.find({});

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست شما با موفقیت به اتمام رسید",
                data: {projects}
            });
        } catch (err) {
            next(err)
        }
    }

    /**
     * get a single project by id
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    async getProjectById(req, res, next) {
        /** get user _id as project owner */
        const owner = req.user._id;
        /** get project id from request */
        const {id: projectId} = req.params;

        try {
            /** get project data */
            const project = await this.findProject("_id", projectId, owner);

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست شما با موفقیت به اتمام رسید",
                data: {project}
            });
        } catch (err) {
            next(err)
        }
    }

    /**
     * get a single team projects
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    getProjectsByTeam(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * get a single user projects
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    getProjectsByUser(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * update a project info
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    async updateProject(req, res, next) {
        /** get user _id as project owner */
        const owner = req.user._id;
        /** get project id from request */
        const {id: projectId} = req.params;
        /** extract data from request */
        const data = req.body;
        /**
         * define an array of the name of the fields that user can edit
         * @type {string[]}
         */
        const fields = ["title", "description", "tags"];
        /**
         * define an array of the invalid values
         * @type {(string|number|number)[]}
         */
        const invalidValues = ["", " ", null, undefined, 0, -1, NaN]

        try {
            /** get project data */
            await this.findProject("_id", projectId, owner);

            /** loop over data entries */
            Object.entries(data).forEach(([key, value]) => {
                /** remove entry from data if user is not allow to edit it */
                if (!fields.includes(key)) delete data[key];

                /** remove entry from data if it has a bad value */
                if (invalidValues.includes(value)) delete data[key];

                /** proceed if key is equal too tags, and it is an array */
                if (key === "tags" && (data['tags'].constructor === Array)) {
                    /** filter tags value and only keeps valid values */
                    data["tags"] = data["tags"].filter(val => {
                        /** keep value if it's not included in invalid values */
                        if (!invalidValues.includes(val)) return val
                    })

                    /** removed tags if the length of array is 0 */
                    if (data['tags'].length === 0) delete data['tags']
                }
            });

            /** update project data */
            const updateProject = await projectModel.updateOne({_id: projectId}, {$set: {...data}});

            /** throw error if update wasn't successful */
            if (updateProject.modifiedCount <= 0)
                throwNewError("بروزرسانی انجام نشد", 400);

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "اطلاعات با موفقیت بروزرسانی شد",
            })
        } catch
            (err) {
            next(err)
        }
    }

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    async updateProjectImage(req, res, next) {
        /** get user _id as project owner */
        const owner = req.user._id;
        /** get project id from request */
        const {id: projectId} = req.params;
        /** get image from request body */
        const {image} = req.body;

        try {
            /** get project data */
            await this.findProject("_id", projectId, owner);

            /** update project */
            const updatedProject = await projectModel.updateOne({_id: projectId}, {
                $set: {
                    image
                }
            });

            /** throw error if update wasn't successful */
            if (updatedProject.modifiedCount <= 0)
                throwNewError("بروزرسانی انجام نشد", 400);

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "اطلاعات با موفقیت بروزرسانی شد",
            });
        } catch (err) {
            next(err)
        }
    }

    /**
     * remove project
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    async removeProject(req, res, next) {
        /** get user _id as project owner */
        const owner = req.user._id;
        /** get project id from request */
        const {id: projectId} = req.params;

        try {
            /** get project data */
            await this.findProject("_id", projectId, owner);

            /** remove project */
            const removedProject = await projectModel.deleteOne({_id: projectId});

            /** return error if project didn't removed */
            if (removedProject.deleteCount <= 0)
                throwNewError("درخواست ناموفق، لطفا مجددا تلاش نمایید", 500);

            /** todo@ send notify to project team's users */

            /** return success response */
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست شما با موفقیت به اتمام رسید",
                data: {removedProject}
            });
        } catch (err) {
            next(err)
        }
    }

    /**
     * toggle a single project privacy status
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    toggleProjectPrivacy(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    /**
     * find and return project data based on given search options
     * @param {string} mainSearchFiledName the name of the main filed that you want to search based on. like "_id" or "user"
     * @param {string} mainSearchFiledValue the value of the main filed that you want to search based on.
     * @param {string|null} owner project owner ObjectId
     * @returns {Promise<*>}
     */
    async findProject(mainSearchFiledName, mainSearchFiledValue, owner = null) {
        /** define search query */
        const query = {
            [mainSearchFiledName]: mainSearchFiledValue
        };

        /** add owner option to search query if it wasn't null */
        if (owner)
            query["owner"] = owner;

        /** get project from database */
        const project = await projectModel.findOne({...query});

        /** return error if project was not found */
        if (!project)
            throwNewError("پروژه ای با این مشخصات یافت نشد", 404);

        /** return project data */
        return project;
    }
}

/** export class controller */
module
    .exports = {
    ProjectController: new ProjectController()
}