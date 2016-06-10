"use strict";

const gulp = require("gulp"),
      ghPages = require("gulp-gh-pages");



module.exports = function(options) {
  return function() {
    console.log('---------- Publishing ./build/ on GH pages');
    return gulp.src('./build/**/*')
      .pipe(ghPages());
  };
};
