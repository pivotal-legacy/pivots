'use strict';

var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var jasmine = require('gulp-jasmine-browser');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');

function buildJs(config) {
  return gulp.src('src/js/main.js')
    .pipe(webpack(require(config)))
    .pipe(gulp.dest('dist/'));
}

gulp.task('js', ['clean', 'eslint'], function () {
  return buildJs('./webpack.config.js')
    .pipe(connect.reload());
});

gulp.task('js:dist', ['clean', 'eslint'], function () {
  return buildJs('./webpack.dist.config.js');
});

gulp.task('scss', ['clean'], function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['build'], function () {
  return gulp.watch(['src/js/**/*', 'src/scss/**/*'], ['build']);
});

gulp.task('connect', ['build'], function () {
  connect.server({root: 'dist', livereload: true, port: process.env.CLIENT_SERVER_PORT || 8080 });
});

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('jasmine:ci', ['eslint'], function () {
  return gulp.src(['spec/**/*Spec.js'])
    .pipe(webpack(require('./webpack.jasmine.config')))
    .pipe(jasmine.specRunner({console: true}))
    .pipe(jasmine.headless());
});

gulp.task('jasmine', ['eslint'], function () {
  return gulp.src(['spec/**/*Spec.js'])
    .pipe(webpack(require('./webpack.jasmine.config')))
    .pipe(jasmine.specRunner())
    .pipe(jasmine.server({port: 8888}));
});

gulp.task('eslint', ['clean'], function () {
  return gulp.src(['*.js', 'spec/**/*.js', 'src/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build', ['clean', 'eslint', 'js', 'scss']);
gulp.task('build:dist', ['clean', 'js:dist']);

gulp.task('default', ['eslint', 'build', 'connect', 'watch']);
