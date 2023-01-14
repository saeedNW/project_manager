/** import multer module */
const multer = require("multer");
/** import path module */
const path = require("path");
/** import upload path creator function */
const {createUploadPath} = require("./functions");

/** multer storage configuration */
const storage = multer.diskStorage({
    /**
     * uploaded file destination
     * @param req express request
     * @param file uploaded file
     * @param cb callback
     */
    destination: (req, file, cb) => {
        cb(null, createUploadPath())
    },
    /**
     * uploaded file name creator
     * @param req express request
     * @param file uploaded file
     * @param cb callback
     */
    filename: (req, file, cb) => {
        /**
         * get file type
         * @type {string}
         */
        const type = path.extname(file?.originalname || "")
        cb(null, Date.now() + type)
    }
});

/** create multer uploader with defined storage configuration */
const upload_multer = multer({storage})

module.exports = {
    upload_multer
}