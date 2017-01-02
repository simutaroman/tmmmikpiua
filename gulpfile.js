var del = require("del");
var gulp = require("gulp");
var header = require('gulp-header');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();

var config = require('./gulp-config.json');
var pkg = require('./package.json');



var extPath = './';
var assetsPath = '.';
var templateName = 'tmmmikpiua';
var wwwPath = config.wwwDir + '/templates/' + templateName;

var templateFiles = [
    extPath + 'css/**',
    extPath + 'fonts/**',
    // extPath + 'html/**',
    extPath + 'images/**',
    // extPath + 'includes/**',
    extPath + 'js/**',
    extPath + 'language/**',
    // extPath + 'scss/**',
    // extPath + 'vendor/**',
    // extPath + '*.md',
    extPath + '*.png',
    extPath + '*.php',
    extPath + '*.ico',
    extPath + '*.xml'
];
// Clean dev-Joomla template directory
gulp.task('cleanDev', function () {
    return del(wwwPath, { force: true });
});

// Copy
gulp.task('copyToDev', ['cleanDev'], function () {
    return gulp.src(templateFiles, { base: extPath })
        .pipe(gulp.dest(wwwPath));
});

// Set the banner content
var banner = ['/*!\n',
    ' * <%= pkg.name %> - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/tmmmi.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task("dev", [ "less", "copyToDev"]);
