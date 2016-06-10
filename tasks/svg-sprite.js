"use strict";

const gulp = require("gulp"),
      cheerio = require("gulp-cheerio"),
      svgStore = require("gulp-svgstore"),
      svgMin = require("gulp-svgmin");



module.exports = function(options) {
  return function() {
    return gulp.src(options.src)
      .pipe(svgMin({
        plugins: [{
          cleanupNumericValues: {
            floatPrecision: 5
          }
        }],
        js2svg: {
          pretty: true
        }
      }))

      .pipe(svgStore({
        inlineSvg: true
      }))

      .pipe(cheerio(function($) {
        $("svg").attr("style", "display:none");
      }))

      .pipe(gulp.dest(options.dst));
  };
};
