"use strict";

const gulp = require("gulp"),
      browserSync = require("browser-sync").create();



module.exports = function(options) {
  return function() {
    browserSync.init({
      server: {
        baseDir: "./build"
      },
      host: 'localhost',
      port: 9000
    });
    browserSync.watch("./build/**/*.*").on("change", browserSync.reload);
  };
};
