"use strict";

const gulp = require("gulp"),
  pug = require("gulp-pug"),
  foldero = require("foldero"),
  fs = require("fs"),
  notify = require("gulp-notify"),
  combiner = require("stream-combiner2").obj;

module.exports = function(options) {
  return function() {

    var siteData = {};
    if (fs.existsSync(options.data)) {
      siteData = foldero(options.data, {
        recurse: true,
        whitelist: "(.*/)*.+\.(json)$",
        loader: function loadAsString(file) {
          var json = {};
          try {
            json = JSON.parse(fs.readFileSync(file, "utf8"));
          } catch (e) {
            console.log("Error Parsing JSON file: " + file);
            console.log("==== Details Below ====");
            console.log(e);
          }
          return json;
        }
      });
    }

    return combiner(
      gulp.src(options.src),
      pug({
        locals: {
          site: {
            data: siteData
          }
        },
        pretty: true
      }),
      gulp.dest(options.dst)
    ).on("error", notify.onError(
      function(err) {
        return {
          title: "Pug",
          message: err.message
        };
      }
    ));
  };
};
