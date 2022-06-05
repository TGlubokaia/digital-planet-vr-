import gulp from "gulp";
import plumber from "gulp-plumber";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import webpCss from "gulp-webp-css";
import notify from "gulp-notify";
import sassGlob from "gulp-sass-glob";
import { path } from "../config/path.js";
import { app } from "../config/app.js";

const { src, dest } = gulp;
const sass = gulpSass(dartSass);


const scss = () => {
  return src(path.scss.src, { sourcemaps: app.isDev })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "SCSS",
        message: error.message
      }))
    }))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(groupCssMediaQueries())
    .pipe(dest(path.scss.dest), { sourcemaps: app.isDev })
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(dest(path.scss.dest), { sourcemaps: app.isDev });
};

export { scss };
