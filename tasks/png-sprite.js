"use strict";

const gulp = require("gulp"),
  spritesmith = require("gulp.spritesmith");



module.exports = function(options) {
  return function(callback) {
    var spriteData =
      gulp.src(options.src)
        .pipe(spritesmith({
          imgName: "png-sprite.png",
          cssName: "png-sprite.styl",
          cssFormat: "stylus",
          algorithm: "binary-tree",
          cssTemplate: "stylus.template.mustache",
          cssVarMap: function(sprite) {
            sprite.name = "s-" + sprite.name;
          }
        }));

    spriteData.img.pipe(gulp.dest(options.pictures));
    spriteData.css.pipe(gulp.dest(options.styles));
    callback()
  };
};
