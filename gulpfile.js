'use strict';

var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');

gulp.task('html', ['clean'], function () {
  return gulp.src(['./src/index.html'])
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('js', ['clean'], function () {
  return gulp.src('src/js/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

gulp.task('watch', ['build'], function() {
  return gulp.watch(['src/js/**/*', 'src/css/**/*'], ['build'])
});

gulp.task('connect', function() {
  connect.server({root: 'dist', livereload: true});
});

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('build', ['clean', 'html', 'js']);

gulp.task('default', ['build', 'connect', 'watch']);
