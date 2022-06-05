import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import newer from "gulp-newer";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import { path } from "../config/path.js";
import { app } from "../config/app.js";

const { src, dest } = gulp;


const font = () => {
    return src(path.font.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "FONT",
                message: error.message
              }))
        }))
        .pipe(newer(path.font.dest))
        .pipe(fonter(app.fonter))
        .pipe(dest(path.font.dest))
        .pipe(ttf2woff2())
        .pipe(dest(path.font.dest));
};

export { font };
