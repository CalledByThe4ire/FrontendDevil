"use strict";

const gulp = require("gulp"),
  gulpIf = require("gulp-if"),
  del = require("del"),
  notify = require("gulp-notify"),
  combiner = require("stream-combiner2").obj,
  rename = require("gulp-rename"),
  stylus = require("gulp-stylus"),
  postStylus = require("poststylus"),
  postCSS = require("gulp-postcss"),
  lost = require("lost"),
  prefixer = require("autoprefixer"),
  mqPacker = require("css-mqpacker"),
  minify = require("gulp-csso"),
  objectFitImages = require("postcss-object-fit-images"),
  sourcemaps = require("gulp-sourcemaps"),
  triangle = require("postcss-triangle");

const env= !process.env.NODE_ENV || process.env.NODE_ENV === "development";



module.exports = function(options) {

  return function() {

    var processors = [
      postStylus,
      lost,
      objectFitImages,
      triangle,
      prefixer({
        browsers: [
          "last 1 version",
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Opera versions",
          "last 2 Edge versions"
        ]
      })
    ];

    return combiner(
      gulp.src(options.src),
      gulpIf(env, sourcemaps.init()),
      stylus({
        compress: false,
        "include css": true,
        import: process.cwd() + "/bower_components/normalize-css/normalize.css",
        use: [
          postStylus(processors)
        ]
      }),
      gulpIf( !env, combiner( postCSS([mqPacker({sort: true})]), minify(), rename("main.min.css") ) ),
      gulpIf(env, sourcemaps.write()),
      gulp.dest(options.dst)
    ).on("error", notify.onError(
      function(err) {
        return {
          title: "Styles",
          message: err.message
        };
      }
    ));

  };
};
