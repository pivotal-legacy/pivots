'use strict';

var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var jasmine = require('gulp-jasmine-browser');

function buildJs(config) {
  return gulp.src('src/js/main.js')
    .pipe(webpack(require(config)))
    .pipe(gulp.dest('dist/'));
}

gulp.task('js', ['clean'], function () {
  return buildJs('./webpack.config.js')
    .pipe(connect.reload());
});

gulp.task('js:dist', ['clean'], function () {
  return buildJs('./webpack.dist.config.js');
});

gulp.task('watch', ['build'], function () {
  return gulp.watch(['src/js/**/*', 'src/css/**/*'], ['build'])
});

gulp.task('connect', function () {
  connect.server({root: 'dist', livereload: true, port: process.env.CLIENT_SERVER_PORT || 8080 });
});

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('jasmine', function () {
  return gulp.src(['spec/**/*Spec.js'])
    .pipe(webpack({output: {filename: 'spec.js'}}))
    .pipe(jasmine.specRunner({console: true}))
    .pipe(jasmine.headless());
});

gulp.task('build', ['clean', 'js']);
gulp.task('build:dist', ['clean', 'js:dist']);

gulp.task('default', ['build', 'connect', 'watch']);
