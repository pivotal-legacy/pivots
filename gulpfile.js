'use strict';

var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');

gulp.task('html', ['clean'], function () {
  gulp.src(['./src/index.html'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['clean'], function () {
  return gulp.src('src/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('default', ['clean', 'html', 'build']);
