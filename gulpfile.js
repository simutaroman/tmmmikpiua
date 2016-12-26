
// Created by Roman Simuta (C)

var gulp = require("gulp");
var browserSync = require("browser-sync");
var cleanCSS = require('gulp-clean-css');
var concat = require("gulp-concat");
var del = require("del");
var fs = require('fs');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require("gulp-uglify");
var zip = require('gulp-zip');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var minifycss = require("gulp-minify-css");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");

var usemin = require("gulp-usemin");
var imagemin = require("gulp-imagemin");


var notify = require("gulp-notify");
var cache = require("gulp-cache");
var changed = require("gulp-changed");
var rev = require("gulp-rev");

var config = require('./gulp-config.json');

var extPath = './';
var assetsPath = '.';
var templateName = 'tmmmikpiua';

var wwwPath = config.wwwDir + '/templates/' + templateName;

var prodPath = "../../Endels/home/tmmmikpiua/www/templates/tmmmikpiua";

var templateFiles = [
    extPath + 'css/**',
    extPath + 'fonts/**',
    extPath + 'html/**',
    extPath + 'images/**',
    extPath + 'includes/**',
    extPath + 'js/**',
    extPath + 'scss/**',
    extPath + 'vendor/**',
    // extPath + '*.md',
    extPath + '*.png',
    extPath + '*.php',
    extPath + '*.ico',
    extPath + '*.xml'
];

var onError = function (err) {
    beep([0, 0, 0]);
    gutil.log(gutil.colors.green(err));
};


// Clean
gulp.task('clean', function () {
    return del(wwwPath, { force: true });
});

// Copy
gulp.task('copy', ['clean'], function () {
    return gulp.src(templateFiles, { base: extPath })
        .pipe(gulp.dest(wwwPath));
});

//OLD functionality
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Clean old
gulp.task("cleanold", function () {
    return del(["dist"]);
});


gulp.task("jshint", function () {
    return gulp.src("app/scripts/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task("usemin", ["jshint"], function () {
    return gulp.src("app/index.php")
        .pipe(usemin({
            css: [minifycss(), rev()],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest("dist/"));
});

// Images
gulp.task("imagemin", function () {
    gulp.src("app/*.png")
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest("dist"));

    return del(["dist/images"]), gulp.src("app/images/**/*")
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest("dist/images"))
        //   .pipe(notify({ message: "Images task complete" }))
        ;
});

gulp.task("copyfonts", ["clean"], function () {
    gulp.src("./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*")
        .pipe(gulp.dest("./dist/fonts"));

    gulp.src("./node_modules/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*")
        .pipe(gulp.dest("./dist/fonts"));
});


gulp.task("copyfiles", ["clean"], function () {
    gulp.src("./app/**/*.{xml,ico,ini,html,php,css,js}*")
        .pipe(gulp.dest("./dist"));
});

// Default task
gulp.task("default", ["clean"], function () {
    gulp.start(
        // "usemin",
        "imagemin",
        "copyfonts",
        "copyfiles");
});




// Clean
gulp.task("cleanDest", function () {
    return del([prodPath], { force: true });
});

gulp.task("copyProd", ["cleanDest"], function () {
    gulp.src("./dist/**/*.*")
        .pipe(gulp.dest(prodPath));
});



