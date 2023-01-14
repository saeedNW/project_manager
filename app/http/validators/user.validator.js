/** import express validator body method */
const {body} = require("express-validator");
/** import path module */
const path = require("path");

/**
 * image validation
 * @returns {ValidationChain[]}
 */
function imageValidator() {
    return [
        /**
         * image validation
         */
        body("image")
            .custom((value, {req}) => {
                /** return error if image was not uploaded */
                if (Object.keys(req.file).length == 0) throw "لطفا یک تصویر را انتخاب کنید";

                /** get image type */
                const ext = path.extname(req.file.originalname);

                /** define acceptable image types */
                const acceptableTypes = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

                /** return error if image type was not an acceptable type */
                if (!acceptableTypes.includes(ext)) throw "فرمت ارسال شده صحیح نمیباشد";

                /** define image maximum acceptable size */
                const maxSize = 2 * 1024 * 1024;

                /** return error if image size was more than acceptable size */
                if (req.file.size > maxSize) throw "حجم فایل نمیتواند بیبشتر از 2 مگابایت باشد";


                return true
            })
    ]
}

module.exports = {
    imageValidator
}