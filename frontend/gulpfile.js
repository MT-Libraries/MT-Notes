/**
 *
 * gulpfile.    gulp config for build & deploy
 *
 * @project     localhost_insta360.com
 * @datetime    11:07 - 15/9/11
 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
 * @copyright   Thonatos.Yang <https://www.thonatos.com>
 *
 */


var del = require('del'),
    path = require('path'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    webpack = require('gulp-webpack'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    runSequence = require('run-sequence');

/**
 * Define variables.
 */

var CFG_WEBPACK = require('./webpack.config');

var SRC_JS = './src/js/**/*.js';
var SRC_CSS = './src/css/**/*.less';

var DEP_JS = './src/js/js-page/*.js';
var DEP_CSS = './src/css/less-page/*.less';


var DEV_JS = './public/js/dev';
var DEV_CSS = './public/css/dev';
var DEV_TPL = './src/tpl/dev/**/*.hbs';


var PRO_JS = './public/js/pro';
var PRO_CSS = './public/css/pro';
var PRO_TPL = './src/tpl/pro';

var REVISION = './src/rev';


/**
 * Gulp tasks.
 */

gulp.task('js', function () {
    return gulp.src(DEP_JS)
        .pipe(webpack(CFG_WEBPACK))
        .pipe(gulp.dest(DEV_JS))
        .pipe(notify({
            message: 'js task complete'
        }));
});

gulp.task('publish-js', function () {
    return gulp.src(DEP_JS)
        .pipe(webpack(CFG_WEBPACK))
        .pipe(gulp.dest(DEV_JS))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(PRO_JS))
        .pipe(rev.manifest())
        .pipe(gulp.dest(REVISION + "/js"))
        .pipe(notify({
            message: 'js task complete'
        }));
});

gulp.task('css', function () {
    return gulp.src(DEP_CSS)
        .pipe(plumber())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            //browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(DEV_CSS))
        .pipe(notify({
            message: 'css task complete'
        }));

});

gulp.task('publish-css', function () {
    return gulp.src(DEP_CSS)
        .pipe(plumber())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            //browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(DEV_CSS))
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest(PRO_CSS))
        .pipe(rev.manifest())
        .pipe(gulp.dest(REVISION + "/css"))
        .pipe(notify({
            message: 'publish css task complete'
        }));
});

gulp.task('publish-tpl', function () {
    return gulp.src([REVISION + '/**/*.json', DEV_TPL])
        .pipe(revCollector({
            dirReplacements: {
                'dev/': 'pro/'
            }
        }))
        .pipe(gulp.dest(PRO_TPL))
        .pipe(notify({
            message: 'publish tpl task complete'
        }));
});

gulp.task('watch', function () {
    
    gulp.watch(SRC_JS,['js']);
    gulp.watch(SRC_CSS,['css']);

});

gulp.task('build',['publish-css','publish-js','publish-tpl'],function(){
    return console.log('Build Over.');
});
