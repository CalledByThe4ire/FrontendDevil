"use strict";

const gulp = require("gulp"),
  gulpIf = require("gulp-if"),
  newer = require("gulp-newer"),
  imagemin = require("gulp-imagemin"),
  pngquant = require("imagemin-pngquant");

const env= !process.env.NODE_ENV || process.env.NODE_ENV === "development";



module.exports = function(options) {
  return function() {
    return gulp.src(options.src,  {since: gulp.lastRun("image:build")} )
      .pipe(newer(options.dst))
      .pipe( gulpIf( !env,
        imagemin({
          optimizationLevel: 3,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()],
          interlaced: true
        }) )
      )
      .pipe(gulp.dest(options.dst));
  };
};
