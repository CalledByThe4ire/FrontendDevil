"use strict";

const gulp = require("gulp"),
  browserify = require("browserify"),
  source = require("vinyl-source-stream"),
  buffer = require("vinyl-buffer"),
  gulpIf = require("gulp-if"),
  notify = require("gulp-notify"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps"),
  combiner = require("stream-combiner2").obj;

const env = !process.env.NODE_ENV || process.env.NODE_ENV === "development";


// module.exports = function(options) {
//   return function() {
//     return combiner(
//       browserify(options.src).bundle(),
//       source(options.bundle),
//       buffer(),
//       gulpIf(!env, combiner(uglify(), rename("main.min.js"))),
//       sourcemaps.init({loadMaps: true}),
//       sourcemaps.write(options.maps),
//       gulp.dest(options.dst)
//     ).on("error", notify.onError(
//       function(err) {
//         return {
//           title: "Javascript",
//           message: err.message
//         };
//       }
//     ));
//   };
// };

module.exports = function(options) {
  return function() {
    return browserify(options.src)
      .bundle()
      .on("error", notify.onError(
        function(err) {
          return {
            title: "Javascript",
            message: err.message
          };
        }
      ))
      .pipe(source(options.bundle))
      .pipe(buffer())
      .pipe( gulpIf(!env, combiner(uglify(), rename("main.min.js"))) )
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write(options.maps))
      .pipe(gulp.dest(options.dst));
  };
};
