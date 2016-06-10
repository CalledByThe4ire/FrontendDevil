"use strict";

const gulp = require("gulp"),
  gulpIf = require("gulp-if"),
  notify = require("gulp-notify"),
  rename = require("gulp-rename"),
  rigger = require("gulp-rigger"),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps"),
  combiner = require("stream-combiner2").obj;

const env= !process.env.NODE_ENV || process.env.NODE_ENV === "development";



module.exports = function(options) {
  return function() {
    return combiner(
      gulp.src(options.src),
      gulpIf( env, sourcemaps.init()),
      rigger(),
      gulpIf( !env, combiner( uglify(), rename("main.min.js") ) ),
      gulpIf( env, sourcemaps.write() ),
      gulp.dest(options.dst)
    ).on("error", notify.onError(
      function(err) {
        return {
          title: "Javascript",
          message: err.message
        };
      }
    ));
  };
};
