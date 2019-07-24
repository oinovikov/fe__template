var gulp = require('gulp');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var srcFolder = './src';
var targetFolder = './public';

function compileHTML() {
    return gulp
        .src([
            srcFolder + '/pug/*.pug',
            srcFolder + '/pug/*.html',
            '!' + srcFolder + '/pug/_*.pug',
            '!' + srcFolder + '/pug/_*.html',
        ])
        .pipe(pug())
        .pipe(gulp.dest(targetFolder + '/'));
};

function compileCSS() {
    return gulp
        .src([
            srcFolder + '/stylus/common.styl',
            '!' + srcFolder + '/stylus/**/_*.styl',
        ])
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest(targetFolder + '/css'));
};

function compileJS() {
    return gulp
        .src([
            srcFolder + '/js/strict.js',
            srcFolder + '/js/vars.js',
            srcFolder + '/js/funcs/**/*.js',
            srcFolder + '/js/common.js',
            '!' + srcFolder + '/js/**/_*.js',
        ])
        .pipe(uglify())
        .pipe(concat('common.js'))
        .pipe(gulp.dest(targetFolder + '/js'));
};

gulp.task('html', compileHTML);
gulp.task('css', compileCSS);
gulp.task('js', compileJS);

gulp.task('default', gulp.parallel(compileHTML, compileCSS, compileJS));

gulp.task('watch', function () {
    gulp.watch([srcFolder + '/pug/**/*.pug', srcFolder + '/pug/**/*.html'], compileHTML);
    gulp.watch(srcFolder + '/stylus/**/*.styl', compileCSS);
    gulp.watch(srcFolder + '/js/**/*.js', compileJS);
});
