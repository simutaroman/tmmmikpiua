var gulp = require("gulp"),
    minifycss = require("gulp-minify-css"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish"),
    uglify = require("gulp-uglify"),
    usemin = require("gulp-usemin"),
    imagemin = require("gulp-imagemin"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    notify = require("gulp-notify"),
    cache = require("gulp-cache"),
    changed = require("gulp-changed"),
    rev = require("gulp-rev"),
    browserSync = require("browser-sync"),
    del = require("del");


gulp.task("jshint", function () {
    return gulp.src("app/scripts/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task("clean", function () {
    return del(["dist"]);
});

gulp.task("usemin", ["jshint"], function () {
    return gulp.src("app/index.php")
      .pipe(usemin({
          css: [minifycss(), rev()],
          js: [ uglify(), rev()]
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


var prodPath= "../../Endels/home/tmmmikpiua/www/templates/tmmmikpiua";

// Clean
gulp.task("cleanDest", function () {
    return del([prodPath], {force: true});
});

gulp.task("copyProd", ["cleanDest"], function () {
    gulp.src("./dist/**/*.*")
     .pipe(gulp.dest(prodPath));
});



