/**
 * import express router
 * define main router
 */
const mainRouter = require("express").Router();

/**
 * import and initialize auth router
 */
const {authRouter} = require("./auth.router");
mainRouter.use("/auth", authRouter);

/**
 * import and initialize project router
 */
const {projectRouter} = require("./project.router");
mainRouter.use("/project", projectRouter);

/**
 * import and initialize team router
 */
const {teamRouter} = require("./team.router");
mainRouter.use("/team", teamRouter);

/**
 * import and initialize user router
 */
const {userRouter} = require("./user.router");
mainRouter.use("/user", userRouter);

/** export main router */
module.exports = {
    mainRouter
}