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
    getAllProjects(req, res, next) {
        try {

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
    getProjectById(req, res, next) {
        try {

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
}

/** export class controller */
module.exports = {
    ProjectController: new ProjectController()
}