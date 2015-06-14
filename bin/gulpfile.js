/*
 * Mt.Notes
 *
 * Date:    2015.06.08
 * Author:  Thonatos.Yang
 *
 * Function:
 *      use gulp to auto generate and minify css files .
 */

var del = require('del'),
    path = require('path'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');


// Define Vars
var less_src = '../public/css-gulp/less-page/*.less';
var less_src_watch = '../public/css-gulp/less/page/**/*.less';

// var sass_src = '../public/css-gulp/scss-page/*.scss';
// var scss_src_watch = '../public/css-gulp/scss/page/**/*.scss';

var path_dev = '../public/css/css-page/';
var path_dep = '../public/css/css-page/';

// Define Tasks
gulp.task('less', function () {
    gulp.src(less_src)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(autoprefixer({
            //browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(path_dev))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(path_dev))
        .pipe(gulp.dest(path_dep))
        .pipe(notify({ message: 'less task complete' }));
});


gulp.task('clean', function() {
    del(path_dev);
});

gulp.task('default', ['clean'], function() {
    gulp.start('less');
});

gulp.task('less_watch', function() {
    gulp.watch(less_src_watch, ['clean','less']);

});

// Sass
//gulp.task('sass', function () {
//    gulp.src(sass_src)
//        .pipe(sass())
//        .pipe(autoprefixer({
//            browsers: ['last 2 versions'],
//            cascade: false
//        }))
//        .pipe(gulp.dest(path_dev))
//        .pipe(rename({ suffix: '.min' }))
//        .pipe(minifycss())
//        .pipe(gulp.dest(path_dev))
//        .pipe(gulp.dest(path_dep))
//        .pipe(notify({ message: 'sass task complete' }));
//});

//gulp.task('sass_watch', function() {
//
//    // Watch .scss files
//    gulp.watch(scss_src_watch, ['clean','sass']);
//
//});