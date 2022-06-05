import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import webp from "gulp-webp";
import gulpif from "gulp-if";
import { path } from "../config/path.js";
import { app } from "../config/app.js";

const { src, dest } = gulp;


const img = () => {
  return src(path.img.src)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "IMG",
        message: error.message
      }))
    }))
    .pipe(newer(path.img.dest))
    .pipe(webp())
    .pipe(dest(path.img.dest))
    .pipe(src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(gulpif(app.isProd, imagemin(app.imagemin)))
    .pipe(dest(path.img.dest));
};

export { img };
