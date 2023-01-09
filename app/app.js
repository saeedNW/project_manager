/**
 * application main class
 */
module.exports = class Application {
    /**
     * import express module
     * @type {e | (() => Express)}
     */
    #express = require("express");
    /**
     * create app instance
     * @type {*|Express}
     */
    #app = this.#express();

    /**
     * configuration class constructor
     * @param {number} PORT application port number
     * @param {string} DB_URL application database connection string
     */
    constructor(PORT, DB_URL) {
        /** initialize database configuration method */
        this.databaseConfig(DB_URL);
        /** initialize application configuration method */
        this.configApplication();
        /** initialize server creation method */
        this.createServer(PORT);
        /** initialize route creation method */
        this.createRoutes();
        /** initialize error handler */
        this.errorHandler();
    }

    /**
     * application configuration method
     */
    configApplication() {
        /** import path module */
        const path = require("path");

        /** initialize express json body parser */
        this.#app.use(this.#express.json());
        /** initialize express urlencoded body parser */
        this.#app.use(this.#express.urlencoded({extended: true}));
        /** initialize express statics */
        this.#app.use(this.#express.static(path.resolve("./public")));
    }

    /**
     * application server creator
     * @param {number} PORT application port number
     */
    createServer(PORT) {
        /** import http module */
        const http = require("http");
        /** create http server */
        const server = http.createServer(this.#app);
        /** run server */
        server.listen(PORT, () => {
            console.log(`running > http://localhost:${PORT}`, `time: ${new Date()}`);
        })
    }

    /**
     * application database configuration
     * @param {string} DB_URL application database connection string
     */
    databaseConfig(DB_URL) {
        /** import mongoose module */
        const {default: mongoose} = require('mongoose');

        /** create database connection */
        mongoose.connect(DB_URL, (err) => {
            /** throw error if there was any */
            if (err) throw err;

            console.log("database connected successfully");
        })
    }

    /**
     * application error handler
     */
    errorHandler() {
        /**
         * 404 page not found error handler
         */
        this.#app.use((req, res, next) => {
            /** return 404 error */
            return res.status(404).json({
                status: 404,
                success: false,
                message: "آدرس مورد نظر شما یافت نشد"
            });
        });

        /**
         * system error handler
         */
        this.#app.use((error, req, res, next) => {
            /**
             * define error status
             * @type {*|number}
             */
            const status = error?.status || 500;
            /**
             * define error message
             * @type {*|string}
             */
            const message = error?.message || "Internal server error";

            /** return error */
            return res.status(status).json({
                status,
                success: false,
                message,
            });
        });
    }

    /**
     * application route manager
     */
    createRoutes() {
        /** define a sample route */
        this.#app.get("/", (req, res, next) => {
            return res.json({
                message: "this is your new web application with node and express"
            });
        });

        /** import system main router */
        const {mainRouter} = require("./router/router");
        /** initialize system main router */
        this.#app.use(mainRouter);
    }
}