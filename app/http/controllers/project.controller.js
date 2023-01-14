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
    createProject(req, res, next) {
        /** extract data from request body */
        const {title, description, privateStatus} = req.body;

        try {
            res.json(req.body);
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