/** import path module */
const path = require("path");
/** import upload path creator function */
const {createUploadPath, throwNewError} = require("./functions");

/**
 * express file uploader function
 * @param req express request
 * @param res express response
 * @param next express next method
 * @returns {Promise<void>}
 */
const uploadFile = async (req, res, next) => {
    try {
        /** return error if image was not uploaded */
        if (req.file || Object.keys(req.files).length <= 0)
            throwNewError("تصویر شاخص پروژه را ارسال نمایید", 400);

        /**
         * get image data from request files
         */
        let image = req.files.image;

        /**
         * get image type
         * @type {string}
         */
        let type = path.extname(image.name);

        /** return error if image type was not an acceptable type */
        if (![".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(type))
            throwNewError("فرمت ارسال شده ی تصویر صحیح نمیباشد", 400);

        /**
         * define image path
         * @type {string}
         */
        const image_path = path.join(createUploadPath(), (Date.now() + type));

        /**
         * save image path in request body
         * @type {string}
         */
        req.body.image = image_path.substring(7);

        /**
         * define image upload path (directory)
         * @type {string}
         */
        let uploadPath = path.join(__dirname, "..", "..", image_path);

        /** move image to upload directory */
        image.mv(uploadPath, (err) => {
            if (err)
                throwNewError("بارگذاری تصویر انجام نشد", 500);

            next();
        });
    } catch (error) {
        next(error)
    }
}


module.exports = {
    uploadFile
}