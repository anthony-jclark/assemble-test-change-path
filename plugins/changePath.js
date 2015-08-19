/* global module, require */

//
// https://github.com/hparra/gulp-rename/blob/master/index.js
//
// dirname: "main/text/ciao",
// basename: "aloha",
// prefix: "bonjour-",
// suffix: "-hola",
// extname: ".md"
// path = Path.join(dirname, prefix + basename + suffix + extname);
//

var through = require("through2");
var path = require("path");

function changePath(assemble, pathObj) {
    "use strict";

    pathObj = pathObj || {};

    function parsePath(p) {
        var extname = path.extname(p);
        return {
            dirname: path.dirname(p),
            basename: path.basename(p, extname),
            extname: extname
        };
    }

    return through.obj(
        function (file, enc, cb) {

            var title = file.data.title || file.data.src.name;
            title = title
                .toLowerCase()                  // lowercase
                .replace(/[^\w\s]/g, " ")       // remove specials
                .trim().replace(/\s\s/g, " ")   // remove double whitespace
                .replace(/\s/g, "-");           // replace space with hyphen

            var parsedPath = parsePath(file.relative);
            var dirname = "dirname" in pathObj ? pathObj.dirname : parsedPath.dirname,
                basename = "basename" in pathObj ? pathObj.basename : title,
                extname = "extname" in pathObj ? pathObj.extname : parsedPath.extname;

            var newPath = path.join(dirname, basename + extname);
            file.path = path.join(file.base, newPath);
            // assemble.views.posts[parsedPath.basename].data.src.basename

            cb(null, file);
        }
    );
}

module.exports = changePath;
