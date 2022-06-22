import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import svgSprite from "gulp-svg-sprite";
import { path } from "../config/path.js";

const { src, dest } = gulp;


const svg = () => {
  return src(path.svg.src)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "SVG",
        message: error
      }))
    }))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }
    ))
    .pipe(dest(path.svg.dest));
};

export { svg };
