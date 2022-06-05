import gulp from "gulp";
import browserSync from "browser-sync";
import { html } from "./tasks/html.js";
import { scss } from "./tasks/scss.js";
import { img } from "./tasks/img.js";
import { font } from "./tasks/font.js";
import { clear } from "./tasks/clear.js";
import { app } from "./config/app.js";
import { path } from "./config/path.js";

const { watch, series, parallel } = gulp;

const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root
    }
  });
};

const watcher = () => {
  watch(path.html.watch, html).on('all', browserSync.reload);
  watch(path.scss.watch, scss).on('all', browserSync.reload);
  watch(path.img.watch, img).on('all', browserSync.reload);
  watch(path.font.watch, font).on('all', browserSync.reload);
};

const build = series(
  clear,
  parallel(html, scss, img, font)
);

const dev = series(
  build,
  parallel(watcher, server)
);

export { html, scss, img, font }

export default app.isProd
  ? build
  : dev;
