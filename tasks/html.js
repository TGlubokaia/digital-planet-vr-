import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import htmlmin from "gulp-htmlmin";
import webpHtml from "gulp-webp-html";
import size from "gulp-size";
import { path } from "../config/path.js";
import { app } from "../config/app.js";

const { src, dest } = gulp;


const html = () => {
  return src(path.html.src)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "HTML",
        message: error.message
      }))
    }))
    .pipe(webpHtml())
    .pipe(size({title: "До сжатия"}))
    .pipe(htmlmin(app.htmlmin))
    .pipe(size({title: "После сжатия"}))
    .pipe(dest(path.html.dest));
};

export { html };
