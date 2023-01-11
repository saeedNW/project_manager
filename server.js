/** initialize dotenv module */
require('dotenv').config();

/** import application main class */
const Application = require("./app/app");

/** create application class instance */
new Application(3000, "mongodb://127.0.0.1:27017/project_management");