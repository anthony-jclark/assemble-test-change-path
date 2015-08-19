/* global require */

// ── src
//     ├── pages
//     │   └── index.md
//     ├── posts
//     │   └── 2015
//     │       ├── assemble1.md
//     │       ├── assemble2.md
//     │       └── assemble3.md
//     └── templates
//         └── layouts
//             └── default.hbs

var assemble = require("assemble");
var debug = require("gulp-debug");
var markdown = require("gulp-remarkable");

var rename = require("./plugins/changePath");

// --------------------------------
// Assemble options
// --------------------------------

assemble.option("layout", "default");

// --------------------------------
// Additional collections
// --------------------------------

assemble.create("post");
assemble.posts("src/posts/**/*.md");

// --------------------------------
// Render markdown files and copy to dist
// --------------------------------
assemble.task("default", ["preload", "posts"], function () {
    "use strict";

    return assemble
        .src(["src/pages/**/*.md"])
        .pipe(markdown({
            remarkableOptions: {
                html: true,
                typographer: true,
                linkify: true
            }
        }))
        .pipe(assemble.dest("dist/"));
});

// --------------------------------
// Render posts written in markdown
// --------------------------------
assemble.task("posts", function () {
    "use strict";

    return assemble
        .src(["src/posts/**/*.md"])
        .pipe(markdown({
            remarkableOptions: {
                html: true,
                typographer: true,
                linkify: true
            }
        }))
        .pipe(debug())
        .pipe(rename(assemble, {
            dirname: ""
        }))
        .pipe(debug())
        .pipe(assemble.dest("dist/posts/"));
});

// --------------------------------
// Refresh cached pages
// --------------------------------
assemble.task("preload", function (cb) {
    "use strict";
    assemble.layouts("src/templates/layouts/*.hbs");
    cb();
});


// --------------------------------
// Clean-up dist
// --------------------------------
assemble.task("clean", function (cb) {
    "use strict";
    var del = require("delete");
    del.sync("./dist");
    cb();
});

