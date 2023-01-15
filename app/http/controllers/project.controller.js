/** import project model */
const {projectModel} = require("../../models/project");
/** import helper function */
const {throwNewError} = require("../../modules/functions");

/**
 * project class controller
 * @class ProjectController
 */
class ProjectController {
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
    updateProject(req, res, next) {
        try {

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
    removeProject(req, res, next) {
        try {

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
     * @param {string|null} owner
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
            throwNewError("پروژه ای با این شنایه یافت نشد", 404);

        /** return project data */
        return project;
    }
}

/** export class controller */
module.exports = {
    ProjectController: new ProjectController()
}